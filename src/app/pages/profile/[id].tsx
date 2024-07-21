// import { useRouter } from "next/router"

// const User = () => {
//   const router = useRouter()

//   const { id } = router.query

//   return (
//     <div>
//       <h1>User {id}</h1>
//     </div>
//   )
// }

// export default User

import { useRouter } from 'next/router';

const Perfil = () => {
  const router = useRouter();
  const { id } = router.query; // Obtener el parámetro 'id' de la URL

  return (
    <div>
      <h1>Perfil de Usuario</h1>
      <p>Visualizando el perfil del usuario con ID: {id}</p>
    </div>
  );
};

export default Perfil;