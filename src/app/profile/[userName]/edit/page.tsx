'use client';

import Navbar from "../../../../components/navbar/Navbar";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editProfileSchema } from "@/validations/editProfileSchema";
import { useEditProfileMutation } from "@/store/services/editApi";
import { useGetUserByUserNameQuery } from "@/store/services/usersApi";
import { useUploadImageMutation } from "@/store/services/postsApi";
import { useUser } from "@/context/UserContext";
import { User } from "@/types/user";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Edit = ({ params: { userName } }: { params: { userName: string } }) => {
  const { user } = useUser();
  const router = useRouter();
  const [initialValues, setInitialValues] = useState<User | null>(null);
  const [uploadImage] = useUploadImageMutation();
  const userCurrentData = useGetUserByUserNameQuery(userName);

  useEffect(() => (
    setInitialValues(userCurrentData.data)
  ), [userCurrentData]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<User>({
    values: initialValues || ({} as User),
    resolver: zodResolver(editProfileSchema),
  });

  const [editProfile, { isSuccess }] = useEditProfileMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Profile updated successfully");
      router.push(`/profile/${userName}`);
    }
  }, [isSuccess]);

  const onSubmit: SubmitHandler<User> = async (data) => {
    
    let profileImageUrl: string | undefined = '';
    let coverImageUrl: string | undefined = '';
    const coverImage = data.coverImage;
    const profileImage = data.profileImage;
    
    if (profileImage) {
      try {
        const response = await uploadImage(profileImage).unwrap();
        profileImageUrl = response.imageUrl;
        console.log(profileImageUrl)
      } catch (error) {
        console.error('Failed to upload image:', error);
        return;
      }
    } else { profileImageUrl = initialValues?.profileImage }

    if (coverImage) {
      try {
        const response = await uploadImage(coverImage).unwrap();
        coverImageUrl = response.imageUrl;
      } catch (error) {
        console.error('Failed to upload image:', error);
        return;
      }
    } else { coverImageUrl = initialValues?.coverImage }

    console.log(data.fullName);

    const result = await editProfile({
      body: {
        userName: user?.userName,
        description: data.description,
        fullName: data.fullName,
        gender: data.gender,
        location: data.location,
        personalWebSite: data.personalWebSite,
        workPlace: data.workPlace,
        profileImage: profileImageUrl,
        coverImage: coverImageUrl,
      },
      id: user?.userId,
    });
    console.log("Edit profile result, ", result);
  };

  const handleProfileFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setValue("profileImage", file as any);
  };

  const handleCoverFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setValue("coverImage", file as any);
  };

  return (
    <div className="min-h-screen bg-blancoHueso dark:bg-gray-900">
        <Navbar />
      <main className="flex md:ml-64 min-h-screen">
          <form className="space-y-4 w-full px-4 md:px-8 lg:px-16 mt-10 md:mt-0" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-2xl dark:text-white text-black mb-6 text-left pt-4">
              Actualizar información
            </h1>
            <div className="flex justify-start flex-col">
              <label className="mb-1 text-black dark:text-white">
                Imagen de perfìl
              </label>
              <input
                className={`dark:text-white bg-lightGray dark:text-e dark:bg-slateGray p-1 rounded-lg`}
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleProfileFileChange}
              />
            </div>
            <div className="flex justify-start flex-col">
              <label className="mb-1 text-black dark:text-white">
                Imagen de fondo
              </label>
              <input
                className={`dark:text-white bg-lightGray dark:text-e dark:bg-slateGray p-1 rounded-lg`}
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleCoverFileChange}
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
      </main>
    </div>
  );
};

export default Edit;
