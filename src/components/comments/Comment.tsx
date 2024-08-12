'use client';

import { useUser } from "@/context/UserContext";
import { useGetUserByIdQuery } from "@/store/services/usersApi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

interface CommentProps {
  comment: {
    id: string;
    userId: string;
    content: string;
    createdAt: Date;
  };
  onDelete: () => void;
  onEdit: (
    commentId: string,
    updatedContent: string,
  ) => void;
}

const Comment: React.FC<CommentProps> = ({ comment, onDelete, onEdit }) => {
  const { user } = useUser();
  const router = useRouter()
  const { data: userData, isSuccess } = useGetUserByIdQuery(comment.userId);
  const userName = userData?.userName;
  const [isMyComment, setIsMyComment] = useState(false);

  useEffect(() => {
    if (isSuccess) {    
      if (userName === user?.userName) {
        setIsMyComment(true)
      }
    }
  }, [isSuccess])

  return (
    <div className="flex flex-wrap items-center p-4 bg-white dark:bg-darkVoid rounded-lg shadow-md mt-2">
      <div 
        className="flex items-center cursor-pointer mr-4 w-full" 
        onClick={() => router.push(`/profile/${userName}`)}>
        <Image
          src={user?.profileImage || "https://th.bing.com/th/id/OIP.m5kS1irkbp6YT0EvLKhBzwAAAA?rs=1&pid=ImgDetMain"} 
          alt={`${userName}'s profile picture`} 
          className="rounded-full object-cover mb-2"
          width={40}
          height={40}
        />
        <span className="ml-2 font-bold text-gray-800 dark:text-blancoHueso">{userData?.userName}</span>
      </div>
      <div className="flex-grow">
        <div className="font-bold text-gray-800 dark:text-blancoHueso mb-1">{comment.content}</div>
        <div className="text-sm text-gray-500 dark:text-gray-300">{new Date(comment.createdAt).toLocaleString()}</div>
        {isMyComment? <div>
          <button 
            onClick={onDelete} 
            className="mt-4 hover:bg-red-600 text-white py-1 px-3 rounded transition-colors duration-200">
            Delete
          </button>
          <button 
            onClick={() => (onEdit(comment.id, comment.content))} 
            className="mt-4 ml-2 hover:bg-blue-600 text-white py-1 px-3 rounded transition-colors duration-200">
            Edit
          </button> 
          </div> : 
          <div></div>}
      </div>
    </div>
  );
  
};

export default Comment;
