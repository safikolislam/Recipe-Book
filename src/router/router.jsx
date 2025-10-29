import { createBrowserRouter } from "react-router";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import MyRecipe from "../pages/MyRecipe/MyRecipe";
import AddRecipe from "../pages/AddRecipe/AddRecipe";
import AllRecipes from "../pages/AllRecipes/AllRecipes";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import RecipeDetails from "../pages/Recipe/RecipeDetails";
import PrivateRoute from "../Components/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/MyRecipe",
        element: (
          <PrivateRoute>
            <MyRecipe />
          </PrivateRoute>
        ),
      },
      {
        path: "/AddRecipe",
        element: (
          <PrivateRoute>
            <AddRecipe />
          </PrivateRoute>
        ),
      },
      {
        path: "/AllRecipe",
        Component: AllRecipes, 
      },
      {
        path: "/Login",
        Component: Login,
      },
      {
        path: "/Register",
        Component: Register,
      },
      {
        path: "/Recipe/:id",
        element: (
          <PrivateRoute>
            <RecipeDetails />
          </PrivateRoute>
        ), 
      },
    ],
  },
]);
