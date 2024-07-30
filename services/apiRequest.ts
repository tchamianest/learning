import axios from 'axios';
import next from 'next';
import { revalidatePath } from 'next/cache';
interface data {
  name: string;
}
interface Update {
  id: string;
  name: string;
}
export async function PostData({ name }: data) {
  const response = await fetch('/api/create', {
    method: 'POST',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  });
  return response;
}

export async function GetUser() {
  const response = await axios.get('/api/users');

  return response;
}

export async function DeleteFunction(id: string) {
  const response = await fetch('/api/delete', {
    method: 'DELETE',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: id }),
  });
  return response;
}

export async function UpdateFunction({ id, name }: Update) {
  const response = await fetch('/api/update', {
    method: 'PUT',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: id, name: name }),
  });
  return response;
}
