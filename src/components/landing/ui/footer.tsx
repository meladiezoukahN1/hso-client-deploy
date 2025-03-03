import { FaFacebook } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-bl from-[#356798] via-[#356798] to-[#1A3E61] text-white py-8 md:py-6 border-t-5 border-[#DBB459]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center md:items-center justify-between gap-6 md:gap-8">
          {/* Logo Section */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <Image
              layout="intrinsic"
              src="/images/LOGO 03.png"
              alt="شعار الشركة"
              width={128}
              height={48}
              className="w-32 md:w-40"
            />
            <Link href="/Digital_Trans_Team">
              <Image
                layout="intrinsic"
                width={148}
                height={24}
                src="/images/Group 209.png"
                alt="شعار لجنة التحول الرقمي"
                className=" w-[152px] md:w-48"
              />
            </Link>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col items-center md:items-start text-center md:text-right">
            <h1 className="text-medium font-bold mb-3">تواصل معنا:</h1>
            <div className="flex flex-col gap-3 items-center md:items-start">
              <div className="flex items-center justify-center md:justify-end">
                <MdOutlineEmail className="ml-2 text-sm" />
                <span className="text-sm md:text-[14px]">
                  Digital Transformation
                </span>
              </div>

              <div className="flex items-center justify-center md:justify-end">
                <FaPhoneAlt className="ml-2 text-sm" />
                <span className="text-sm md:text-[14px]">218913167717+</span>
              </div>

              <div className="flex items-center justify-center md:justify-end">
                <FaFacebook className="ml-2 text-sm" />
                <span className="text-sm md:text-[14px]">
                  فريق التحول الرقمي
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
