import { useState } from "react";
import { Menu, X } from "lucide-react";

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
        <a href="/" className="text-3xl font-bold text-emerald-600">
          TourGo
        </a>

        {/* Desktop Menu */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.path}
              className="font-medium text-gray-700 transition hover:text-emerald-600"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Buttons */}
        <div className="hidden items-center gap-4 md:flex">
          <button className="font-medium text-gray-700 hover:text-emerald-600">
            Login
          </button>

          <button className="rounded-full bg-emerald-600 px-5 py-2 text-white transition hover:bg-emerald-700">
            Sign Up
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t bg-white md:hidden">
          <nav className="flex flex-col px-6 py-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                className="py-3 text-gray-700 hover:text-emerald-600"
              >
                {link.name}
              </a>
            ))}

            <button className="mt-4 rounded-lg border py-2">
              Login
            </button>

            <button className="mt-3 rounded-lg bg-emerald-600 py-2 text-white">
              Sign Up
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;