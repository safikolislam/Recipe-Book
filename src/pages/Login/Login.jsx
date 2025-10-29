import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { auth, AuthContext } from '../../Provider/AuthProvider';
import Image from '../../assets/loginRecipe.png';

const Login = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signIn, setUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    if (password.length < 6) {
      const msg = "Password must be at least 6 characters long.";
      toast.error(msg);
      setError(msg);
      return;
    }
    if (!/[A-Z]/.test(password)) {
      const msg = "Password must contain at least one uppercase letter.";
      toast.error(msg);
      setError(msg);
      return;
    }
    if (!/[a-z]/.test(password)) {
      const msg = "Password must contain at least one lowercase letter.";
      toast.error(msg);
      setError(msg);
      return;
    }

    signIn(email, password)
      .then((result) => {
        setUser(result.user);
        toast.success("Login successful!");
        navigate('/');
      })
      .catch((error) => {
        const errMsg = error.message || "Login failed.";
        toast.error(errMsg);
        setError(errMsg);
      });
  };

  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
        toast.success("Logged in with Google!");
        navigate('/');
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="flex flex-col md:flex-row bg-base-100 shadow-2xl rounded-2xl overflow-hidden w-full max-w-5xl transition-all duration-300">
        
  
        <div className="md:w-1/2 p-10">
          <h1 className="text-4xl font-bold mb-6 text-center text-orange-500">
            Login Now!
          </h1>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block font-medium mb-1">Email</label>
              <input
                name="email"
                type="email"
                className="input input-bordered w-full bg-base-200"
                placeholder="Email"
                required
              />
            </div>

            <div className="relative">
              <label className="block font-medium mb-1">Password</label>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                className="input input-bordered w-full bg-base-200 pr-10"
                placeholder="Password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-9 right-3 text-base-content/60"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {error && <p className="text-error text-sm">{error}</p>}

            <button type="submit" className="btn bg-orange-500 text-white w-full">
              Login
            </button>

            <p className="text-center text-sm">
              Don't have an account?{" "}
              <Link to="/Register" className="text-orange-500 font-semibold">
                Register
              </Link>
            </p>

            <div className="flex items-center my-4">
              <hr className="flex-grow border-base-300" />
              <span className="mx-2 text-base-content/60">OR</span>
              <hr className="flex-grow border-base-300" />
            </div>

            <button
              onClick={handleGoogleSignIn}
              type="button"
              className="btn btn-outline w-full flex items-center justify-center gap-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-base-100"
            >
              <FcGoogle size={24} /> Login with Google
            </button>
          </form>
        </div>

      
        <div className="md:w-1/2 bg-base-300 flex items-center justify-center">
          <img
            src={Image}
            alt="Login illustration"
            className="w-80 h-80 md:w-full md:h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;



