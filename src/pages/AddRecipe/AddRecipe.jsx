import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router"; 
import Swal from "sweetalert2";

const API_BASE = import.meta.env.VITE_API_URL;

const AddRecipe = () => {
  const queryClient = useQueryClient();
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const { mutate: addRecipe, isLoading } = useMutation({
    mutationFn: async (recipe) => {
      const res = await axios.post(`${API_BASE}/recipe`, recipe);
      return res.data;
    },
    onSuccess: (data) => {
      if (data.insertedId) {
        Swal.fire({
          title: "Success!",
          text: "Recipe added successfully!",
          icon: "success",
        });
        queryClient.invalidateQueries({ queryKey: ["recipes"] });
      }
    },
    onError: (err) => {
      Swal.fire({
        title: "Error!",
        text: err.response?.data?.message || err.message,
        icon: "error",
      });
    },
  });

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
      );

      const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/image/upload`;
      const res = await axios.post(cloudinaryUrl, formData);
      setImageUrl(res.data.secure_url);
      Swal.fire({
        title: "Image uploaded!",
        icon: "success",
        timer: 1200,
        showConfirmButton: false,
      });
    } catch {
      setImageUrl("");
      Swal.fire({ title: "Upload failed!", icon: "error" });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target).entries());

    if (!imageUrl) {
      Swal.fire({ title: "Please upload an image!", icon: "warning" });
      return;
    }

    const selectedCategories = Array.from(
      e.target.querySelectorAll('input[name="categories"]:checked')
    ).map((el) => el.value);

    formData.categories = selectedCategories.join(",") || "";

    addRecipe({ ...formData, image: imageUrl });

    e.target.reset();
    setImageUrl("");
  };

  return (
    <div className="max-w-xl mx-auto p-8 mt-10 rounded-xl shadow-xl bg-base-100 border border-base-300">
      <h2 className="text-3xl font-bold mb-6 text-center text-orange-500">
        Add New Recipe
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
  
        <div>
          <label className="block font-semibold mb-2 text-base-content">
            Recipe Image
          </label>
          <input
            type="file"
            onChange={handleImageUpload}
            className="file-input file-input-bordered w-full border border-base-300 focus:border-orange-500"
          />
          {uploading && <p className="text-orange-400 mt-2">Uploading...</p>}
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Preview"
              className="w-32 h-32 mt-3 rounded-lg border-2 border-orange-400"
            />
          )}
        </div>

        <input
          type="text"
          name="title"
          placeholder="Recipe Title"
          className="input input-bordered w-full border-base-300 focus:border-orange-500"
          required
        />

        <textarea
          name="ingredients"
          placeholder="Ingredients"
          className="textarea textarea-bordered w-full h-24 border-base-300 focus:border-orange-500"
          required
        />

        <textarea
          name="instructions"
          placeholder="Instructions"
          className="textarea textarea-bordered w-full h-28 border-base-300 focus:border-orange-500"
          required
        />

        <input
          type="number"
          name="prepTime"
          placeholder="Preparation Time (minutes)"
          className="input input-bordered w-full border-base-300 focus:border-orange-500"
        />

        <select
          name="cuisine"
          className="select select-bordered w-full border-base-300 focus:border-orange-500"
        >
          {["Italian", "Mexican", "Indian", "Chinese", "Others"].map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <span className="block font-semibold text-base-content mb-1">
          Categories
        </span>
        <div className="flex flex-wrap gap-4 mb-4">
          {["Breakfast", "Lunch", "Dinner", "Dessert", "Vegan"].map((cat) => (
            <label key={cat} className="flex items-center gap-2 text-base-content">
              <input
                type="checkbox"
                name="categories"
                value={cat}
                className="checkbox checkbox-sm border-orange-400 [--chkbg:theme(colors.orange.500)] [--chkfg:white]"
              />
              <span>{cat}</span>
            </label>
          ))}
        </div>

        <button
          type="submit"
          disabled={isLoading || uploading}
          className="btn w-full bg-orange-500 hover:bg-orange-600 text-white border-none"
        >
          {isLoading ? "Adding..." : "Add Recipe"}
        </button>
      </form>

      <Link
        to="/AllRecipe"
        className="btn mt-5 w-full bg-black hover:bg-orange-500 text-white border-none"
      >
        See All Recipes
      </Link>
    </div>
  );
};

export default AddRecipe;












