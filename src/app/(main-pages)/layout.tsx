import Layout from "@/layouts/dashboard";
import React, { Suspense } from "react";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<>Loading...</>}>
      <div className="flex flex-col min-h-screen">
        <Layout>{children}</Layout>
      </div>
    </Suspense>
  );
}
