import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Clock, UtensilsCrossed, Tag, Flame, Heart } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_URL;

async function fetchLatestRecipes() {
  const { data } = await axios.get(`${API_BASE}/latest-recipes`);
  return data;
}

const LatestRecipes = () => {
  const {
    data: recipes = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["latestRecipes"],
    queryFn: fetchLatestRecipes,
    staleTime: 1000 * 60 * 5,
  });


  if (isLoading)
    return (
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-base-200 rounded-2xl shadow-md p-4 animate-pulse"
          >
            <div className="h-40 bg-base-300 rounded-lg mb-4" />
            <div className="h-6 bg-base-300 rounded w-3/4 mb-2" />
            <div className="h-4 bg-base-200 rounded w-1/2" />
          </div>
        ))}
      </div>
    );


  if (isError)
    return (
      <p className="text-center mt-10 text-error">
        Error: {error.message}
      </p>
    );


  return (
    <div className="max-w-6xl mx-auto p-4 mt-20">
      <h1 className="text-center text-3xl font-semibold mb-8 text-orange-500">
        Latest Recipes
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipes.map((recipe) => (
          <div
            key={recipe._id}
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-300"
          >
          
            <figure className="h-48 overflow-hidden">
              <img
                src={
                  recipe.image ||
                  "https://via.placeholder.com/400x250?text=No+Image"
                }
                alt={recipe.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </figure>

            {/* 📄 Content */}
            <div className="card-body">
              <h2 className="card-title">{recipe.title}</h2>

              <p className="text-sm opacity-80 line-clamp-4">
                {recipe.instructions || "No instructions available."}
              </p>

            
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-primary" />
                  <span>
                    Prep Time:{" "}
                    <span className="font-medium">
                      {recipe.prepTime || "N/A"} mins
                    </span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Flame size={16} className="text-error" />
                  <span>
                    Cuisine:{" "}
                    <span className="font-medium">
                      {recipe.cuisine || "Unknown"}
                    </span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <UtensilsCrossed size={16} className="text-success" />
                  <span>
                    Categories:{" "}
                    <span className="font-medium">
                      {recipe.categories || "N/A"}
                    </span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Tag size={16} className="text-secondary" />
                  <span>
                    Ingredients:{" "}
                    <span className="font-medium">
                      {Array.isArray(recipe.ingredients)
                        ? recipe.ingredients.join(", ")
                        : recipe.ingredients || "N/A"}
                    </span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Heart size={16} className="text-error" />
                  <span>
                    Likes:{" "}
                    <span className="font-medium">{recipe.likes || 0}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestRecipes;








