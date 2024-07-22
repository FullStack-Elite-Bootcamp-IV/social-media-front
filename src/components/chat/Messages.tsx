import Message from './Message';

interface Message {
  message: string;
  chatId: string;
  userId: string;
}

export default function Messages ({messages, chatId}: {messages: Message[], chatId: string}) {
  return (
      <ul className="flex flex-col gap-2 py-2 overflow-y-scroll max-h-dvh">
          {messages.filter((msg) => msg.chatId === chatId).map((msg, index) => (
              <Message key={index} message={msg.message} userId={msg.userId} />
          ))}
      </ul>
  );
}