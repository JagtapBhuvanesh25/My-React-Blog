import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

import Container from "../Container/Container";
import Logo from "../Logo";
import LogoutBtn from "./LogoutBtn";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  const isActive = (slug) => {
    return location.pathname === slug;
  };

  return (
    <header
      className="
        fixed top-0 left-0 w-full z-50
        bg-gray-900 border-b border-gray-700 shadow-lg
        backdrop-blur-sm
      "
    >
      <Container>
        <div className="flex items-center justify-between gap-4 py-3">
          <div className="flex items-center gap-3">
            <Link to="/" aria-label="Home" onClick={() => setOpen(false)}>
              <Logo width="70px" />
            </Link>
          </div>

          <nav
            className="hidden md:flex items-center gap-3 ml-6"
            aria-label="Primary navigation"
          >
            <ul className="flex items-center gap-2 whitespace-nowrap">
              {navItems.map(
                (item) =>
                  item.active && (
                    <li key={item.name}>
                      <button
                        onClick={() => {
                          navigate(item.slug);
                          setOpen(false);
                        }}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
                          transition duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-blue-400
                          ${
                            isActive(item.slug)
                              ? "bg-gray-800 text-white shadow"
                              : "text-gray-200 hover:bg-gray-800 hover:text-white active:bg-gray-700"
                          }`}
                        aria-current={isActive(item.slug) ? "page" : undefined}
                      >
                        {item.name}
                      </button>
                    </li>
                  )
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              {authStatus && <LogoutBtn />}
            </div>

            <button
              type="button"
              aria-expanded={open}
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex items-center justify-center rounded-md p-2 md:hidden text-gray-200 hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {open ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-[max-height] duration-200 ${
            open ? "max-h-[500px] pb-4" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-2">
            <ul className="flex flex-col px-2">
              {navItems.map(
                (item) =>
                  item.active && (
                    <li key={item.name}>
                      <button
                        onClick={() => {
                          navigate(item.slug);
                          setOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 rounded-md text-sm font-medium
                          transition duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-blue-400
                          ${
                            isActive(item.slug)
                              ? "bg-gray-800 text-white"
                              : "text-gray-200 hover:bg-gray-800"
                          }`}
                        aria-current={isActive(item.slug) ? "page" : undefined}
                      >
                        {item.name}
                      </button>
                    </li>
                  )
              )}
            </ul>

            {authStatus && (
              <div className="px-4">
                <LogoutBtn />
              </div>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
}

export default Header;