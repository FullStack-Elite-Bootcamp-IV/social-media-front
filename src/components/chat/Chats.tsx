const CHATS_EXAMPLE = [
    {
      chatId: '41a623cc-de61-4b71-973f-67054249af9e',
      user1Id: '8426697f-88a3-44e2-a878-5f5244a41018',
      user2Id: 'e8b5f7b9-1f5f-4d1b-8e1d-4b1e4c4b1c1b',
      lastMessage: null
    },
    {
      chatId: 'e8b5f7b9-1f5f-4d1b-8e1d-4b1e4c4b1c',
      user1Id: '8426697f-88a3-44e2-a878-5f5244a41018',
      user2Id: '41a623cc-de61-4b71-973f-67054249af9e',
      lastMessage: null
    },
    {
      chatId: 'f8b5f7b9-1f5f-4d1b-8e1d-4b1e4c4b1c1b',
      user1Id: '8426697f-88a3-44e2-a878-5f5244a41018',
      user2Id: '43a623cc-de61-4b71-973f-67054249af9e',
      lastMessage: null
    },
    {
      chatId: 'g8b5f7b9-1f5f-4d1b-8e1d-4b1e4c4b1c',
      user1Id: '92b6697f-88a3-44e2-a878-5f5244a41018',
      user2Id: '8426697f-88a3-44e2-a878-5f5244a41018',
      lastMessage: null
    },
    {
      chatId: 'h8b5f7b9-1f5f-4d1b-8e1d-4b1e4c4b1c',
      user1Id: '7b6697f-88a3-44e2-a878-5f5244a41018',
      user2Id: '8426697f-88a3-44e2-a878-5f5244a41018',
      lastMessage: null
    },
    {
      chatId: 'i8b5f7b9-1f5f-4d1b-8e1d-4b1e4c4b1c',
        user1Id: '8426697f-88a3-44e2-a878-5f5244a41018',
        user2Id: 'e8b5f7b9-1f5f-4d1b-8e1d-4b1e4c4b1c1b',
        lastMessage: 'Hello'
    },
    {
      chatId: 'j8b5f7b9-1f5f-4d1b-8e1d-4b1e4c4b1c',
        user1Id: '8426697f-88a3-44e2-a878-5f5244a41018',
        user2Id: '41a623cc-de61-4b71-973f-67054249af9e',
        lastMessage: 'Hi'
    },
    {
        chatId: 'k8b5f7b9-1f5f-4d1b-8e1d-4b1e4c4b1c1',
        user1Id: '8426697f-88a3-44e2-a878-5f5244a41018',
        user2Id: '43a623cc-de61-4b71-973f-67054249af9e',
        lastMessage: 'Hey'
    }
  ]

  interface Chat {
    chatId: string;
    user1Id: string;
    user2Id: string;
    lastMessage: string | null;
  }

import { useEffect, useState } from "react";

import { useUser } from "@/context/UserContext";
import Link from "next/link";

import { useGetChatsQuery } from "@/store/services/chatApi";

  function Chat({ chatId, user1Id, user2Id, lastMessage }: { chatId: string; user1Id: string; user2Id: string; lastMessage: string | null }) {
    const { user } = useUser();
    return (
        <Link className="flex items-center space-x-4 p-4 bg-blancoHueso dark:bg-darkVoid rounded-xl shadow-md md:w-min" href={`/chat?chatId=${chatId}`}>
            <div className="flex items-center justify-center w-12 h-12 bg-liquidLava text-white rounded-full">
                <p>image</p>
            </div>
            <div className="flex flex-col flex-1">
                <h2 className="text-sm font-semibold text-darkVoid dark:text-blancoHueso">{`User: ${user?.userId === user1Id ? user2Id : user1Id}`}</h2>
                {
                    lastMessage ? <p className="text-xs text-darkVoid dark:text-blancoHueso">{lastMessage}</p> : <p className="text-xs text-darkVoid dark:text-blancoHueso">No messages yet</p>
                }
            </div>
        </Link>
    )
  }

export default function Chats() {
    const { user } = useUser();
    console.log(user)
    const { data: chats, error, isLoading } = useGetChatsQuery({ id: user?.userId || ''});

    return (
      <div className="flex absolute t-0 p-4 gap-4 flex-col min-h-dvh md:ml-64 md:w-min mt-16 md:mt-0 bg-ligthPurple overflow-y-scroll w-full">
        {
        chats ? chats.map(chat => (
          <Chat key={chat.chatId} {...chat} />
        )) : <p>No chats yet</p>
        }
      </div>
    );
  }