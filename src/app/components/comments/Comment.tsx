import UserCircleIcon from "@/app/icons/UserCircleIcon"

const Comment = () => {
  return (
    <div className="flex items-center">
            <div className="mr-2 cursor-pointer">
              <UserCircleIcon />
            </div>
            <div className="flex-grow">
              <div className="font-bold">Comment</div>
              <div className="text-blancoHueso">Date</div>
            </div>
          </div>
  )
}

export default Comment
