import { Layout } from "antd";

const { Footer } = Layout;



export default function AppFooter() {
  return (
    <Footer className="bg-white shadow flex items-center justify-center text-[#bbb] p-[20px]">
     
   <div className=" text-center ">
        <p className="m-0 text-black font-bold ">
          &copy; {new Date().getFullYear()} Abay Bank Job Portal. All Rights Reserved.
        </p>
        <div className="text-[#167902] ">
          <a href="#">Privacy Policy</a>
          <span className="text-[#555] p-4">|</span>
          <a href="#">Terms of Service</a>
          <span className="text-[#555] p-4">|</span>
          <a href="#">Contact Us</a>
        </div>
      </div>
    </Footer>
  );
}
