"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/validations/registerSchema";

type Inputs = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};
 
const Register = () => {
  const { register, handleSubmit} = useForm<Inputs>({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <main className="flex bg-slateGray justify-center items-center h-screen">
      <section
        className="flex p-8 flex-col justify-center items-center gap-4 flex-1  rounded-[32px] bg-darkVoid
        max-w-[639px] max-sm:rounded-none max-sm:w-screen max-sm:h-screen "
      >
        <h1 className="text-blancoHueso text-center text-5xl font-normal leading-[52px] max-[320px]:text-3xl mt-5">
          Nexo
        </h1>
        <div className="flex flex-col justify-center items-center gap-2 self-stretch">
          <p className="text-blancoHueso items-center text-sm font-normal leading-[27px] max-[320px]:text-sm">
            Sign up to see posts from your friends.
          </p>
        </div>
        <form
          className="flex flex-col items-center gap-3 self-stretch"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col justify-center items-start gap-1 self-stretch">
            <label htmlFor="username" className="text-blancoHueso text-sm font-normal">
              Username
            </label>
            <input
              type="text"
              id="username"
              {...register("username")}
              className="flex h-14 p-4 items-center gap-1 self-stretch bg-slateGray  max-[320px]:h-10 text-blancoHueso"
              required
              placeholder="eliteBootcamp"
            />
          </div>
          <div className="flex flex-col justify-center items-start gap-1 self-stretch">
            <label htmlFor="email" className="text-blancoHueso text-sm  font-normal">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              className="flex h-14 p-4 items-center gap-1 self-stretch bg-slateGray max-[320px]:h-10 text-blancoHueso"
              required
              placeholder="elite@example.com"
            />
          </div>
          <div className="flex flex-col justify-center items-start gap-1 self-stretch">
            <label htmlFor="password" className="text-blancoHueso text-sm  font-normal">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password")}
              className="flex h-14 p-4 items-center gap-1 self-stretch bg-slateGray max-[320px]:h-10 text-blancoHueso"
              required
              placeholder="isasecret"
            />
          </div>
          <div className="flex flex-col justify-center items-start gap-1 self-stretch">
            <label htmlFor="confirmPassword" className="text-blancoHueso text-sm font-normal ">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword")}
              className="flex h-14 p-4 items-center gap-1 self-stretch bg-slateGray max-[320px]:h-10 text-blancoHueso"
              required
              placeholder="isasecret"
            />
            <button className="flex py-4 px-6 justify-center items-center gap-1 self-stretch rounded-lg bg-liquidLava mt-2 hover:bg-ligthPurple transition-colors">
              <div className="flex h-[22px] px-1 justify-center items-center gap-2">
                <p className="text-blancoHueso text-center text-md font-normal">
                  Sign up with Email
                </p>
              </div>
            </button>
          </div>
        </form>
        <div>
          <p className="text-center text-blancoHueso font-normal text-sm">
            Have and account? 
            <span className="text-blancoHueso font-extrabold cursor-pointer">
              Login
            </span>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Register;
