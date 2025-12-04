import { useEffect, useState } from "react";
import appwriteService from "../Appwrite/config";
import PostCard from "../components/PostCard";
import Container from "../components/Container/Container";
import { useSelector } from "react-redux";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    appwriteService.getPosts().then((result) => {
      if (result) {
        setPosts(result.documents);
      }
      setLoading(false);
    });
  }, []);

  if (authStatus && loading) {
    return (
      <div className="min-h-screen bg-gray-600 flex items-center justify-center py-16">
        <div className="text-center">
          <div className="inline-flex h-10 w-10 animate-spin rounded-full border-4 border-t-blue-400 border-gray-600"></div>
          <p className="text-gray-400 text-sm mt-3">Loading posts…</p>
        </div>
      </div>
    );
  }

  if (!authStatus) {
    return (
      <div className="min-h-screen bg-gray-600 flex items-center py-16">
        <Container>
          <h1 className="text-3xl font-semibold text-gray-200 text-center mb-3">
            Login to read posts
          </h1>
          <p className="text-center text-gray-400">
            Sign in to view the latest content from the community.
          </p>
        </Container>
      </div>
    );
  }

  if (!loading && posts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-600 flex items-center py-16">
        <Container>
          <h1 className="text-2xl font-semibold text-gray-200 text-center">
            No posts available
          </h1>
          <p className="text-gray-400 text-center mt-2">
            Start by creating your first post!
          </p>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-600 py-14">
      <Container>
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-100">
            Latest Posts
          </h1>
          <p className="text-gray-400 mt-2 max-w-2xl">
            Fresh content from our community. Browse the newest posts below.
          </p>
        </header>

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
      </Container>
    </div>
  );
}

export default Home;