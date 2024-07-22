export default function Message ({message, userId}: {message: string, userId: string}) {
  return (
      <li
          className={`py-2 px-6 ${
              userId === 'b8ce0d5f-e9df-4b9a-93fb-5189a27d664e'
              ? 'bg-ligthPurple self-end'
              : 'bg-liquidLava'
          } rounded-xl w-fit max-w-full text-blancoHueso`}
          >
          <p className="w-full text-wrap break-words">{message}</p>
      </li>
  );
}