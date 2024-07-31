
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import Link from "next/link";
import { useGetChatsQuery } from "@/store/services/chatApi";

interface Chat {
    chatId: string;
    user1Id: string;
    user2Id: string;
    lastMessage: string | null;
  }

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
        chats ? chats.map((chat:any) => (
          <Chat key={chat.chatId} {...chat} />
        )) : <p>No chats yet</p>
        }
      </div>
    );
  }