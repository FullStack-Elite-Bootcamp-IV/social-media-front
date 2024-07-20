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
    <main className="bg-darkVoid flex">
      <Navbar />
      <div className="ml-[0px] w-[100vw] md:ml-[200px]  md:w-[100vw] lg:ml-[220px] lg:w-[100vw] xl:ml-[254px] xl:w-[100vw] 2xl:ml-[254px] 2xl:w-[100vw]  min-h-screen p-0 mt-0 md:bg-darkVoid">
        <section className="seccion-cabecera h-[50vh] pos relative">
          <div
            className="imagen-portada bg-cover bg-center bg-no-repeat relative mb-36 mt-0 flex"
            style={{
              backgroundImage: `url(${datos[id].imagenPortada})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "40vh",
            }}
          >
            <div className="contedor-usuario text-center absolute  transform -translate-y-1/2  -translate-x-1/2 flex text-blancoHueso left-20  top-80 sm:left-40  sm:top-80  md:left-52  md:top-80 lg:left-60 lg:top-72 xl:top-64">
              <div>
              <img
                className="rounded-full border-2 w-52 h-52 ml-4  sm:w-64 sm:h-64 md:w-64 md:h-64   lg:w-80 lg:h-80 xl:w-96 xl:h-96 "
                src={datos[id].imagePerfil}
                alt="imagen"
              />
              <h3 className="text-3xl mt-3">{datos[id].username}</h3>
              </div>
            
            </div>
          </div>
        </section>
        <section>
        <div className="info-seguidores mt-11 text-blancoHueso flex w-[70vw] flex-col sm:flex-row  sm:justify-around mx-auto sm:ml-5 xl:justify-around xl:ml-5  ">
             <div className="mr-4">
              <p>{datos[id].post}</p>
              <p>post</p>
             </div>
             <div className="mr-4">
              <p>{datos[id].followers}</p>
              <p>followers</p>
             </div>
             <div className="mr-4">
              <p>{datos[id].followed}</p>
              <p>followed</p>
          </div>

            </div>
        <div className=" div-boton mt-28 sm:mt-6 sm:text-left justify-center mx-auto">
          <button className="text-blancoHueso text-3xl ml-1  flex items-center mt-10 sm:ml-12 md:ml-36">
            <FaPencilAlt className="mr-2"/>Edit profile</button>
        </div>
        <section className="info-usuario mt-6 ml-5 text-blancoHueso flex flex-col  mx-auto justify-between text-lg sm:flex-row md:ml-36 lg:ml-36 lg:w-[70%] xl:ml-36 xl:w-[80%]">
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
                    <section className="cont-posts mt-8 grid sm:grid-cols-2 sm:gap-4 md:grid-cols-3 md:gap-4  lg:grid-cols-4 lg:gap-4">
                        {
                            datos[id].posts.map((post:any) =>{
                               return <img src={post} alt="post" />
                            })
                        }

                    </section>


        </section>

      </div>
    </main>
  );
};

export default Profile;