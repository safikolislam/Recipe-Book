
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router";
import Loading from "../../Components/Loading"; 
import noData from "../../assets/no-data found.avif"; 

const AllRecipes = () => {
  const navigate = useNavigate();

 
  const { data: recipes = [], isLoading, isError, error } = useQuery({
    queryKey: ["recipes"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/Recipe`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;
  if (isError) return <p className="text-red-500 text-center mt-8">Error: {error.message}</p>;

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-orange-500 mb-6 text-center">
        All Recipes
      </h1>

      {recipes.length === 0 ? (
        <div className="flex justify-center">
          <img src={noData} alt="No recipes found" className="w-1/2" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recipes.map((recipe) => (
            <div
              key={recipe._id}
              className="card bg-white dark:bg-gray-900 shadow-xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition duration-300"
            >
              <figure className="px-4 pt-4">
                <img
                  src={recipe.image || noData}
                  alt={recipe.name}
                  className="rounded-lg h-48 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-orange-500 dark:text-orange-400">
                  {recipe.name}
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  Cuisine: {recipe.cuisine || "Unknown"}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Prep Time: {recipe.prepTime || "N/A"}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Difficulty: {recipe.difficulty || "Medium"}
                </p>
                <div className="card-actions justify-end mt-2">
                  <button
                    onClick={() => navigate(`/recipe/${recipe._id}`)}
                    className="btn btn-outline btn-warning text-orange-500 border-orange-500 hover:bg-orange-500 hover:text-white"
                  >
                    See Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllRecipes;




