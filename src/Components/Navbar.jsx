import { Link, NavLink } from "react-router"; 
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import { Sun, Moon } from "lucide-react";
import userImg from "../assets/user.png"; 

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
      <div className="navbar bg-base-100 shadow-sm fixed top-0 left-0 w-full z-50">
        <div className="navbar-start">
    
          <div className="dropdown">
            <button
              tabIndex={0}
              className="btn btn-ghost lg:hidden"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </button>

            {dropdownOpen && (
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow font-semibold absolute"
                onClick={() => setDropdownOpen(false)}
              >
                {navLinks}
              </ul>
            )}
          </div>

          <Link
            to="/"
            className="btn btn-ghost normal-case text-2xl font-bold text-orange-500"
          >
            Recipe Book
          </Link>
        </div>

     
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-5 font-semibold">
            {navLinks}
          </ul>
        </div>

        <div className="navbar-end flex items-center gap-4 mr-5">
        
          <div className="relative group cursor-pointer">
            <Link to="/">
              <div className="w-10 h-10 rounded-full border border-orange-500 overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={user?.photoURL || userImg}
                  alt={user?.displayName || "Guest"}
                />
              </div>
            </Link>
            <div className="absolute right-10 -mt-10 opacity-0 group-hover:opacity-100 bg-white dark:bg-gray-800 px-2 py-1 rounded-md shadow-md text-sm font-medium transition-opacity">
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
            {theme === "light" ? <Moon size={22} /> : <Sun size={22} />}
          </button>
        </div>
      </div>

      <div className="pt-20"></div>
    </>
  );
};

export default Navbar;







