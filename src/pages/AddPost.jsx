import components from "../components/index";

function AddPost() {
  return (
    <div className="py-8">
      <components.Container>
        <components.PostForm />
      </components.Container>
    </div>
  );
}

export default AddPost;
