import { useUser } from '@/context/UserContext';
import { useGetFollowedQuery, useGetFollowersQuery } from '@/store/services/followersApi';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface UserListProps {
  title: string;
}

const UserList: React.FC<UserListProps> = ({ title }) => {
  const { user } = useUser();
  const [ isVisible, setIsVisible ] = useState(true);
  const [ data, setData ] = useState<String[]>();
  const { data: followedData, isSuccess: followedSuccess } = useGetFollowedQuery(user?.userId);
  const { data: followersData, isSuccess: followerSuccess } = useGetFollowersQuery(user?.userId);
  const router = useRouter();

  useEffect(() => {
  if ( title == "Followeds List" && followedSuccess) {
    setData(followedData);
  } else if ( title == "Followers List" && followerSuccess) {
    setData(followersData);
  }
  }, [followedSuccess, followerSuccess])

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  const viewProfile = (userName: string) => {
    router.push(`/${userName}`)
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70'>
      <div className='w-[300px] bg-gray-200 p-4 pb-8 rounded-lg shadow-lg absolute z-10 top-32 mx-auto clase-fondo sm:w-[550px] md:ml-[254px] md:w-[500px] lg:ml-[254px] lg:w-[600px] xl:w-[700px]'>
        <div className="flex justify-between text-black text-xl items-center mb-4">
          <h1>{title}</h1>
          <button className="text-black text-xl" onClick={handleClose}>&times;</button>
        </div>
        <div className="space-y-4">
          {data?.map((id, index) => (
            <button key={index} className="w-full bg-white p-3 rounded-lg flex items-center space-x-4" onClick={() => {console.log("funciona")}}>
              <div className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center">
                <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 3a7 7 0 100 14 7 7 0 000-14zm0 12a5 5 0 100-10 5 5 0 000 10zm0-3a2 2 0 110-4 2 2 0 010 4zm0 2a4 4 0 01-4-4h8a4 4 0 01-4 4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <div className="text-black font-bold">{id}</div>
                <div className="text-gray-500 text-sm">Date 2 weeks ago</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserList;