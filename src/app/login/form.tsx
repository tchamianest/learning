'use client';
import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/src/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/src/components/ui/form';
import { Input } from '@/src/components/ui/input';
import { ToastContainer, toast } from 'react-toastify';
import Link from 'next/link';
const FormSchema = z.object({
  email: z.string().email({
    message: 'Invalid email address.',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
});

type FormData = z.infer<typeof FormSchema>;

export default function LoginForm() {
  const notify = (message: string) => toast(`${message}`);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    const { email, password } = data;

    try {
<<<<<<< Updated upstream:src/app/login/form.tsx
      const response = await signIn('credentials', {
=======
      const response = await signIn("credentials", {
>>>>>>> Stashed changes:app/login/form.tsx
        email,
        password,
        redirect: false,
      });

      if (!response?.error) {
        router.push('/');
        router.refresh();
      }

<<<<<<< Updated upstream:src/app/login/form.tsx
      if (!response?.ok) {
        return notify('Invalid email or password');
=======
<<<<<<< HEAD
      if (!response.ok) {
=======
      if (!response?.ok) {
>>>>>>> a3fb61e6db61aa2f64609a3d7f582ee1537122f9
        return notify("Invalid email or password");
>>>>>>> Stashed changes:app/login/form.tsx
      }

      notify('Login Successful');
    } catch (error) {
      console.error('Login Failed:', error);
      notify('Login Failed');
    }
  };

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
