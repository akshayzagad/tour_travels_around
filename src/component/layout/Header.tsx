import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Tours", path: "/tours" },
    { name: "Destinations", path: "/destinations" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="text-3xl font-bold text-emerald-600">
          TourGo
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="font-medium text-gray-700 transition hover:text-emerald-600"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Buttons */}
        <div className="hidden items-center gap-4 md:flex">
          <Link to="/login" className="font-medium text-gray-700 hover:text-emerald-600">
            Login
          </Link>

          <Link
            to="/signUp"
            className="rounded-full bg-emerald-600 px-5 py-2 text-white transition hover:bg-emerald-700"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t bg-white md:hidden">
          <nav className="flex flex-col px-6 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="py-3 text-gray-700 hover:text-emerald-600"
              >
                {link.name}
              </Link>
            ))}

            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="mt-4 rounded-lg border py-2 text-center"
            >
              Login
            </Link>

            <Link
              to="/signUp"
              onClick={() => setIsOpen(false)}
              className="mt-3 rounded-lg bg-emerald-600 py-2 text-center text-white"
            >
              Sign Up
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
