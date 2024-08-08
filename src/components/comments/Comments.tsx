import { useState } from "react";
import {
  useGetCommentsByPostIdQuery,
  useAddComentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} from "@/store/services/commentsApi";
import Comment from "./Comment";
import { useUser } from "@/context/UserContext";

interface CommentsProps {
  postId: string;
  setShowComments: Function;
}

interface Comment { 
  id: string; 
  userId: string; 
  content: string;
  date: string;
}

const Comments = ({ postId, setShowComments }: CommentsProps) => {
  const [newComment, setNewComment] = useState("");
  const { data: comments, isLoading } = useGetCommentsByPostIdQuery(postId);
  const { user } = useUser();
  const [addComment] = useAddComentMutation();
  const [updateComment] = useUpdateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();

  const handleAddComment = async () => {
    try {
      const myComment = addComment({
        userId: user?.userId,
        postId: postId,
        content: newComment,
      });
      console.log(myComment)
      setNewComment("");
    } catch (error) {
      console.error("Failed to add comment", error);
    }
  };

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

  const handleClose = () => {
    setShowComments(false);
  };

  return (
    <section className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70">
      <div className="bg-gray-70 w-1/2 h-5/6 ml-60 rounded-2xl p-4 text-darkVoid dark:bg-zinc-950 dark:text-white flex flex-col">
        <div className="w-full flex flex-col overflow-hidden">
          <div className="flex justify-end mb-2">
            <button className="text-white text-xl" onClick={handleClose}>&times;</button>
          </div>
          <div className="overflow-y-auto scrollbar-hidden p-2">
            {comments && comments.length > 0 ? (
              comments.map((comment: Comment) => (
                <Comment
                  key={comment.id}
                  comment={comment}
                  onDelete={() => handleDeleteComment(comment.id)}
                  onEdit={(updatedContent: string) => handleEditComment(comment.id, updatedContent)}
                />
              ))
            ) : (
              <div className="w-full flex items-center justify-center">
                There are no comments yet. Add one
              </div>
            )}
          </div>
          <div className="w-full flex items-center justify-center p-3 gap-6 mt-2">
            <input
              type="text"
              placeholder="Add a comment..."
              className="w-4/5 bg-slateGray p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-ligthPurple"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button onClick={handleAddComment} className="bg-liquidLava text-white py-2 px-4 rounded">Send</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comments;
