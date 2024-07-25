import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import FormPage from "./form";

export default async function RegisterPage() {
  const session = await getServerSession();

  if (session) {
    redirect("/");
  }

  return (
    <section className="dark:bg-black bg-gradient-to-r from-gray-800 via-black/80 to-gray-800 text-black dark:text-white h-screen flex items-center justify-center">
      <div className="w-[600px]">
        <FormPage />
      </div>
    </section>
  );
}
