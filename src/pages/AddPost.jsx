import Container from "../components/Container/Container";
import PostForm from "../components/PostForm/PostForm";

function AddPost() {
  return (
    <div className="min-h-screen bg-gray-600 py-10">
      <Container>
        <h1 className="text-2xl font-semibold text-gray-100 mb-6">
          Create New Post
        </h1>

        <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 shadow-md">
          <PostForm />
        </div>
      </Container>
    </div>
  );
}

export default AddPost;