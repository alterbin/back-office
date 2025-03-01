import Interests from "@/modules/interest";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen w-full mt-10">
      <Suspense fallback={<>Loading...</>}>
        <Interests />
      </Suspense>
    </div>
  );
}
