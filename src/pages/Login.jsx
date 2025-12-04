import LoginP from "../components/Login";

function Login() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-600 py-8">
      <div className="w-full px-4">
        <div className="mx-auto max-w-lg">
          <LoginP />
        </div>
      </div>
    </div>
  );
}

export default Login;