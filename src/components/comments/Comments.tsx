import { useState } from "react";
import { useGetCommentsByPostIdQuery, useAddComentMutation, useUpdateCommentMutation, useDeleteCommentMutation, } from "@/redux/services/commentsApi";
import CommentIcon from "@/icons/CommentIcon";
import Comment from "./Comment";
import HeartIcon from "@/icons/HeartIcon";
import UserCircleIcon from "@/icons/UserCircleIcon";
import { jwtDecode } from "jwt-decode";

interface MyJwtPayload {
  id: string;
}

const token = localStorage.getItem('token');
const decodedToken = token ? jwtDecode<MyJwtPayload>(token) : null; 

const id = decodedToken?.id;

const Comments = ({ postId }: { postId: string }) => {
  

  const [newComment, setNewComment] = useState("");
  const { data: comments, error, isLoading } = useGetCommentsByPostIdQuery(postId);
  const [addComment] = useAddComentMutation();
  const [updateComment] = useUpdateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();

  const handleAddComment = async () => {
    try {
      await addComment({
        postId,
        body: {
          userId: id,
          content: newComment,
        },
      }).unwrap();
      setNewComment("");
    } catch (error) {
      console.error("Failed to add comment", error);
    }
  }

  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteComment({ postId, commentId }).unwrap();
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleEditComment = async (commentId: string, updatedContent: string) => {
    try {
      await updateComment({
        postId,
        commentId,
        body: { content: updatedContent },
      }).unwrap();
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading comments</div>;
  }

  return (
    <section className="flex items-center justify-center py-10">
      <div className="bg-gray-70 text-darkVoid dark:bg-darkVoid dark:text-white w-full flex flex-col md:flex-row">
        <div className="w-full flex flex-col">
          <div>
            <div className="flex p-2 items-center mb-4">
              <div className="mr-2 cursor-pointer">
                <UserCircleIcon />
              </div>
              <div className="flex-grow">
                <div className="font-bold">User</div>
                <div className="">Description</div>
              </div>
            </div>
            <div className="w-full h-[1px] bg-gray-70" />
            <div className="space-y-2 p-2">
              {comments.map((comment: { id: string, userId: string, content: string, date: string }) => (
                <Comment
                  key={comment.id}
                  comment={comment}
                  onDelete={() => handleDeleteComment(comment.id)}
                  onEdit={(updatedContent: string) => handleEditComment(comment.id, updatedContent)}
                />
              ))}
            </div>
          </div>

          <div>
            <div className="w-full bg-blancoHueso" />
            <div className="flex items-center p-2 gap-6">
              <div className="flex items-center cursor-pointer">
                <HeartIcon />
                <span className="ml-1 cursor-default">20</span>
              </div>
              <div className="flex mb-1 cursor-pointer">
                <CommentIcon />
              </div>
            </div>
            <div className="w-full bg-blancoHueso" />
            <div className="p-3">
              <input
                type="text"
                placeholder="Add a comment..."
                className="w-full bg-slateGray p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-ligthPurple"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button onClick={handleAddComment} className="mt-2 bg-blue-500 text-white p-2 rounded">Add Comment</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comments;