
import React from "react";
import { Button, Carousel } from "antd";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  bg-[#004661] text-white text-center p-6">
      <Carousel autoplay dotPosition="bottom" className="w-full max-w-5xl mb-8 text-white">
        {/* Slide 1 */}
        <div className="flex flex-col md:flex-row items-center justify-between p-6 ">
          <div className="md:w-1/2 text-left">
            <h1 className="text-4xl font-bold mb-4">Welcome to Job Portal</h1>
            <p className="mb-6 max-w-xl">
              Find your dream job or hire top talent. Simple, fast, and effective.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Welcome"
              className="w-64 h-64 object-contain"
            />
          </div>
        </div>

        {/* Slide 2 */}
        <div className="flex flex-col md:flex-row items-center justify-between p-6">
          <div className="md:w-1/2 text-left">
            <h1 className="text-4xl font-bold mb-4">Explore Exciting Jobs</h1>
            <p className="mb-6 max-w-xl">
              Browse thousands of opportunities tailored to your skills.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1995/1995515.png"
              alt="Jobs"
              className="w-64 h-64 object-contain"
            />
          </div>
        </div>

      

        {/* Slide 4 */}
        <div className="flex flex-col md:flex-row items-center justify-between p-6">
          <div className="md:w-1/2 text-left">
            <h1 className="text-4xl font-bold mb-4">Fast & Secure</h1>
            <p className="mb-6 max-w-xl">
              Job Portal ensures a smooth hiring process with trusted tools.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3190/3190131.png"
              alt="Secure"
              className="w-64 h-64 object-contain"
            />
          </div>
        </div>
      </Carousel>

      {/* Buttons */}
      <div className="space-x-4">
        <Button
          type="primary"
          size="large"
          className="px-8 py-2"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
        <Button
          size="large"
          className="px-8 py-2"
          onClick={() => navigate("/register")}
        >
          Register
        </Button>
      </div>
    </div>
  );
}
