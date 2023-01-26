import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

export default function Auth() {
  const [searchParams, setSearchParams] = useSearchParams();
  let code = searchParams.get("code");
  //   console.log(`searchParams: ${searchParams.get("code")}`);

  useEffect(() => {
    axios.post("http://localhost:8080/auth/code", { code }).then((res) => {
      console.log(res);
    });
  }, [code]);

  return (
    <div>
      <h1>Auth</h1>
      <p>Authenticating token now...</p>
    </div>
  );
}
