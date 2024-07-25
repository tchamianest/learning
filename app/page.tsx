"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { redirect, useRouter } from "next/navigation";
import type { AppProps } from "next/app";
import { Popover, PopoverContent } from "@/components/ui/popover";
// import "./styles.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "@/hooks/HomePage";
import { getSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { PopoverClose } from "@radix-ui/react-popover";
import DarkMode from "@/components/DarkMode";


const CreateUserForm = () => {
  const PopoverTrigger = PopoverPrimitive.Trigger;
  const router = useRouter();
  const [session, setSession] = useState<any>(null);
  const {
    name,
    nameupdate,
    data,
    setName,
    setnameupdate,
    handleSubmit,
    handleDelete,
    handleUpdate,
  } = HomePage();

  const logout = async () => {
    await signOut({ redirect: false });
    window.location.href = "/login";
  };
  useEffect(() => {
    const data = async () => {
      const session = await getSession();

      if (session) {
        setSession(session);
      } else {
        router.push("/login");
      }
    };
    data();
  }, []);

  if (session) {
    return (
      <div>
        <ToastContainer />
        <div className="flex  justify-between  px-5 mt-3">
          <div>
            <div className="mx-10 mt-2 absolute flex gap-3">
              <DarkMode />
            </div>
          </div>
          <Button className="h-7" onClick={logout}>
            Logout
          </Button>
        </div>
        <div className="w-full flex min-h-[50vh]   items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="border sm:w-[50%] w-[80%] bg-gray-200 dark:bg-transparent p-10  "
          >
            <div className=" flex gap-6">
              <label>Name</label>
              <div className="flex flex-1 flex-col">
                <Input
                  type="text"
                  className="p-1  border mb-5 w-full"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Button
                  className="bg-blue-600 px-3 w-full text-white p-2 font-bold"
                  type="submit"
                >
                  Create User
                </Button>
                
              </div>
            </div>
          </form>
        </div>

        <div className="min-w-full  gap-2 flex items-center justify-center flex-col max-w-[50%] ">
          <div className="border flex gap-2 flex-col p-3 sm:w-[50%] w-[90%]  max-h-[300px] mb-20 overflow-hidden  overflow-y-auto">
            {data?.data.map(
              (
                el: { id: string; email: string; name: string },
                index: number
              ) => (
                <>
                  <div className="bg-gray-100 dark:bg-gray-800 flex justify-between rounded-sm min-w-[60%] p-2 px-4 ">
                    <div className="flex gap-5 justify-center items-center">
                      <p>name:</p>
                      <p>{el.name}</p>
                    </div>
                    <div className="flex gap-1">
                      <Popover>
                        <PopoverTrigger>
                          <Button className=" bg-green-600 h-10 hover:bg-green-700 text-white p-1 px-6">
                            update
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <div className="flex flex-col gap-4  py-3">
                            <Input
                              type="text"
                              value={nameupdate}
                              onChange={(e) => setnameupdate(e.target.value)}
                            />
                            <PopoverClose>
                              <Button
                                className=" bg-green-600 h-10 hover:bg-green-700 text-white p-1 px-6"
                                onClick={() =>
                                  handleUpdate(
                                    el.id,
                                    nameupdate ? nameupdate : ""
                                  )
                                }
                              >
                                update
                              </Button>
                            </PopoverClose>
                          </div>
                        </PopoverContent>
                      </Popover>
                      <Popover>
                        <PopoverTrigger>
                          <Button className=" bg-red-600 h-10 hover:bg-red-700 text-white p-1 px-6">
                            Delete
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <div className="flex flex-col gap-4  py-3">
                            <p className="text-center">
                              Are you Sure you want to delete 😯
                            </p>
                            <PopoverClose>
                              <Button
                                className=" bg-red-600 h-10 hover:bg-red-700 text-white p-1 px-6"
                                onClick={() => handleDelete(el.id as string)}
                              >
                                Delete
                              </Button>
                            </PopoverClose>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </>
              )
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default CreateUserForm;
