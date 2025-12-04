import logo from "../assets/logo.png";

function Logo({ width = "100px" }) {
  return (
    <div className="flex items-center">
      <img
        src={logo}
        width={width}
        alt="App Logo"
        className="object-contain select-none"
        draggable="false"
      />
    </div>
  );
}

export default Logo;