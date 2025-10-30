import { Link, NavLink } from "react-router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import { Sun, Moon } from "lucide-react";
import userImg from "../assets/user.png";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Logged Out",
          text: "You Logged Out Successfully",
        });
      })
      .catch((error) => console.error(error));
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-orange-500 underline" : ""
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/AllRecipe"
          className={({ isActive }) =>
            isActive ? "text-orange-500 underline" : ""
          }
        >
          All Recipes
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/AddRecipe"
          className={({ isActive }) =>
            isActive ? "text-orange-500 underline" : ""
          }
        >
          Add Recipe
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/MyRecipe"
          className={({ isActive }) =>
            isActive ? "text-orange-500 underline" : ""
          }
        >
          My Recipes
        </NavLink>
      </li>
    </>
  );

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-base-100 shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center py-3">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-orange-500 whitespace-nowrap"
          >
            Recipe Book
          </Link>

          {/* Hamburger (Mobile) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 border rounded-md border-orange-400 text-orange-500 hover:bg-orange-500 hover:text-white transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Desktop Links */}
          <ul className="hidden lg:flex gap-6 font-semibold">{navLinks}</ul>

          {/* Right Section */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="relative group cursor-pointer">
              <div className="w-10 h-10 rounded-full border border-orange-500 overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={user?.photoURL || userImg}
                  alt={user?.displayName || "Guest"}
                />
              </div>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-white dark:bg-gray-800 px-2 py-1 rounded-md shadow-md text-sm font-medium whitespace-nowrap transition">
                {user?.displayName || "Guest"}
              </div>
            </div>

            {user ? (
              <button
                onClick={handleLogOut}
                className="btn bg-orange-500 border-none text-white hover:bg-orange-600"
              >
                LogOut
              </button>
            ) : (
              <Link
                to="/Login"
                className="btn bg-orange-500 border-none text-white hover:bg-orange-600"
              >
                Login
              </Link>
            )}

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-orange-500 hover:bg-orange-500 hover:text-white transition"
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden bg-base-100 shadow-md px-6 pb-4 space-y-3 font-semibold">
            <ul onClick={() => setMenuOpen(false)} className="flex flex-col gap-3">
              {navLinks}
            </ul>

            <div className="flex items-center justify-between pt-3 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <img
                  className="w-10 h-10 rounded-full border border-orange-500 object-cover"
                  src={user?.photoURL || userImg}
                  alt={user?.displayName || "Guest"}
                />
                <p className="text-sm">{user?.displayName || "Guest"}</p>
              </div>

              <button
                onClick={toggleTheme}
                className="p-2 rounded-full border border-orange-500 hover:bg-orange-500 hover:text-white transition"
              >
                {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
              </button>
            </div>

            {user ? (
              <button
                onClick={handleLogOut}
                className="w-full btn mt-3 bg-orange-500 border-none text-white hover:bg-orange-600"
              >
                LogOut
              </button>
            ) : (
              <Link
                to="/Login"
                className="w-full btn mt-3 bg-orange-500 border-none text-white hover:bg-orange-600"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </nav>

      <div className="pt-20" />
    </>
  );
};

export default Navbar;








