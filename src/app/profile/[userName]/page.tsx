"use client";

import { useEffect, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import Navbar from "@/components/navbar/Navbar";
import Post from "@/components/post/Post";
import Link from "next/link";
import UserList from "@/components/userlist/Userlist";
import { useUser } from "@/context/UserContext";
import { useGetUserWithPostsByUserNameQuery } from "@/store/services/usersApi";
import { useRouter } from "next/navigation";

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

const Profile = ({ params: { userName } }: { params: { userName: string } }) => {
  const [isOpenFollowers, setIsOpenFollowers] = useState(false);
  const [isOpenFollowed, setIsOpenFollowed] = useState(false);

  const { user } = useUser();

  const { data, isSuccess } = useGetUserWithPostsByUserNameQuery(userName);
  const [posts, setPosts] = useState<PostData[]>();

  useEffect(() => {
    if (isSuccess && data) {
      const processedPosts = data.userPost.map((post: PostData) => ({
        ...post,
        publicationDate: new Date(post.publicationDate),
      }));
      setPosts(processedPosts);
    }
  }, [isSuccess, data]);



  posts?.sort((a, b) => b.publicationDate.getTime() - a.publicationDate.getTime());

  const defaultProfileImage =
    "https://th.bing.com/th/id/OIP.m5kS1irkbp6YT0EvLKhBzwAAAA?rs=1&pid=ImgDetMain";

  return (
    <div className="min-h-screen bg-blancoHueso dark:bg-gray-900">
      <Navbar />
      <main className="flex md:ml-64 min-h-screen">
        <div className="w-full px-4 md:px-8 lg:px-16 mt-10 md:mt-0">
          <section
            className="relative w-full bg-cover bg-center rounded-lg shadow-lg mb-8 md:mb-12"
            style={{
              backgroundImage: `url("${data?.coverImage}")`,
              height: "200px",
            }}
          >
            <div className="absolute inset-0 flex justify-center items-center mt-20">
              <img
                className="rounded-full border-4 border-white w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48"
                src={data?.profileImage || defaultProfileImage}
                alt="perfil"
              />
            </div>
          </section>

          <div className="text-center text-darkVoid dark:text-blancoHueso mt-30 mb-8">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
              {data?.userName}
            </h1>
            <div className="flex flex-col sm:flex-row sm:justify-center sm:space-x-4 mt-4 text-base sm:text-lg">
              <div className="flex flex-col items-center mb-4 sm:mb-0">
                <p className="text-xl">{data?.posts}</p>
                <p className="text-darkVoid dark:text-gray-400">posts</p>
              </div>
              <div className="flex flex-col items-center mb-4 sm:mb-0">
                <p className="text-xl">{data?.followers}</p>
                <button
                  onClick={() => setIsOpenFollowed(!isOpenFollowed)}
                  className="text-blue-400 hover:text-blue-300"
                >
                  Followers
                </button>
                {isOpenFollowed && <UserList title="Followers List" />}
              </div>
              <div className="flex flex-col items-center mb-4 sm:mb-0">
                <p className="text-xl">{data?.followings}</p>
                <button
                  onClick={() => setIsOpenFollowers(!isOpenFollowers)}
                  className="text-blue-400 hover:text-blue-300"
                >
                  Followed
                </button>
                {isOpenFollowers && <UserList title="Followeds List" />}
              </div>
            </div>
            <Link
              href={`/profile/${user?.userName}/edit`}
              className="mt-6 flex items-center justify-center px-4 py-2 text-base sm:text-lg bg-liquidLava text-white rounded-md hover:bg-purple-800 transition duration-200"
            >
              <FaPencilAlt className="mr-2" /> Editar perfil
            </Link>
          </div>

          <section className="text-white mb-8">
            <div className="flex flex-col sm:flex-row sm:justify-around text-base sm:text-lg">
              <div className="mb-4 sm:mb-0">
                <p className="font-semibold text-darkVoid dark:text-gray-400">Nombre</p>
                <p className="text-darkVoid dark:text-white">{data?.fullName}</p>
              </div>
              <div className="mb-4 sm:mb-0">
                <p className="font-semibold text-darkVoid dark:text-gray-400">Edad</p>
                <p className="text-darkVoid dark:text-white">{data?.age}</p>
              </div>
              <div className="mb-4 sm:mb-0">
                <p className="font-semibold text-darkVoid dark:text-gray-400">Género</p>
                <p className="text-darkVoid dark:text-white">{data?.gender}</p>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
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
          </section>
        </div>
      </main>
    </div>
  );
};

export default Profile;
