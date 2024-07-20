"use client";

import { useEffect } from "react";
import { useAuth } from "../../context/authContext";
import Navbar from "@/app/components/navbar/Navbar";

const Profile = () => {
  const { loginToken } = useAuth();

  useEffect(() => {
    console.log(loginToken);
  }, []);

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
    <main>
        <Navbar />
    <div className="flex min-h-screen">
      <div className="flex-grow bg-darkVoid text-white ml-64">
        <div className="relative w-[100vw] w-full max-w-screen-xl flex flex-col items-center lg:mt-0">
          <section className="relative w-full">
            <div
              className="imagen-portada bg-cover bg-center bg-no-repeat relative"
              style={{
                backgroundImage: `url(${datos[id].imagenPortada})`,
                height: "30vh", 
              }}
            >
              <div className="absolute bottom-0 left-0 w-full flex justify-around bg-black bg-opacity-50 text-white">
                <button className="text-center">
                  <p>{datos[id].post}</p>
                  <p>posts</p>
                </button>
                <button className="text-center">
                  <p>{datos[id].followers}</p>
                  <p>followers</p>
                </button>
                <button className="text-center">
                  <p>{datos[id].followed}</p>
                  <p>followed</p>
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center lg:flex-row lg:items-end lg:absolute lg:bottom-0 lg:left-8 transform translate-y-[-50%] lg:translate-y-0">
              <img
                className="rounded-full border-2 w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48"
                src={datos[id].imagePerfil}
                alt="imagen"
              />
              <div className="mt-2 lg:mt-0 lg:ml-4 text-center lg:text-left">
                <h3 className="text-2xl">{datos[id].username}</h3>
                <button className="mt-2 px-4 py-2 bg-liquidLava text-white rounded hover:bg-purple-800">
                  Seguir
                </button>
              </div>
            </div>
          </section>
          <section className="w-full lg:w-2/3 mt-6 p-4">
            <div className="info-usuario mt-6 text-blancoHueso flex flex-col sm:flex-row justify-around mx-auto w-full lg:w-3/5">
              <div className="text-center mb-4 sm:mb-0">
                <p className="font-bold">Name</p>
                <p>{datos[id].name}</p>
              </div>
              <div className="text-center mb-4 sm:mb-0">
                <p className="font-bold">Age</p>
                <p>{datos[id].age}</p>
              </div>
              <div className="text-center mb-4 sm:mb-0">
                <p className="font-bold">Genre</p>
                <p>{datos[id].genre}</p>
              </div>
            </div>
            <div className="cont-posts mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {datos[id].posts.map((post, index) => (
                <img key={index} src={post} alt="post" className="w-full h-auto rounded-lg" />
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