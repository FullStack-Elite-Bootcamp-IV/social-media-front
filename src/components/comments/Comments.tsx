import CommentIcon from "@/icons/CommentIcon";
import Comment from "./Comment";
import HeartIcon from "@/icons/HeartIcon";
import UserCircleIcon from "@/icons/UserCircleIcon";

const Comments = () => {
  return (
    <section className="flex items-center justify-center py-10">
      <div className="bg-gray-70 text-darkVoid dark:bg-darkVoid dark:text-gray-70 w-full flex flex-col md:flex-row">
        {/* Image Section */}

        
        {/* Comments Section */}
        <div className="w-full flex flex-col">
          {/* User and Description */}
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
            {/* Comments */}
            <div className="space-y-2 p-2">
              <Comment />
              <Comment />
              <Comment />
              <Comment />
            </div>
          </div>

          {/* Likes and Add Comment */}
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
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comments;
