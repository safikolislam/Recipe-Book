import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../Components/Loading";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import noData from "../../assets/no-data found.avif";

Modal.setAppElement("#root");

const MyRecipe = ({ userEmail }) => {
  const queryClient = useQueryClient();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  const { data: recipes = [], isLoading, isError, error } = useQuery({
    queryKey: ["myRecipes", userEmail],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/Recipe`);
      return res.data.filter((recipe) => recipe.userEmail === userEmail);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => axios.delete(`${import.meta.env.VITE_API_URL}/Recipe/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["myRecipes", userEmail] }),
  });

  const updateMutation = useMutation({
    mutationFn: (updatedRecipe) =>
      axios.put(`${import.meta.env.VITE_API_URL}/Recipe/${updatedRecipe._id}`, updatedRecipe),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myRecipes", userEmail] });
      setModalIsOpen(false);
    },
  });

  const handleDelete = (id) => deleteMutation.mutate(id);

  const handleUpdate = (recipe) => {
    setSelectedRecipe(recipe);
    reset(recipe);
    setModalIsOpen(true);
  };

  const onSubmit = (data) => updateMutation.mutate({ ...selectedRecipe, ...data });

  if (isLoading) return <Loading />;

  if (isError)
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center space-y-3">
        <p className="text-2xl font-semibold text-error">Failed to load your recipes</p>
        <p className="text-base text-base-content/70">{error?.message || "Unknown error"}</p>
      </div>
    );

  if (recipes.length === 0)
    return (
      <div className="flex flex-col items-center justify-center mt-16 min-h-[100vh]">
        <img className="w-60 md:w-80 rounded-lg shadow-lg" src={noData} alt="No Recipes Found" />
        <p className="mt-5 text-2xl font-semibold text-base-content">No Recipes Found</p>
        <p className="text-sm text-base-content/70 mt-2">Try adding a new recipe to get started!</p>
      </div>
    );

  return (
    <div className="p-5 min-h-screen relative">
      <div className={`transition-all duration-300 ${modalIsOpen ? "filter blur-sm pointer-events-none" : ""}`}>
        <h1 className="text-3xl font-bold text-primary mb-5 text-center">My Recipes</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <div key={recipe._id} className="card bg-base-100 shadow-md border border-base-300">
              <figure>
                <img src={recipe.image || noData} alt={recipe.title} className="w-full h-48 object-cover" />
              </figure>
              <div className="card-body text-base-content">
                <h2 className="card-title text-primary">{recipe.title}</h2>
                <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
                <p><strong>Instructions:</strong> {recipe.instructions}</p>
                <p><strong>Cuisine:</strong> {recipe.cuisine}</p>
                <p><strong>Preparation Time:</strong> {recipe.prepTime}</p>
                <p><strong>Category:</strong> {recipe.category}</p>
                <p><strong>Likes:</strong> {recipe.likes || 0}</p>
                <div className="card-actions justify-end mt-2">
                  <button onClick={() => handleUpdate(recipe)} className="btn btn-sm btn-outline btn-primary">
                    Update
                  </button>
                  <button onClick={() => handleDelete(recipe._id)} className="btn btn-sm btn-outline btn-error">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Update Recipe"
        className="bg-base-100 p-5 w-[400px] mx-auto rounded-lg shadow-lg outline-none z-50 relative transition-transform duration-300"
        overlayClassName="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-40"
      >
        <h2 className="text-2xl text-primary mb-4">Update Recipe</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <input {...register("title")} placeholder="Title" className="input input-bordered w-full" />
          <input {...register("image")} placeholder="Image URL" className="input input-bordered w-full" />
          <textarea {...register("ingredients")} placeholder="Ingredients" className="textarea textarea-bordered w-full" />
          <textarea {...register("instructions")} placeholder="Instructions" className="textarea textarea-bordered w-full" />
          <input {...register("cuisine")} placeholder="Cuisine Type" className="input input-bordered w-full" />
          <input {...register("prepTime")} placeholder="Preparation Time" className="input input-bordered w-full" />
          <input {...register("category")} placeholder="Category" className="input input-bordered w-full" />
          <input type="number" {...register("likes")} placeholder="Like Count" className="input input-bordered w-full" />
          <div className="flex justify-end gap-2 mt-2">
            <button type="button" onClick={() => setModalIsOpen(false)} className="btn btn-outline">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">Update</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default MyRecipe;



















