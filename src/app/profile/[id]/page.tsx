"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/authContext";
import { FaPencilAlt } from "react-icons/fa";
import Navbar from "@/components/navbar/Navbar";

import UserList from "@/components/userlist/Userlist";

const Profile = () => {
  const { loginToken, register } = useAuth();
  const [isOpenFollowers, setIsOpenFollowers] = useState(false);
  const [isOpenFollowed, setIsOpenFollowed] = useState(false);

  const openFollowersList = () => {
    setIsOpenFollowers(!isOpenFollowers);
  };
  const openFollowedList = () => {
    setIsOpenFollowed(!isOpenFollowed);
  };

  useEffect(() => {
    console.log(loginToken);
  }, [loginToken]);

  let id = 0;
  let datos = [
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
  ];

  return (
    <main className="bg-darkVoid min-h-screen flex flex-col items-center">
      {/* <Navbar /> */}
      <div className="w-[100vw]  left-10   md:w-[100vh] lg:w-[100vw]">
        <section className="relative w-full bg-cover bg-center mb-8 md:mb-12" style={{
          backgroundImage: `url(${datos[id].imagenPortada})`,
          height: "200px",
        }}>
          <div className="absolute inset-0 flex justify-center items-center">
            <img
              className="rounded-full border-4 border-white w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48"
              src={datos[id].imagePerfil}
              alt="perfil"
            />
          </div>
        </section>

        <div className="text-center text-white mb-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl">{datos[id].username}</h1>
          <div className="flex flex-col sm:flex-row sm:justify-center sm:space-x-4 mt-4 text-base sm:text-lg">
            <div className="flex flex-col items-center mb-4 sm:mb-0">
              <p className="text-xl">{datos[id].post}</p>
              <p>posts</p>
            </div>
            <div className="flex flex-col items-center mb-4 sm:mb-0">
              <p className="text-xl">{datos[id].followers}</p>
              <button onClick={openFollowedList}>followers</button>
              {isOpenFollowed && < UserList title="Followers List"/>}
            </div>
            <div className="flex flex-col items-center mb-4 sm:mb-0">
              <p className="text-xl">{datos[id].followed}</p>
              <button onClick={openFollowersList}>followed</button>
              {isOpenFollowers && <UserList title="Followeds List"/>}
              
            </div>
          </div>
          <button className="mt-6 flex items-center justify-center px-4 py-2 text-base sm:text-lg bg-blue-500 text-white rounded-md hover:bg-blue-600">
            <FaPencilAlt className="mr-2" /> Edit profile
          </button>
        </div>

        <section className="text-white mb-8">
          <div className="flex flex-col sm:flex-row sm:justify-around text-base sm:text-lg">
            <div className="mb-4 sm:mb-0">
              <p className="font-semibold">Name</p>
              <p>{datos[id].name}</p>
            </div>
            <div className="mb-4 sm:mb-0">
              <p className="font-semibold">Age</p>
              <p>{datos[id].age}</p>
            </div>
            <div className="mb-4 sm:mb-0">
              <p className="font-semibold">Genre</p>
              <p>{datos[id].genre}</p>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {datos[id].posts.map((post, index) => (
            <img key={index} src={post} alt={`Post ${index + 1}`} className="w-full h-auto rounded-lg" />
          ))}
        </section>
      </div>
    </main>
  );
};

export default Profile;
