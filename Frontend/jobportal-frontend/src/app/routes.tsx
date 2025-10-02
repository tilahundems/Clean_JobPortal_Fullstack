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
import ApplicantDashboard from "../features/Applicants/Dashboard";
import Applications from "../features/Applicants/Applications";
import JobApplicationForm from "../features/Applicants/JobApplicationForm";
import ApplicantProfileForm from "../features/Applicants/ApplicantProfileForm";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "../pages/NotFound";
import Forbidden from "../pages/Forbidden";
import  Profile from "../features/Applicants/Profile";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="jobs" element={<JobsList />} />
        <Route path="jobs/:id" element={<JobDetail />} />

        {/* Applicant protected routes */}
        <Route element={<ProtectedRoute roles={["Applicant"]} />}>
          <Route path="profile" element={<Profile />} />
          <Route path="ApplicanDashboard" element={<ApplicantDashboard />} />
          <Route path="apps" element={<Applications />} />
          <Route path="apply" element={<JobApplicationForm />} />
          <Route path="createProfile" element={<ApplicantProfileForm />} />
         <Route path="jobs/:id/apply" element={<JobApplicationForm />} /> 
        </Route>

        {/* HR protected routes */}
        <Route element={<ProtectedRoute roles={["HR", "ADMIN"]} />}>
          <Route path="AdminDashboard" element={<HrDashboard />} />
          <Route path="create" element={<CreateJob />} />
          <Route path="applications" element={<JobApplications />} />
          <Route path="applications/:id" element={<JobApplications />} />
          <Route path="managejobs" element={<ManageJobs />} />
          <Route path="managejobs/edit/:id" element={<EditJob />} />
        </Route>
      </Route>

      {/* Error pages */}
      <Route path="403" element={<Forbidden />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
