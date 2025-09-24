import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import JobsList from "../features/jobs/JobsList";
import HrDashboard from "../pages/HRDashboard";
import Home from "../pages/Home";
import JobDetail from "../features/jobs/jobdetail";
import Login from "../auth/Login";
import Register from "../auth/Register";
import JobApplications from "../features/HR/JobApplications";
import ManageJobs from "../features/HR/ManageJobs";
import CreateJob from "../features/HR/CreateJob";
import EditJob from "../features/HR/EditJob";
import ApplicantProfile from "../features/Applicants/Profile";
import ApplicantDashboard from "../features/Applicants/Dashboard";
import Applications from "../features/Applicants/Applications";
import UploadResume from "../features/Applicants/UploadResume";
import JobApplicationForm from "../features/Applicants/JobApplicationForm";
import ApplicantProfileForm from "../features/Applicants/ApplicantProfileForm";

export default function AppRoutes() {
  return (
    <Routes>
     

      <Route path="/" element={<MainLayout />}>
       <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
        <Route index element={<HrDashboard />} />
        <Route   path="home" element={<Home />} />
        <Route path="jobs" element={<JobsList />} />
        <Route path="jobs/:id" element={<JobDetail />} />
        
        {/* HR  routes */}
        <Route path="create" element={<CreateJob />} />

        <Route path="applications" element={<JobApplications />} />
        <Route path="managejobs" element={<ManageJobs />} />
        <Route path="managejobs/edit/:id" element={<EditJob/>} />


         {/* Applicant routes */}
        <Route path="profile" element={<ApplicantProfile />} />
        <Route path="profile/reseume" element={<UploadResume />} />

        <Route path="dashboard" element={<ApplicantDashboard />} />
        <Route path="apps" element={<Applications />} />
        <Route path="apply" element={<JobApplicationForm />} />
        <Route path="createProfile" element={<ApplicantProfileForm />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
