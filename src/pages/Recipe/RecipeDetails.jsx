import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../Components/Loading";

const RecipeDetails = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const userId = localStorage.getItem("userId");

  const { data: recipe, isLoading } = useQuery({
    queryKey: ["recipe", id],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/Recipe/${id}`);
      return res.data;
    },
  });

  const [likeCount, setLikeCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);


  useEffect(() => {
    if (recipe) setLikeCount(recipe.likes || 0);
    const likedRecipes = JSON.parse(localStorage.getItem("likedRecipes") || "[]");
    if (likedRecipes.includes(id)) setHasLiked(true);
  }, [recipe, id]);

  const likeMutation = useMutation({
    mutationFn: async () => {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/Recipe/${id}/like`,
        { userId }
      );
      return res.data.likes;
    },
    onSuccess: (newLikes) => {
      setLikeCount(newLikes);

     
      const likedRecipes = JSON.parse(localStorage.getItem("likedRecipes") || "[]");
      likedRecipes.push(id);
      localStorage.setItem("likedRecipes", JSON.stringify(likedRecipes));
      setHasLiked(true);

      queryClient.invalidateQueries(["recipe", id]);
    },
  });

  const handleLike = () => {
    if (!recipe) return;
    if (recipe.creatorId === userId) return alert("You cannot like your own recipe");
    if (hasLiked) return alert("You have already liked this recipe");
    likeMutation.mutate();
  };

  if (isLoading) return <Loading />;

  return (
    <div className="px-4 py-8 max-w-4xl mx-auto min-h-[60vh]">
      <h2 className="text-xl text-gray-700 mb-2">{likeCount} people interested in this recipe</h2>
      <h1 className="text-3xl font-bold text-orange-500 mb-4">{recipe.name}</h1>
      <img
        src={recipe.image || ""}
        alt={recipe.name}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      <p className="text-base mb-2">Cuisine: {recipe.cuisine || "Unknown"}</p>
      <p className="text-base mb-2">Prep Time: {recipe.prepTime || "N/A"}</p>
      <p className="text-base mb-2">Difficulty: {recipe.difficulty || "Medium"}</p>

      <button
        onClick={handleLike}
        className={`btn btn-warning text-white hover:bg-orange-600 ${hasLiked ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={hasLiked}
      >
        {hasLiked ? "Liked" : "Like"}
      </button>
    </div>
  );
};

export default RecipeDetails;










