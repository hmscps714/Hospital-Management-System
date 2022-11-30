import React from "react";
import { useRouter } from "next/router";

export const page401 = () => {
  const router = useRouter();
  return (
    <>
      <h1>Status code 401: You do not have permission to view this</h1>
      <h1>STYLE ME PLZ TY</h1>
      <button onClick={() => router.push("/login")}>Back to login</button>
      <button onClick={() => router.push("/demo")}>Back to demo</button>
    </>
  );
};

export default page401;
