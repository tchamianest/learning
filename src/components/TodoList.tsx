import React from "react";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Popover, PopoverContent } from "@/src/components/ui/popover";
import "react-toastify/dist/ReactToastify.css";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { PopoverClose } from "@radix-ui/react-popover";
interface TodoItem {
  id: string;
  email: string;
  name: string;
}

// Define the interface for the props
interface TodoListProps {
  data: TodoItem[];
  handleUpdate: (el: string, name: string) => void;
  handleDelete: (el: string) => void;

  setnameupdate: (e: string) => void;
  nameupdate: string;
}
const TodoList: React.FC<TodoListProps> = ({
  data,
  handleUpdate,
  setnameupdate,
  handleDelete,
  nameupdate,
}) => {
  const PopoverTrigger = PopoverPrimitive.Trigger;
  return (
    <div className="w-screen flex items-center justify-center">
      <div className="border flex gap-2 flex-col p-3 sm:w-[50%] w-[90%]  max-h-[300px] mb-20 overflow-hidden  overflow-y-auto">
        {data?.map(
          (el: { id: string; email: string; name: string }, index: number) => (
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
                              handleUpdate(el.id, nameupdate ? nameupdate : "")
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
  );
};

export default TodoList;
