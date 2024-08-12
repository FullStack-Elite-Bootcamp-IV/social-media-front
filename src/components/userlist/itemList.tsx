import { useGetUserByIdQuery } from "@/store/services/usersApi";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface ItemListProps {
  userId: string
}

const ItemList: React.FC<ItemListProps>  = ({ userId }) => {
  const router = useRouter();
  const { data: userData } = useGetUserByIdQuery(userId);
  const userName = userData?.userName;
  const profileImage = userData?.profileImage;

  const viewProfile = (userName: string) => {
    router.push(`/profile/${userName}`)
  }

  const defaultProfileImage = 'https://th.bing.com/th/id/OIP.m5kS1irkbp6YT0EvLKhBzwAAAA?rs=1&pid=ImgDetMain';

  return (
    <button className="w-full bg-white p-3 rounded-lg flex items-center space-x-4" onClick={() => {viewProfile(userName)}}>
      <div className="rounded-full w-10 h-10 flex items-center justify-center">
        <Image
          className="rounded-full border-2"
          src={profileImage || defaultProfileImage}
          alt="imagen perfíl"
          width={40}
          height={40}
        />
      </div>
      <div className="text-black font-bold">{userName}</div>
    </button>
  )}

export default ItemList