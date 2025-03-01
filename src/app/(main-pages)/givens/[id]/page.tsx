"use client"

import { ArrowLeft } from "@/components";
import GivenInterests from "@/modules/givens/sub-component/interest";
import { useRouter } from "next/navigation";

export default function Home() {
  const {back} = useRouter();
  return (
    <div className=" flex-col mt-20 justify-center items-center h-screen w-full">
      <button type="button" className="border-none flex gap-1" onClick={()=> back()}> <ArrowLeft width={16} height={16} className="my-auto"/> Go back</button>
     <GivenInterests />
    </div>
  );
}
