"use client";

import { useEffect } from "react";
import { useAuth } from "../../context/authContext";
import { FaPencilAlt } from "react-icons/fa";
import Navbar from "@/app/components/navbar/Navbar";

const Profile = () => {
  const { loginToken, register } = useAuth();

  useEffect(() => {
    console.log(loginToken);
  }, []);

  let id: number = 0;
  let datos: any = [
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
    <main className="bg-darkVoid flex">
      <Navbar />
      <div className="contenedorP flex-1 ml-0 p-2 pt-16 md:ml-64 md:pt-4 sm:p-16 ">
        <section
          className="bg-cover bg-center bg-no-repeat relative mb-36"
          style={{
            backgroundImage: `url(${datos[id].imagenPortada})`,
            backgroundSize: "cover", // Ajusta la imagen al tamaño del contenedor
            backgroundPosition: "center", // Centra la imagen dentro del contenedor
            height: "40vh", // Altura deseada para el footer (puedes ajustar según tus necesidades)
          }}
        >
          <section></section>
          <div className="absolute top-14 left-16">
            <img
              className="rounded-full xl:w-96 xl:h-96 border-2 "
              src={datos[id].imagePerfil}
              alt="imagen"
            />
            <h3 className="text-3xl text-blancoHueso mx-auto  mt-3  absolute left-24 Ro">
              {datos[id].username}
            </h3>
          </div>
        </section>
        <div className="mt-6">
          <button className="text-blancoHueso text-3xl ml-36 flex items-center">
            <FaPencilAlt className="mr-2" />
            Edit profile
          </button>
        </div>
        <section className="mt-6 ml-36 text-blancoHueso flex flex-row w-[80%] mx-auto justify-between text-xl">
          <div>
            <p className="">Name</p>
            <p>{datos[id].name}</p>
          </div>
          <div>
            <p className="">Age</p>
            <p>{datos[id].age}</p>
          </div>
          <div>
            <p className="">Genre</p>
            <p>{datos[id].genre}</p>
          </div>
        </section>
        <section className="mt-8 grid grid-cols-4 gap-4">
          {datos[id].posts.map((post: any) => {
            return <img src={post} alt="post" />;
          })}
        </section>
      </div>
    </main>
  );
};

export default Profile;






