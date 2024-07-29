'use client';
import React from 'react';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from '@/src/hooks/HomePage';
import DarkMode from '@/src/components/DarkMode';
import TodoList from '@/src/components/TodoList';
import LogOut from '../hooks/LogOut';
import { ToastContainer } from 'react-toastify';

const CreateUserForm = () => {
  const { logout } = LogOut();
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
                onChange={e => setName(e.target.value)}
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
        <TodoList
          data={data?.data}
          handleUpdate={handleUpdate}
          setnameupdate={(value: string) => setnameupdate(value)}
          nameupdate={nameupdate as string}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default CreateUserForm;
