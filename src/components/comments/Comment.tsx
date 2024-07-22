import UserCircleIcon from "@/icons/UserCircleIcon";

interface CommentProps {
  comment: {
    id: string;
    userId: string;
    content: string;
    date: string;
  };
  onDelete: () => void;
  onEdit: (updatedContent: string) => void;
}

const Comment: React.FC<CommentProps> = ({ comment, onDelete, onEdit }) => {
  return (
    <div className="flex items-center">
      <div className="mr-2 cursor-pointer">
        <UserCircleIcon />
      </div>
      <div className="flex-grow">
        <div className="font-bold">{comment.content}</div>
        <div className="text-darkVoid dark:text-blancoHueso">{comment.date}</div>
      </div>
      <button onClick={onDelete}>Delete</button>
      <button onClick={() => onEdit("Updated content")}>Edit</button>
    </div>
  );
};

export default Comment;
