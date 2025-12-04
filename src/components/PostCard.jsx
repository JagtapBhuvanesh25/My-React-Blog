import appwriteService from "../Appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div
        className="
          w-full
          bg-gray-100
          rounded-xl
          overflow-hidden
          shadow-sm
          border border-gray-200
          hover:shadow-xl
          hover:-translate-y-1
          transition-all duration-300
        "
      >
        {/* Image */}
        {featuredImage && (
          <div className="w-full h-48 overflow-hidden">
            <img
              src={appwriteService.getFilePrev(featuredImage)}
              alt={title}
              className="
                w-full h-full object-cover
                transition-transform duration-300
                hover:scale-105
              "
            />
          </div>
        )}

        {/* Content */}
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800 leading-snug">
            {title}
          </h2>

          {/* subtle bottom meta bar */}
          <div className="mt-3 text-xs text-gray-500 border-t border-gray-300 pt-2">
            Click to read →
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;