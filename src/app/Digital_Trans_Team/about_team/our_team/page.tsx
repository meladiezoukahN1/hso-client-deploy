import Image from "next/image";
import React from "react";

const our_team = () => {
  return (
    <div className="flex items-center justify-center">
      <Image fill src="/images/ourteam.png" alt="Our Team" className="w-full " />
    </div>
  );
};

export default our_team;