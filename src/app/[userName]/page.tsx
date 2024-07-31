"use client";

import Navbar from "@/components/navbar/Navbar";
import Post from "@/components/post/Post";
import { useGetUserWithPostsByUserNameQuery } from "@/store/services/usersApi";
import { useEffect, useState } from "react";

interface PostData {
  description: string;
  isPublic: boolean;
  likes: number;
  media: string;
  postId: string;
  publicationDate: Date;
  title: string;
  updateDate: Date;
  userId: string;
  userName: string;
  comments: number;
  favorites: number;
}
/* 
interface UserInfoData {
  profileImage: string;
  coverImage: string;
  fullName: string;
  age: string;
  gender: string;
  posts: string;
  followers: string;
  followings: string;
  userPost: PostData[]
}
 */
const Profile = ({ params: userName }: { params: { userName: string } }) => {

/*   let datos = [
    {
      imagePerfil: "https://www.clarin.com/2021/07/28/BqTG5Eqhd_360x240__1.jpg",
      imagenPortada:
        "https://yesofcorsa.com/wp-content/uploads/2020/05/4K-Landscape-Best-Wallpaper-1024x576.jpg",
      username: "birulboy",
      post: 5,
      followers: 355,
      followed: 30,
      name: "brayan andres pinchao",
      age: 20,
      genre: "male",
      posts: [
        "https://cdn.forbes.com.mx/2014/09/Travelocity-Cartagena-Destacada.Galeria.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Baluarte_de_Santiago_CTG_11_2019_9804.jpg/1200px-Baluarte_de_Santiago_CTG_11_2019_9804.jpg",
        "https://blogskystorage.s3.amazonaws.com/2022/01/viaje-a-iquitos.jpeg",
        "https://viajes.nationalgeographic.com.es/medio/2018/02/27/atenas-grecia__1280x720.jpg",
      ],
    },
  ]; */

  let { data, isSuccess } = useGetUserWithPostsByUserNameQuery(userName?.userName);
  const postsArray: PostData[] = data?.userPost;
  const [posts, setPosts] = useState<PostData[]>(postsArray);

  // Cuando llegan los datos se setean en el estado
  useEffect(() => {
    if (isSuccess) {
      setPosts(postsArray);
    }
  }, [isSuccess, data])

  return (
    <main>
        <Navbar />
    <div className="flex min-h-screen">
      <div className="flex-grow bg-darkVoid text-white md:ml-64">
        <div className="relative w-full flex flex-col items-center lg:mt-0">
          <section className="relative w-full">
            <div
              className="imagen-portada bg-cover bg-center bg-no-repeat relative"
              style={{
                backgroundImage: `url(${data?.coverImage})`,
                height: "30vh", 
              }}
            >
            
            <div className="absolute z-10 flex flex-col px-6 py-20 mt-6 lg:py-6 justify-center items-center">
              <img
                className="rounded-full border-2 w-32 h-32 sm:w-20 sm:h-20 lg:w-48 lg:h-48 "
                src={data?.profileImage}
                alt="imagen"
              />
              <div className="mt-2 py-1 lg:mt-0 lg:ml-4 flex-wrap lg:right ">
                <h3 className="mx-auto text-2xl">{data?.userName}</h3>
                <div className="px-4 py-1">
                <button className="mt-2 px-4 py-2 bg-liquidLava text-white rounded hover:bg-purple-800">
                  Seguir
                </button>
                </div>
              </div>
            </div>
                
                 <div className="absolute w-full bottom-0 flex justify-end sm:pr-0 md:pr-10 py-2 text-white">
                  <div className="">
                  <button className="justify-center text-center px-4">
                    <p>{data?.posts}</p>
                    <p>posts</p>
                  </button>
                  <button className="text-center px-4">
                    <p>{data?.followers}</p>
                    <p>followers</p>
                  </button>
                  <button className="text-center px-4">
                    <p>{data?.followings}</p>
                    <p>followed</p>
                  </button>
                  </div>
                </div>
              </div>
          </section>
          <section className="w-full mt-8 p-4 px-20">
          <div className="text-center mb-4 sm:mb-0">
                <p>{data?.name}</p>
              </div>
            <div className="info-usuario mt-6 text-blancoHueso flex flex-col sm:flex-row justify-around mx-auto w-full lg:w-3/5 mb-10">
              <div className="text-center mb-4 sm:mb-0">
                <p className="font-bold">Age</p>
                <p>{data?.age}</p>
              </div>
              <div className="text-center mb-4 sm:mb-0">
                <p className="font-bold">Genre</p>
                <p>{data?.genre}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 3xl:grid-cols-3 gap-6">
              {posts?.map((post, index) => (
                <div key={index} className="bg-gray-200 dark:bg-gray-800 rounded-lg shadow-lg p-4">
                  <Post
                    userId={post?.userId}
                    title={post?.title}
                    description={post?.description}
                    media={post?.media}
                    likes={post?.likes}
                    updateDate={post?.updateDate}
                    comments={post?.comments}
                    favorites={post?.favorites}
                    postId={post?.postId}
                  />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
    </main>
  );
};

export default Profile;