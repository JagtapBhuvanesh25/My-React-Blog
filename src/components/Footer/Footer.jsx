import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
  return (
    <footer
      className="fixed bottom-0 left-0 w-full z-40 bg-gray-900 text-gray-200 border-t border-gray-700"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12 items-center">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex flex-col gap-2">
              <div className="inline-flex items-center">
                <Logo width="160px" />
              </div>

              <p className="text-sm text-gray-400">
                Build thoughtful posts and share ideas. Responsive, accessible,
                and made with tailwind.
              </p>

              <p className="text-xs text-gray-500">
                &copy; {new Date().getFullYear()}. All rights reserved.
              </p>
            </div>
          </div>

          {/* Links columns */}
          <div className="md:col-span-7">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <nav aria-label="Company links" className="space-y-2">
                <h3 className="text-xs font-semibold uppercase text-gray-400 tracking-wider">
                  Company
                </h3>
                <ul className="mt-1 space-y-1">
                  <li>
                    <Link to="/" className="text-sm font-medium text-gray-200 hover:text-white transition">
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="text-sm font-medium text-gray-200 hover:text-white transition">
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="text-sm font-medium text-gray-200 hover:text-white transition">
                      Affiliate Program
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="text-sm font-medium text-gray-200 hover:text-white transition">
                      Press Kit
                    </Link>
                  </li>
                </ul>
              </nav>

              <nav aria-label="Support links" className="space-y-2">
                <h3 className="text-xs font-semibold uppercase text-gray-400 tracking-wider">
                  Support
                </h3>
                <ul className="mt-1 space-y-1">
                  <li>
                    <Link to="/" className="text-sm font-medium text-gray-200 hover:text-white transition">
                      Account
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="text-sm font-medium text-gray-200 hover:text-white transition">
                      Help
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="text-sm font-medium text-gray-200 hover:text-white transition">
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="text-sm font-medium text-gray-200 hover:text-white transition">
                      Customer Support
                    </Link>
                  </li>
                </ul>
              </nav>

              <nav aria-label="Legal links" className="space-y-2">
                <h3 className="text-xs font-semibold uppercase text-gray-400 tracking-wider">
                  Legals
                </h3>
                <ul className="mt-1 space-y-1">
                  <li>
                    <Link to="/" className="text-sm font-medium text-gray-200 hover:text-white transition">
                      Terms &amp; Conditions
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="text-sm font-medium text-gray-200 hover:text-white transition">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="text-sm font-medium text-gray-200 hover:text-white transition">
                      Licensing
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;