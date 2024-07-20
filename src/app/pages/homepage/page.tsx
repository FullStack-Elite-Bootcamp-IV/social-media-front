'use client';
import React, { useState } from 'react';
import Post from '@/app/components/post/Post';

interface PostData {
  userid: string;
  title: string;
  description: string;
  media: string;
  likes: number;
  updateDate: Date;
  comments: number;
  favorites: number;
}

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<PostData[]>([
    {
      userid: 'MarcuSV0',
      title: 'El patio de mi casa',
      description: 'Quien quiere venir a mi casa? ',
      media: 'https://1.bp.blogspot.com/-zKX8CREi3QY/T2OMZgW3s6I/AAAAAAAAWzg/5sFH754c6sw/s1600/Los-mas-Hermosos-Paisajes-Naturales_04.jpg', 
      likes: 20,
      updateDate: new Date(),
      comments: 5,
      favorites: 10,
    },
    {
      userid: 'DANIEL-1',
      title: 'Mi viaje a Europa',
      description: 'Nest way to find my proposit',
      media: 'https://th.bing.com/th/id/OIF.0mpwGSIBRUhbxBmKJHCrpA?rs=1&pid=ImgDetMain', 
      likes: 1,
      updateDate: new Date(23/3/23),
      comments: 3,
      favorites: 8,
    },
  ]);

  return (
    <div className="app">
      {posts.map((post, index) => (
        <Post
          key={index}
          userid={post.userid}
          title={post.title}
          description={post.description}
          media={post.media}
          likes={post.likes}
          updateDate={post.updateDate}
          comments={post.comments}
          favorites={post.favorites}
        />
      ))}
    </div>
  );
}

export default HomePage;
