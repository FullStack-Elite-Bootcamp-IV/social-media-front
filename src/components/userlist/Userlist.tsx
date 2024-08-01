import { useUser } from '@/context/UserContext';
import { useGetFollowedQuery, useGetFollowersQuery } from '@/store/services/followersApi';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import ItemList from './itemList';

interface UserListProps {
  title: string;
}

const UserList: React.FC<UserListProps> = ({ title }) => {
  const { user } = useUser();
  const [ isVisible, setIsVisible ] = useState(true);
  const [ data, setData ] = useState<string[]>();
  const { data: followedData, isSuccess: followedSuccess } = useGetFollowedQuery(user?.userId);
  const { data: followersData, isSuccess: followerSuccess } = useGetFollowersQuery(user?.userId);

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

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70'>
      <div className='w-[300px] bg-gray-200 p-4 pb-8 rounded-lg shadow-lg absolute z-10 top-32 mx-auto clase-fondo sm:w-[550px] md:ml-[254px] md:w-[500px] lg:ml-[254px] lg:w-[600px] xl:w-[700px]'>
        <div className="flex justify-between text-black text-xl items-center mb-4">
          <h1>{title}</h1>
          <button className="text-black text-xl" onClick={handleClose}>&times;</button>
        </div>
        <div className="space-y-4">
          {data?.map((id, index) => (
            <ItemList
              key={index}
              userId={id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserList;