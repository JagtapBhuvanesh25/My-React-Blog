import React, { useEffect, useState } from "react";
import Container from "../components/Container/Container";
import PostForm from "../components/PostForm/PostForm";
import appwriteService from "../Appwrite/config";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  const [post, setPosts] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPosts(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  // Show a tasteful loading state while the post is fetched
  if (!post) {
    return (
      <div className="min-h-screen bg-gray-600 flex items-center justify-center py-10">
        <div className="text-center">
          <div className="inline-flex h-10 w-10 animate-spin rounded-full border-4 border-t-blue-400 border-gray-700" />
          <p className="mt-4 text-sm text-gray-400">Loading post…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-600 py-10">
      <Container>
        <h1 className="text-2xl font-semibold text-gray-100 mb-6">Edit Post</h1>

        <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 shadow-md">
          <PostForm post={post} />
        </div>
      </Container>
    </div>
  );
}

export default EditPost;