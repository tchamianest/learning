"use client";
import "react-toastify/dist/ReactToastify.css";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import { toast } from "@/components/ui/use-toast";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
const FormSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

type FormData = z.infer<typeof FormSchema>;

export default function LoginForm() {
  const notify = (message: string) => toast(`${message}`);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    const { email, password } = data;

    try {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      console.log({ response });
      if (!response?.error) {
        router.push("/");
        router.refresh();
      }

      if (!response?.ok) {
        return notify("Invalid email or password");
      }

      console.log("Login Successful", response);
      notify("Login Successful");
    } catch (error: any) {
      console.error("Login Failed:", error);
      notify("Login Failed");
    }
  };
  // const handleGithubSignIn = async () => {
  //   try {
  //     const response: any = await signIn("github", { redirect: false });
  //     if (response?.error) {
  //       notify("GitHub Login Failed");
  //     } else {
  //       router.push("/");
  //       router.refresh();
  //       notify("GitHub Login Successful");
  //     }
  //   } catch (error: any) {
  //     console.error("GitHub Login Failed:", error);
  //     notify("GitHub Login Failed");
  //   }
  // };

  return (
    <div>
      <ToastContainer />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="text-white  md:p-16 border-[1.5px] rounded-lg border-gray-300 flex flex-col items-center justify-center gap-5"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Provide Email</FormLabel>
                <FormControl>
                  <Input
                    className="text-black min-w-full"
                    placeholder="Provide Email"
                    {...field}
                    type="text"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Provide Password</FormLabel>
                <FormControl>
                  <Input
                    className="text-black w-full "
                    placeholder="password"
                    {...field}
                    type="password"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="hover:scale-110 mt-3 hover:bg-cyan-700 px-10  sm:w-[45%] w-[80%] "
            //   disabled={form.formState.isSubmitting}
          >
            Login
          </Button>
          <Link
            href="/register"
            className="hover:scale-110 hover:bg-gray-700 hover:text-white border text-center py-1 rounded-sm sm:w-[45%] w-[80%]  hover:border-none"
          >
            Register
          </Link>
        </form>
        {/* <Button
          className="bg-blue-600 px-3 w-full text-white p-2 font-bold"
          onClick={() => handleGithubSignIn}
        >
          GitHub Login
        </Button> */}
      </Form>
    </div>
  );
}
