import CommentIcon from "@/app/icons/CommentIcon";
import Comment from "./Comment";
import HeartIcon from "@/app/icons/HeartIcon";
import UserCircleIcon from "@/app/icons/UserCircleIcon";

const Comments = () => {
  return (
    <section className="flex items-center justify-center min-h-screen bg-opacity-50 backdrop-blur-sm">
      <div className="bg-darkVoid text-blancoHueso shadow-lg min-h-[700px] w-full max-w-4xl flex flex-col md:flex-row m-10">
        {/* Image Section */}
        <div className="hidden md:block md:w-1/2">
          <img 
            src="" 
            alt="Image" 
            className="object-cover h-full w-full"
          />
        </div>
        
        {/* Comments Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-between">
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
            <div className="w-full h-[1px] bg-blancoHueso" />
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
            <div className="w-full h-[1px] bg-blancoHueso" />
            <div className="flex items-center p-2 gap-6">
              <div className="flex items-center cursor-pointer">
                <HeartIcon />
                <span className="ml-1 cursor-default">20</span>
              </div>
              <div className="flex mb-1 cursor-pointer">
                <CommentIcon />
              </div>
            </div>
            <div className="w-full h-[1px] bg-blancoHueso" />
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
