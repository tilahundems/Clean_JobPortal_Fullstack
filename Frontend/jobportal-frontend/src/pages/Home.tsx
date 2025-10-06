
import { Button, Carousel } from "antd";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    // <div className="flex flex-col items-center justify-center min-h-screen  bg-[#004661] text-white text-center p-6">
    //   <Carousel autoplay dotPosition="bottom" className="w-full max-w-5xl mb-8 text-white">
    //     {/* Slide 1 */}
    //     <div className="flex flex-col md:flex-row items-center justify-between p-6 ">
    //       <div className="md:w-1/2 text-left">
    //         <h1 className="text-4xl font-bold mb-4">Welcome to Job Portal</h1>
    //         <p className="mb-6 max-w-xl">
    //           Find your dream job or hire top talent. Simple, fast, and effective.
    //         </p>
    //       </div>
    //       <div className="md:w-1/2 flex justify-center">
    //         <img
    //           src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
    //           alt="Welcome"
    //           className="w-64 h-64 object-contain"
    //         />
    //       </div>
    //     </div>

    //     {/* Slide 2 */}
    //     <div className="flex flex-col md:flex-row items-center justify-between p-6">
    //       <div className="md:w-1/2 text-left">
    //         <h1 className="text-4xl font-bold mb-4">Explore Exciting Jobs</h1>
    //         <p className="mb-6 max-w-xl">
    //           Browse thousands of opportunities tailored to your skills.
    //         </p>
    //       </div>
    //       <div className="md:w-1/2 flex justify-center">
    //         <img
    //           src="https://cdn-icons-png.flaticon.com/512/1995/1995515.png"
    //           alt="Jobs"
    //           className="w-64 h-64 object-contain"
    //         />
    //       </div>
    //     </div>

      

    //     {/* Slide 4 */}
    //     <div className="flex flex-col md:flex-row items-center justify-between p-6">
    //       <div className="md:w-1/2 text-left">
    //         <h1 className="text-4xl font-bold mb-4">Fast & Secure</h1>
    //         <p className="mb-6 max-w-xl">
    //           Job Portal ensures a smooth hiring process with trusted tools.
    //         </p>
    //       </div>
    //       <div className="md:w-1/2 flex justify-center">
    //         <img
    //           src="https://cdn-icons-png.flaticon.com/512/3190/3190131.png"
    //           alt="Secure"
    //           className="w-64 h-64 object-contain"
    //         />
    //       </div>
    //     </div>
    //   </Carousel>

    //   {/* Buttons */}
    //   <div className="space-x-4">
    //     <Button
    //       type="primary"
    //       size="large"
    //       className="px-8 py-2"
    //       onClick={() => navigate("/login")}
    //     >
    //       Login
    //     </Button>
    //     <Button
    //       size="large"
    //       className="px-8 py-2"
    //       onClick={() => navigate("/register")}
    //     >
    //       Register
    //     </Button>
    //   </div>
    // </div>

    <div className="flex flex-col items-center justify-center min-h-screen bg-[#004661] text-white text-center p-6">
  <div className="w-full max-w-5xl mb-8">
    <Carousel autoplay dotPosition="bottom" className="w-full text-white">
      {/* Slide 1 */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 p-6">
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
            className="w-64 h-64 md:w-72 md:h-72 object-contain"
          />
        </div>
      </div>

      {/* Slide 2 */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 p-6">
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
            className="w-64 h-64 md:w-72 md:h-72 object-contain"
          />
        </div>
      </div>

      {/* Slide 3 (placeholder for your 3rd slide) */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 p-6">
        <div className="md:w-1/2 text-left">
          <h1 className="text-4xl font-bold mb-4">Grow Your Career</h1>
          <p className="mb-6 max-w-xl">
            Connect with opportunities that align with your goals and grow with you.
          </p>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3186/3186385.png"
            alt="Career"
            className="w-64 h-64 md:w-72 md:h-72 object-contain"
          />
        </div>
      </div>

      {/* Slide 4 */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 p-6">
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
            className="w-64 h-64 md:w-72 md:h-72 object-contain"
          />
        </div>
      </div>
    </Carousel>
  </div>

  {/* Buttons */}
  <div className="flex flex-wrap items-center justify-center gap-4">
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
