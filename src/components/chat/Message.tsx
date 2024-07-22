import { useUser } from "@/context/UserContext";

export default function Message ({message, userId}: {message: string, userId: string}) {
    const { user } = useUser();
    return (
      <li
          className={`py-2 px-6 ${
              userId === user?.userId
              ? 'bg-ligthPurple self-end'
              : 'bg-liquidLava'
          } rounded-xl w-fit max-w-full text-blancoHueso`}
          >
          <p className="w-full text-wrap break-words">{message}</p>
      </li>
  );
}