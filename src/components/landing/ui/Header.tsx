import React from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <header className="w-full flex items-center justify-between p-4 bg-white shadow-md md:min-h-24 h-14">
      {/* شعار الموقع */}
      <div className="logo relative md:h-16 h-12 w-[138px] md:w-[185px]">
        <Link href="/">
          <Image
            fill
            src="/images/LOGO 02.png"
            alt="شعار الإسكان الجامعي"
            className=""
          />
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
