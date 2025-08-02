import { SignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AuthRedirect from "@/components/auth-redirect";

export default async function Page() {
  const { userId } = await auth();
  
  // If user is already signed in, redirect to home page
  if (userId) {
    redirect("/");
  }

  return (
    <>
      <AuthRedirect />
      <SignIn />
    </>
  );
}
