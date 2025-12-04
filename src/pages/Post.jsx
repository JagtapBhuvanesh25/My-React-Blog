import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from '../Appwrite/config';
import Button from "../components/Button";
import Container from "../components/Container/Container";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  // Loading skeleton / spinner while post is fetching
  if (!post) {
    return (
      <div className="min-h-screen bg-gray-600 flex items-center justify-center py-10">
        <div className="text-center">
          <div className="inline-flex h-10 w-10 animate-spin rounded-full border-4 border-t-blue-400 border-gray-700" />
          <p className="mt-3 text-sm text-gray-400">Loading post…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-600 py-10">
      <Container>
        {/* Hero / image */}
        <div className="relative w-full mb-6">
          {post.featuredImage && (
            <div className="w-full rounded-xl overflow-hidden border border-gray-700 shadow-sm">
              <img
                src={appwriteService.getFilePrev(post.featuredImage)}
                alt={post.title}
                className="w-full h-72 object-cover"
              />
            </div>
          )}

          {isAuthor && (
            <div className="absolute right-0 -mt-12 mr-2 flex gap-2">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="shadow">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost} className="shadow">
                Delete
              </Button>
            </div>
          )}
        </div>

        {/* Title & meta */}
        <div className="w-full mb-6">
          <h1 className="text-3xl font-semibold text-gray-100 leading-tight">
            {post.title}
          </h1>
          <div className="mt-2 text-sm text-gray-400">
            {post.authorName ? `By ${post.authorName} • ` : ""}
            {post.$createdAt ? new Date(post.$createdAt).toLocaleDateString() : ""}
          </div>
        </div>

        {/* Content */}
        <article className="prose prose-invert max-w-none text-gray-100">
          {parse(post.content)}
        </article>
      </Container>
    </div>
  );
}