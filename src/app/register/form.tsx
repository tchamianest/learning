"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import { signIn } from "next-auth/react";

const FormSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

type FormData = z.infer<typeof FormSchema>;

export default function FormPage() {
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
    const { email: email, password } = data;

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        notify("Network response was not ok");
      }

      notify("Registration Successful");
      router.push("/login");
    } catch (error: any) {
      console.error("Registration Failed:", error);
      notify("Registration Failed");
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="text-white p-4 md:p-16 border-[1.5px] rounded-lg border-gray-300 flex flex-col items-center justify-center gap-y-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Email"
                    {...field}
                    className="text-black min-w-full"
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Password"
                    {...field}
                    type="password"
                    className="text-black w-full "
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex flex-col justify-center items-center gap-3 w-full">
            <Button
              type="submit"
              className="hover:scale-110 mt-5 hover:bg-cyan-700 px-10  sm:w-[45%] w-[80%] "
            >
              Submit
            </Button>

            <Link
              href="/login"
              className="hover:scale-110 hover:bg-gray-700 hover:text-white border text-center py-1 rounded-sm sm:w-[45%] w-[80%]  hover:border-none"
            >
              Login
            </Link>
          </div>
        </form>

        <Link href="http://localhost:3000/api/signin">
          <Button
            className="bg-blue-600 px-3 w-full text-white p-2 font-bold"
            onClick={() => signIn}
          >
            GitHub Login
          </Button>
        </Link>
      </Form>
    </div>
  );
}
