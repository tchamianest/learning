"use client";
import React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import {
  PostData,
  DeleteFunction,
  GetUser,
  UpdateFunction,
} from "@/services/apiRequest";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
interface userType {
  id: string;
  name: string;
}
function HomePage() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const queryClient = useQueryClient();
  const notify = (message: string) => toast(`${message}`);
  const [response, setResponse] = useState("");
  const [name, setName] = useState("");
  const [nameupdate, setnameupdate] = useState<string>();

  const fetchUser = async () => {
    const response = await GetUser();
    return response;
  };
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUser,
    staleTime: Infinity,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await PostData({ name });

    if (response.ok) {
      const data = await response.json();
      if (data.error) {
        return setResponse("There is some error happen 💀");
      }
      setName(" ");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      notify("new user created 🎉");
    } else {
      notify("User are not updated");
    }
  };

  const handleDelete = async (id: string) => {
    setIsPopoverOpen(false);
    const response = await DeleteFunction(id);
    const data = await response.json();

    if (response.ok) {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      notify("user deleted ✅");
    }
  };
  const handleUpdate = async (id: string, name: string) => {
    const response = await UpdateFunction({ id, name });

    if (response.ok) {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setResponse("User Updated successful 👌✅");
      notify("User Updated successful 👌✅");
    }
  };

  return {
    name,
    nameupdate,
    setName,
    handleSubmit,
    handleDelete,
    setnameupdate,
    handleUpdate,
    data,
    isPopoverOpen,
    setIsPopoverOpen,
  };
}

export default HomePage;
