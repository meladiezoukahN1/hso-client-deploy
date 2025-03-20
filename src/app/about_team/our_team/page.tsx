import Image from "next/image";
import React from "react";

const OurTeam = () => {
  return (
    <div className="relative min-h-[500px] w-full">
      {/* للشاشات الكبيرة (md فأعلى) */}
      <div className="hidden md:block relative h-screen w-full">
        <Image
          fill
          src="/images/ourteam.png"
          alt="فريق العمل - نسخة الكمبيوتر"
          // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          // className="object-"
          priority
        />
      </div>

      {/* للشاشات الصغيرة */}
      <div className="md:hidden relative h-screen w-full">
        <Image
          fill
          src="/images/team_mobile.jpg"
          alt="فريق العمل - نسخة الموبايل"
          sizes="100vw"
          className="object-fill"
          priority
        />
      </div>
    </div>
  );
};

export default OurTeam;
