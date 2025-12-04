import { useState, useEffect } from "react";
import Container from "../components/Container/Container";
import PostCard from "../components/PostCard";
import appwriteService from "../Appwrite/config";

function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts([]).then((res) => {
      if (res) setPosts(res.documents);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-600 py-10">
      <Container>
        <h1 className="text-2xl font-semibold text-gray-100 mb-6">
          All Posts
        </h1>

        {posts.length === 0 ? (
          <div className="text-center text-gray-400 py-20">
            No posts available.
          </div>
        ) : (
          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
              gap-6
            "
          >
            {posts.map((post) => (
              <PostCard key={post.$id} {...post} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

export default AllPosts;