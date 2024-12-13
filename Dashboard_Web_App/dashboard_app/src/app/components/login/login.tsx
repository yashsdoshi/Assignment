"use client"

import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Button from "@mui/material/Button";

export default function Login() {
  const { data: session } = useSession();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  if (session) {
    return (
      <>
        <Button variant={'contained'} color={'error'} onClick={() => signOut()}>
          Sign out
        </Button>
      </>
    );
  }

  return (
    <>
      <h2>Please log in</h2>
      <br />
      <Button variant={'contained'} color={'success'} onClick={() => signIn()}>
        Sign in
      </Button>
    </>
  );
}