import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return session ? (
    <div>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  ) : (
    <div>
      <button onClick={() => signIn()}>Sign In</button>
    </div>
  );
}
