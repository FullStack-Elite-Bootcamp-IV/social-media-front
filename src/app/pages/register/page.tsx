"use client";

import { useEffect } from "react";
import { useAuth } from "../../context/authContext";

const Register = () => {
  const { loginToken, register } = useAuth();

  useEffect(() => {
    console.log(loginToken);
  }, []);

  return (
    <main className="flex bg-slateGray justify-center items-center h-screen">
      <section
        className="flex p-8 flex-col justify-center items-center gap-4 flex-1  rounded-[32px] bg-darkVoid
        max-w-[639px] max-sm:rounded-none max-sm:w-screen max-sm:h-screen "
      >
        <h1 className="text-blancoHueso text-center text-5xl font-normal leading-[52px]">
          Star
        </h1>
        <div className="flex flex-col justify-center items-center gap-2 self-stretch">
          <p className="text-blancoHueso items-center text-sm font-normal leading-[27px]">
            Sign up to see posts from your friends.
          </p>
        </div>
        <form className="flex flex-col items-center gap-3 self-stretch">
          <div className="flex flex-col justify-center items-start gap-1 self-stretch">
            <label htmlFor="" className="text-blancoHueso text-sm font-normal">
              Username
            </label>
            <input
              type="text"
              className="flex h-14 p-4 items-center gap-1 self-stretch bg-slateGray"
              required
              placeholder="Enter your username"
            />
          </div>
          <div className="flex flex-col justify-center items-start gap-1 self-stretch">
            <label htmlFor="" className="text-blancoHueso text-sm  font-normal">
              Email
            </label>
            <input
              type="text"
              className="flex h-14 p-4 items-center gap-1 self-stretch bg-slateGray"
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="flex flex-col justify-center items-start gap-1 self-stretch">
            <label htmlFor="" className="text-blancoHueso text-sm font-normal ">
              Password
            </label>
            <input
              type="text"
              className="flex h-14 p-4 items-center gap-1 self-stretch bg-slateGray"
              required
              placeholder="Enter your password"
            />
            <button className="flex py-4 px-6 justify-center items-center gap-1 self-stretch rounded-lg bg-liquidLava mt-2">
              <div className="flex h-[22px] px-1 justify-center items-center gap-2">
                <p className="text-blancoHueso text-center text-md font-normal">
                  Sign up with Email
                </p>
              </div>
            </button>
          </div>
        </form>
        <p className="text-center text-blancoHueso font-normal  text-sm">
          Have and account?
          <span className="text-blancoHueso font-extrabold">Log in</span>
        </p>
      </section>
    </main>
  );
};

export default Register;
