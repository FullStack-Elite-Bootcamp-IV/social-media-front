"use client";

import Navbar from "@/components/navbar/Navbar";
import Post from "@/components/post/Post";
import { useDeleteFollowerMutation, useFollowersMutation, useGetFollowedQuery } from "@/store/services/followersApi";
import { useGetUserWithPostsByUserNameQuery } from "@/store/services/usersApi";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";

interface PostData {
  userId: string;
  description: string;
  isPublic: boolean;
  likes: number;
  media: string;
  postId: string;
  publicationDate: Date;
  title: string;
  updateDate: Date;
  userName: string;
  comments: number;
  favorites: number;
}

const Profile = ({ params: userName }: { params: { userName: string } }) => {
  const { user } = useUser();
  const { data, isSuccess } = useGetUserWithPostsByUserNameQuery(userName?.userName);
  const { data: followersData, isSuccess: isSuccessFollowers } = useGetFollowedQuery(user?.userId);
  const [followers] = useFollowersMutation();
  const [deleteFollow] = useDeleteFollowerMutation();
  const [follow, setFollow] = useState("Follow");
  const [posts, setPosts] = useState<PostData[]>();

  useEffect(() => {
    if (isSuccessFollowers && isSuccess) {
      const isFollow = followersData?.some((follow: string) => {
        return data?.userId === follow;
      });
      setFollow(isFollow ? "Unfollow" : "Follow");
    }
  }, [isSuccess, isSuccessFollowers]);

  useEffect(() => {
    if (isSuccess) {
      const processedPosts = data.userPost.map((post: PostData) => ({
        ...post,
        publicationDate: new Date(post.publicationDate)
      }));
      setPosts(processedPosts);
    }
  }, [isSuccess]);

  posts?.sort((a, b) => b.publicationDate.getTime() - a.publicationDate.getTime());

  const setFollowState = () => {
    if (follow === "Follow") {
      followers({ followerId: user?.userId, followingId: data?.userId });
      setFollow("Unfollow");
    } else {
      deleteFollow({ followerId: user?.userId, followingId: data?.userId });
      setFollow("Follow");
    }
  };

  const defaultProfileImage = 'https://th.bing.com/th/id/OIP.m5kS1irkbp6YT0EvLKhBzwAAAA?rs=1&pid=ImgDetMain';

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
                <div className="absolute z-10 flex flex-col px-2 py-20 mt-10 mx-6 lg:py-6 justify-center items-center">
                  <img
                    className="rounded-full border-2 w-32 h-32 sm:w-20 sm:h-20 lg:w-48 lg:h-48"
                    src={data?.profileImage || defaultProfileImage }
                    alt="imagen"
                  />
                  <h3 className="mx-auto text-2xl">{data?.userName}</h3>
                  <div className="px-4 py-1">
                    <button
                      className="mt-2 px-4 py-2 bg-liquidLava text-white rounded hover:bg-purple-800"
                      onClick={setFollowState}
                    >
                      {follow}
                    </button>
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
              <div className="grid grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 gap-6">
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