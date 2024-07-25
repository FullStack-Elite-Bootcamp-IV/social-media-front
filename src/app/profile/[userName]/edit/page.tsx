'use client';

import Navbar from "../../../../components/navbar/Navbar";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editProfileSchema } from "@/validations/editProfileSchema";
import { useEditProfilev2Mutation } from "@/store/services/editApi";
import { useUser } from "@/context/UserContext";
import { User } from "@/types/user";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import axios from 'axios';

const Page = ({ params: { userName } }: { params: { userName: string } }) => {
  const { user } = useUser();
  const router = useRouter();
  const [initialValues, setInitialValues] = useState<User | null>(null);
  const [isCurrentUser, setIsCurrentUser] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/profile/${userName}`);
        const fetchedUserData = response.data;

        setInitialValues(fetchedUserData);
        if (user && user.userName === userName) {
          setIsCurrentUser(true);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userName, user]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<User>({
    values: initialValues || ({} as User),
    resolver: zodResolver(editProfileSchema),
  });

  const [editProfile, { isSuccess }] = useEditProfilev2Mutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Profile updated successfully");
      router.push('/homepage');
    }
  }, [isSuccess]);

  const onSubmit: SubmitHandler<User> = async (data) => {
    const result = await editProfile({
      body: {
        userName: data.userName,
        description: data.description,
        fullName: data.fullName,
        gender: data.gender,
        location: data.location,
        personalWebSite: data.personalWebSite,
        workPlace: data.workPlace,
      },
      id: user?.userId,
    });
    console.log("Edit profile result, ", result);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setValue("media", file as any);
  };

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-3">
        <Navbar></Navbar>
      </div>
      <main className="col-span-9 dark:bg-black bg-white w-80vh p-8 h-screen overflow-auto">
        {isCurrentUser ? (
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-2xl dark:text-white text-black mb-6 text-left">
              Actualizar información
            </h1>
            <div className="flex justify-start flex-col">
              <label className="mb-1 text-black dark:text-white">
                Profile imagen
              </label>
              <input
                className={`dark:text-white bg-lightGray dark:text-e dark:bg-slateGray p-1 rounded-lg ${errors.media ? "border-red-500" : ""}`}
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleFileChange}
                placeholder="Select a file"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 text-black dark:text-white">
                Nombre completo
              </label>
              <input
                className={`dark:placeholder-lightGray placeholder-slateGray bg-lightGray text-black dark:bg-slateGray rounded-lg px-3 py-2 w-50 focus:outline-none focus:ring-2 focus:ring-purple-600 dark:text-white ${errors.fullName ? "border-red-500" : ""}`}
                type="text"
                placeholder="Enter a fullname"
                {...register("fullName")}
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs italic">
                  {errors.fullName?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <label className="mb-1 dark:text-white text-black">Gender</label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center dark:text-white text-black">
                  <input
                    type="radio"
                    value="male"
                    className={`mr-2 dark:text-white text-black ${errors.gender ? "border-red-500" : ""}`}
                    {...register("gender")}
                  />
                  Hombre
                </label>
                <label className="flex items-center dark:text-white text-black">
                  <input
                    type="radio"
                    value="female"
                    className="mr-2 dark:text-white text-black"
                    {...register("gender")}
                  />
                  Mujer
                </label>
                <label className="flex items-center dark:text-white text-black">
                  <input
                    type="radio"
                    value="Other"
                    className="mr-2 dark:text-white text-black"
                    {...register("gender")}
                  />
                  Otro
                </label>
              </div>
            </div>
            <div className="flex flex-col">
              <label className="mb-1 dark:text-white text-black">
                Descripcion
              </label>
              <input
                className={`dark:placeholder-lightGray placeholder-slateGray bg-lightGray text-black dark:bg-slateGray rounded-lg px-3 py-2 w-50 focus:outline-none focus:ring-2 focus:ring-purple-600 dark:text-white ${errors.description ? "border-red-500" : ""}`}
                type="text"
                placeholder="Enter a description"
                {...register("description")}
              />
              {errors.description && (
                <p className="text-red-500 text-xs italic">
                  {errors.description?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <label className="mb-1 dark:text-white text-black">
                Localizacion
              </label>
              <input
                className={`dark:placeholder-lightGray placeholder-slateGray bg-lightGray text-black dark:bg-slateGray rounded-lg px-3 py-2 w-50 focus:outline-none focus:ring-2 focus:ring-purple-600 dark:text-white ${errors.location ? "border-red-500" : ""}`}
                type="text"
                placeholder="Enter a location"
                {...register("location")}
              />
              {errors.location && (
                <p className="text-red-500 text-xs italic">
                  {errors.location?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <label className="mb-1 dark:text-white text-black">
                Lugar de trabajo
              </label>
              <input
                className={`dark:placeholder-lightGray placeholder-slateGray bg-lightGray text-black dark:bg-slateGray rounded-lg px-3 py-2 w-50 focus:outline-none focus:ring-2 focus:ring-purple-600 dark:text-white ${errors.workPlace ? "border-red-500" : ""}`}
                type="text"
                placeholder="Enter a workplace"
                {...register("workPlace")}
              />
              {errors.workPlace && (
                <p className="text-red-500 text-xs italic">
                  {errors.workPlace?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <label className="mb-1 dark:text-white text-black">
                Sitio Web personal
              </label>
              <input
                className={`dark:placeholder-lightGray placeholder-slateGray bg-lightGray text-black dark:bg-slateGray rounded-lg px-3 py-2 w-50 focus:outline-none focus:ring-2 focus:ring-purple-600 dark:text-white ${errors.personalWebSite ? "border-red-500" : ""}`}
                type="text"
                placeholder="Enter a link"
                {...register("personalWebSite")}
              />
              {errors.personalWebSite && (
                <p className="text-red-500 text-xs italic">
                  {errors.personalWebSite?.message}
                </p>
              )}
            </div>
            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className=" bg-liquidLava hover:bg-purple-400 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              >
                Update
              </button>
            </div>
          </form>
        ) : (
          <p className="text-white">No tienes permisos para editar este perfil.</p>
        )}
      </main>
    </div>
  );
};

export default Page;
