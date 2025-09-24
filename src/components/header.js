// InfiniteImageSlider.tsx - Replace the existing component with this one

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export default function WhychoseUS() {

  return (
    <section className="w-full flex justify-center items-center bg-white">
      <Image 
        src="/Vertex_Logo.png"
        width={80}
        height={80}
        className=" w-32 h-28 mb-4 "
      />
    </section>
  );
}