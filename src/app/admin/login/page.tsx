import { Suspense } from "react";

import AdminLoginForm from "./login-form";

export default function AdminLoginRoute() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-[#fff7f0]" />}>
      <AdminLoginForm />
    </Suspense>
  );
}
