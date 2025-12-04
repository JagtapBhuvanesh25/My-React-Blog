import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from '../Appwrite/config';
import Button from "../components/Button";
import Container from "../components/Container/Container";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { Query } from "appwrite";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;
  const fallback = "https://via.placeholder.com/960x400?text=No+Image";

  useEffect(() => {
    let mounted = true;

    async function load() {
      if (!slug) {
        navigate("/");
        return;
      }

      setPost(null);

      // 1) try getPost assuming slug is document id
      try {
        const doc = await appwriteService.getPost(slug);
        if (mounted) setPost(doc);
        return;
      } catch (err) {
        // proceed to fallback search by slug field
      }

      // 2) fallback: search by slug field
      try {
        const res = await appwriteService.getPosts([Query.equal("slug", slug)]);
        const found = res?.documents?.length ? res.documents[0] : null;
        if (!found) {
          navigate("/");
          return;
        }
        if (mounted) setPost(found);
      } catch (err) {
        console.error("Failed to load post:", err);
        navigate("/");
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, [slug, navigate]);

  const deletePost = async () => {
    if (!post) return;
    try {
      const ok = await appwriteService.deletePost(post.$id);
      if (ok) {
        if (post.featuredImage) {
          try {
            await appwriteService.deleteFile(post.featuredImage);
          } catch (e) {
            console.warn("Failed to delete file", e);
          }
        }
        navigate("/");
      }
    } catch (e) {
      console.error("Delete failed", e);
    }
  };

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

  const fileId =
    post.featuredImage ||
    post.featured_image ||
    post.image ||
    post.coverImage ||
    post.cover_image ||
    null;

  const imageUrl = fileId ? appwriteService.getFileViewUrl(fileId) : null;

  return (
    <div className="min-h-screen bg-gray-600 py-10">
      <Container>
        <div className="relative w-full mb-6">
          {imageUrl && (
            <div className="w-full rounded-xl overflow-hidden border border-gray-700 shadow-sm">
              <img
                src={imageUrl}
                alt={post.title}
                className="w-full h-72 object-cover"
                onError={(e) => {
                  e.currentTarget.src = fallback;
                }}
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

        <div className="w-full mb-6">
          <h1 className="text-3xl font-semibold text-gray-100 leading-tight">{post.title}</h1>
          <div className="mt-2 text-sm text-gray-400">
            {post.authorName ? `By ${post.authorName} • ` : ""}
            {post.$createdAt ? new Date(post.$createdAt).toLocaleDateString() : ""}
          </div>
        </div>

        <article className="prose prose-invert max-w-none text-gray-100">{parse(post.content)}</article>
      </Container>
    </div>
  );
}