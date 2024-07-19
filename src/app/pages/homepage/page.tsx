'use client';
import React, { useState } from 'react';
import Post from '@/app/context/postContext';

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
      userid: 'USER-0',
      title: 'Post Title 1',
      description: 'DESCRIPTION 1',
      media: 'https://via.placeholder.com/150', 
      likes: 20,
      updateDate: new Date(),
      comments: 5,
      favorites: 10,
    },
    {
      userid: 'USER-1',
      title: 'Post Title 2',
      description: 'DESCRIPTION 2',
      media: 'https://via.placeholder.com/150', 
      likes: 15,
      updateDate: new Date(),
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
