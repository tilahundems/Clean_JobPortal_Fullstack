import React from "react";
import { Upload, message, Card } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { type RcFile,  } from "antd/es/upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {type AxiosProgressEvent } from "axios";
import { api } from "../../api/axios";
import type { ApplicantProfile } from "./applicant.types";
import { uploadResume } from "./applicant.service";
const { Dragger } = Upload;


type UploadPayload = {
  formData: FormData;
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
};


interface UploadResumeProps {
    onUploaded?: (resumeUrl: string) => void;  
    profileId: string;

}

const UploadResume: React.FC<UploadResumeProps> = ({ profileId, onUploaded }) => {
  
  
  const queryClient = useQueryClient();
 const mutation = useMutation<ApplicantProfile, Error, UploadPayload & { profileId: string } >({
  mutationFn: 
  (payload) =>
    uploadResume({
      ...payload,   // includes formData & onUploadProgress
      profileId,    // add profileId here
    }),
  onSuccess: (updatedProfile) => {
    message.success("Resume uploaded successfully.");
    queryClient.invalidateQueries({ queryKey: ["applicantProfile"] });
    if (updatedProfile.resumeUrl) {
        // onUploaded?.(updatedProfile.resumeUrl);
       onUploaded?.(updatedProfile.resumeUrl || "");  
      }
      else {
    onUploaded?.(""); // still close modal even if no URL
  }
  },
  onError: (err: any) => {
    message.error(err?.response?.data?.message || "Resume upload failed.");
  },
});


  const customRequest = (options: any) => {
    const { file, onProgress, onSuccess, onError } = options;
    const fd = new FormData();
    fd.append("file", file as RcFile);
    mutation.mutate({
      formData: fd,
      onUploadProgress: (ev) => {
        if (onProgress && ev.total) {
          const percent = Math.round((ev.loaded / ev.total) * 100);
          onProgress({ percent });
        }
      },
      profileId,
    });
  };

  
 

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Upload Resume</h2>
      <Card className="shadow-md rounded-xl">
        <Dragger
          customRequest={customRequest}
          accept=".pdf,.doc,.docx"
          multiple={false}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag file to upload</p>
          <p className="ant-upload-hint">Only PDF/DOC/DOCX allowed</p>
        </Dragger>
      </Card>
    </div>
  );
};

export default UploadResume;





