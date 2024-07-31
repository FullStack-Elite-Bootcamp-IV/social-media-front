"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/validations/registerSchema";
import { useRegisterMutation } from "@/store/services/usersApi";
import Link from "next/link";


type Inputs = {
  userName: string;
  email: string;
  password: string;
  gender: string;
  fullName: string; 
};
 
const Register = () => {
  const { register, handleSubmit} = useForm<Inputs>({
    resolver: zodResolver(registerSchema)
  });
  
  const [registerUser, { isLoading, error, isSuccess }] = useRegisterMutation();
  

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data)
    const result = await registerUser({
      "userName": data.userName,
      "email": data.email,
      "password": data.password,
      "fullName": data.fullName,
      "gender": data.gender
  });
    console.log(result);
  };

  return (
    <main className="flex bg-slateGray justify-center items-center min-h-screen">
      <section
        className="flex flex-col p-8 justify-center items-center gap-4 flex-1 rounded-[32px] bg-darkVoid
        max-w-[639px] max-sm:rounded-none max-sm:w-screen max-sm:min-h-screen"
      >
        <h1 className="text-blancoHueso text-center text-5xl font-normal leading-[52px] max-[320px]:text-3xl mt-5">
          Nexo
        </h1>
        <div className="flex flex-col justify-center items-center gap-2 w-full">
          <p className="text-blancoHueso text-sm font-normal leading-[27px] max-[320px]:text-xs">
            Sign up to share experiences.
          </p>
        </div>
        <form
          className="flex flex-col gap-3 w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col justify-center gap-1 w-full">
            <label htmlFor="userName" className="text-blancoHueso text-sm font-normal">
              Username
            </label>
            <input
              type="text"
              id="userName"
              {...register("userName")}
              className="h-14 p-4 bg-slateGray text-blancoHueso placeholder:text-blancoHueso rounded-lg w-full max-[320px]:h-10"
              required
              placeholder="eliteBootcamp"
            />
          </div>
          <div className="flex flex-col justify-center gap-1 w-full">
            <label htmlFor="email" className="text-blancoHueso text-sm font-normal">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              className="h-14 p-4 bg-slateGray text-blancoHueso placeholder:text-blancoHueso rounded-lg w-full max-[320px]:h-10"
              required
              placeholder="elite@example.com"
            />
          </div>
          <div className="flex flex-col justify-center gap-1 w-full">
            <label htmlFor="password" className="text-blancoHueso text-sm font-normal">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password")}
              className="h-14 p-4 bg-slateGray text-blancoHueso placeholder:text-blancoHueso rounded-lg w-full max-[320px]:h-10"
              required
              placeholder="isasecret"
            />
          </div>
          <div className="flex flex-col justify-center gap-1 w-full">
            <label htmlFor="gender" className="text-blancoHueso text-sm font-normal">
              Gender
            </label>
            <input
              type="text"
              id="gender"
              {...register("gender")}
              className="h-14 p-4 bg-slateGray text-blancoHueso placeholder:text-blancoHueso rounded-lg w-full max-[320px]:h-10"
              required
              placeholder="male or female"
            />
          </div>
          <div className="flex flex-col justify-center gap-1 w-full">
            <label htmlFor="fullName" className="text-blancoHueso text-sm font-normal">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              {...register("fullName")}
              className="h-14 p-4 bg-slateGray text-blancoHueso placeholder:text-blancoHueso rounded-lg w-full max-[320px]:h-10"
              required
              placeholder="Your Name"
            />
            <button className="py-4 px-6 rounded-lg bg-liquidLava mt-2 hover:bg-lightPurple transition-colors w-full text-blancoHueso">
              <p className="text-md font-normal text-center">
                Sign up with Email
              </p>
            </button>
          </div>
        </form>
        <div className="w-full flex justify-center mt-4">
          <p className="text-center text-blancoHueso font-normal text-sm">
            Have an account? 
            <Link href="/login">
              <strong>Log in</strong>
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
  
};

export default Register;
