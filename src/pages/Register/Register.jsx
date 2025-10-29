import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { AuthContext } from "../../Provider/AuthProvider";
import Image from "../../assets/loginRecipe.png";

const Register = () => {
  const navigate = useNavigate();
  const { createUser, updateUser, setUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [photoURL, setPhotoURL] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );

    try {
      const cloudName = import.meta.env.VITE_CLOUDINARY_NAME;
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      );
      setPhotoURL(res.data.secure_url);
      toast.success("Image uploaded successfully!");
    } catch (err) {
      toast.error("Image upload failed.");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    if (password.length < 6) {
      const msg = "Password must be at least 6 characters long.";
      setError(msg);
      toast.error(msg);
      return;
    }
    if (!/[A-Z]/.test(password)) {
      const msg = "Password must contain at least one uppercase letter.";
      setError(msg);
      toast.error(msg);
      return;
    }
    if (!/[a-z]/.test(password)) {
      const msg = "Password must contain at least one lowercase letter.";
      setError(msg);
      toast.error(msg);
      return;
    }

    try {
      const result = await createUser(email, password);
      const user = result.user;
      await updateUser({ displayName: name, photoURL });
      setUser({ ...user, displayName: name, photoURL });
      toast.success("Account created successfully!");
      navigate("/");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 transition duration-300">
      <div className="flex flex-col md:flex-row bg-base-100 shadow-2xl rounded-2xl overflow-hidden w-full max-w-5xl">
        <div className="md:w-1/2 p-10 text-base-content">
          <h1 className="text-4xl font-bold mb-6 text-center text-orange-500">
            Create Account
          </h1>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block font-medium mb-1">Name</label>
              <input
                name="name"
                type="text"
                className="input input-bordered w-full"
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Profile Photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="file-input file-input-bordered w-full"
              />
              {uploading && (
                <p className="text-primary text-sm mt-1">Uploading...</p>
              )}
              {photoURL && (
                <img
                  src={photoURL}
                  alt="Uploaded"
                  className="w-20 h-20 rounded-full mt-2 object-cover border-2 border-primary"
                />
              )}
            </div>

            <div>
              <label className="block font-medium mb-1">Email</label>
              <input
                name="email"
                type="email"
                className="input input-bordered w-full"
                placeholder="Email"
                required
              />
            </div>

            <div className="relative">
              <label className="block font-medium mb-1">Password</label>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                className="input input-bordered w-full pr-10"
                placeholder="Password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-9 right-3 text-base-content/70"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {error && <p className="text-error text-sm">{error}</p>}

            <button
              type="submit"
              className="btn bg-orange-500 w-full text-white"
            >
              {uploading ? "Please wait..." : "Register"}
            </button>

            <p className="text-center text-sm">
              Already have an account?{" "}
              <Link to="/Login" className="text-orange-500 font-semibold">
                Login
              </Link>
            </p>
          </form>
        </div>

        <div className="md:w-1/2 bg-base-300 flex items-center justify-center">
          <img
            src={Image}
            alt="Register illustration"
            className="w-80 h-80 md:w-full md:h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;



