import { useState } from "react";
import {
  Menu,
  X,
  User,
  LogOut,
  CalendarDays,
  Star,
  ChevronDown,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import { useUser } from "../../hooks/useUser";

interface User {
  name: string;
  email: string;
  photo?: string;
}

interface HeaderProps {
  user?: User | null;
  onLogout: () => void;
}

const Header = () => {

  const { data: user } = useUser();
  console.log(user);

  const [isOpen, setIsOpen] = useState(false);

  const [isProfileOpen, setIsProfileOpen] = useState(false);

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
        {/* Authentication */}
        {/* Buttons */}
        {!user ? (
          <div className="hidden items-center gap-4 md:flex">
            <Link
              to="/login"
              className="font-medium text-gray-700 hover:text-emerald-600"
            >
              Login
            </Link>

            <Link
              to="/signUp"
              className="rounded-full bg-emerald-600 px-5 py-2 text-white transition hover:bg-emerald-700"
            >
              Sign Up
            </Link>
          </div>) : (

          /* Logged In User */
          <div className="relative">

            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-3 rounded-full p-1 transition hover:bg-slate-100"
            >

              {/* Profile Image */}
              {user.photo ? (

                <img
                  src={user.photo}
                  alt={user.name}
                  className="h-10 w-10 rounded-full object-cover"
                />

              ) : (

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                  <User
                    size={20}
                    className="text-emerald-600"
                  />
                </div>

              )}

              <div className="hidden text-left sm:block">
                <p className="text-sm font-semibold text-slate-800">
                  {user.name}
                </p>

                <p className="text-xs text-slate-500">
                  Traveler
                </p>
              </div>

              <ChevronDown
                size={18}
                className="text-slate-500"
              />

            </button>


            {/* Dropdown */}
            {isProfileOpen && (

              <div className="absolute right-0 z-50 mt-3 w-64 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">

                {/* User Info */}
                <div className="border-b border-slate-100 px-3 py-3">

                  <p className="font-semibold text-slate-800">
                    {user.name}
                  </p>

                  <p className="truncate text-sm text-slate-500">
                    {user.email}
                  </p>

                </div>


                {/* Profile */}
                <Link
                  to="/account/profile"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-slate-700 hover:bg-slate-100"
                >
                  <User size={18} />
                  Profile
                </Link>


                {/* Bookings */}
                <Link
                  to="/account/bookings"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-slate-700 hover:bg-slate-100"
                >
                  <CalendarDays size={18} />
                  My Bookings
                </Link>


                {/* Reviews */}
                <Link
                  to="/account/reviews"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-slate-700 hover:bg-slate-100"
                >
                  <Star size={18} />
                  My Reviews
                </Link>


                {/* Logout */}
                <button
                  // onClick={onLogout}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut size={18} />
                  Logout
                </button>

              </div>

            )}

          </div>

        )}

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
