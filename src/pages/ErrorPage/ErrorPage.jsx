import Error from "../../assets/ERRORImage.avif";

const ErrorPage = () => {
  return (
    <>
      <title>404 | Page Not Found</title>
      <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-50 text-orange-700 p-6 text-center">
        <div className="mb-4">
          <img
            className="w-64 max-w-full mx-auto drop-shadow-lg"
            src={Error}
            alt="Pizza Not Found"
          />
        </div>
        <h1 className="text-7xl font-extrabold mb-2">404</h1>
        <p className="text-2xl font-medium mb-4">
          Oops! This page was devoured like the last slice of pizza 
        </p>
        <p className="text-md text-gray-600 mb-6">
          The page you're looking for might have been moved never existed.
        </p>
   
      </div>
    </>
  );
};

export default ErrorPage;
