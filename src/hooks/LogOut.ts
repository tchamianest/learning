import { signOut } from 'next-auth/react';

function LogOut() {
  const logout = async () => {
    await signOut({ redirect: false });
    window.location.href = '/login';
  };

  return {
    logout,
  };
}

export default LogOut;
