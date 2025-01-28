import { LoginTemplate } from "@/modules";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <Suspense fallback={<>Loading...</>}>
        <LoginTemplate />
      </Suspense>
    </div>
  );
}
