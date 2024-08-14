'use client';

import { useForm, SubmitHandler } from "react-hook-form";
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
  const [initialValues, setInitialValues] = useState<User | null>(null);
  const [uploadImage] = useUploadImageMutation();
  const userCurrentData = useGetUserByUserNameQuery(userName);

  useEffect(() =>{ 
    setInitialValues(userCurrentData.data)
  }, [userCurrentData]);

  

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<User>({
    values: initialValues || ({} as User),
  });

  const [editProfile, { isSuccess }] = useEditProfileMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Profile updated successfully");
      window.location.href = `/profile/${userName}`;
      
      
    }
  }, [isSuccess, userName]);

  const onSubmitData: SubmitHandler<User> = async (data) => {

    let profileImageUrl: string | undefined = '';
    let coverImageUrl: string | undefined = '';
    const coverImage = data.coverImage;
    const profileImage = data.profileImage;
    
    if (profileImage) {
      try {
        const response = await uploadImage(profileImage).unwrap();
        profileImageUrl = response.imageUrl;
      } catch (error) {
        //return;
      }
    } else {
      profileImageUrl = initialValues?.profileImage }

    if (coverImage) {
      try {
        const response = await uploadImage(coverImage).unwrap();
        coverImageUrl = response.imageUrl;
      } catch (error) {
        //return;
      }
    } else {
      coverImageUrl = initialValues?.coverImage }

console.log(data)
console.log(initialValues)

const age = parseInt(data.age as any, 10);

    await editProfile({
      body: {
        userName: user?.userName,
        fullName: data.fullName,
        age: isNaN(age) ? undefined : age,
        gender: data.gender,
        location: data.location,
/*         personalWebSite: data.personalWebSite,
        workPlace: data.workPlace, */
        profileImage: profileImageUrl,
        coverImage: coverImageUrl,
      },
      id: user?.userId,
    });
  };

  //-----------------------------------------------------------------//

  const handleProfileFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setValue("profileImage", file as any);
  };

  const handleCoverFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setValue("coverImage", file as any);
  };

  //-----------------------------------------------------------------//

  return (
    <div className="min-h-screen bg-blancoHueso dark:bg-gray-900">
      <main className="flex md:ml-64 min-h-screen">
          <form className="space-y-4 w-full px-4 md:px-8 lg:px-16 mt-10 md:mt-0" onSubmit={handleSubmit(onSubmitData)}>
            <h1 className="text-2xl dark:text-white text-black mb-6 text-left pt-4">
              Change information
            </h1>
            <div className="flex justify-start flex-col">
              <label className="mb-1 text-black dark:text-white">
                Profile image
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
                Cover image
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
                Full name
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
                  Male
                </label>
                <label className="flex items-center dark:text-white text-black">
                  <input
                    type="radio"
                    value="female"
                    className="mr-2 dark:text-white text-black"
                    {...register("gender")}
                  />
                  Female
                </label>
                <label className="flex items-center dark:text-white text-black">
                  <input
                    type="radio"
                    value="Other"
                    className="mr-2 dark:text-white text-black"
                    {...register("gender")}
                  />
                  Other
                </label>
              </div>
            </div>
            <div className="flex flex-col">
              <label className="mb-1 dark:text-white text-black">
                Age
              </label>
              <input
                className={`dark:placeholder-lightGray placeholder-slateGray bg-lightGray text-black dark:bg-slateGray rounded-lg px-3 py-2 w-50 focus:outline-none focus:ring-2 focus:ring-purple-600 dark:text-white ${errors.age ? "border-red-500" : ""}`}
                type="number"
                placeholder="Enter a age"
                {...register("age")}
              />
              {errors.description && (
                <p className="text-red-500 text-xs italic">
                  {errors.description?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <label className="mb-1 dark:text-white text-black">
                Localization
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
