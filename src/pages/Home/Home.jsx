import HeroArea from "../../Components/HeroArea";
import { Typewriter } from "react-simple-typewriter";
import chickenCurry from "../../assets/spicychikencurry.jpg";
import vaganPasta from "../../assets/vagan pasta.jpg";
import LatestRecipes from "../../Components/Latest recipe";

const Home = () => {
  return (
    <>
      <title>Home | Recipe Book</title>

    
      <section className="text-center mt-5">
        <HeroArea />
      </section>

   
      <section className=" text-center text-2xl font-bold mt-20 text-orange-500">
        <p>Explore:</p>
        <div className="mt-2">
          <Typewriter
            words={["Food", "Recipes", "Delicious Items", "Drinks"]}
            loop={5}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </div>
      </section>

    <LatestRecipes></LatestRecipes>
      <section className="py-10 px-5 bg-base-100 text-base-content transition-colors duration-300">
        <h2 className="text-center text-3xl font-semibold my-20 text-orange-500">
          Featured Recipes
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="card w-64 bg-base-200 shadow-lg hover:shadow-xl transition">
            <figure>
              <img src={chickenCurry} alt="Spicy Chicken Curry" />
            </figure>
            <div className="card-body">
              <h3 className="card-title text-base-content">Spicy Chicken Curry</h3>
              <p className="text-sm opacity-80">
                A flavorful, aromatic dish with rich spices and tender chicken.
              </p>
            </div>
          </div>

          <div className="card w-64 bg-base-200 shadow-lg hover:shadow-xl transition">
            <figure>
              <img src={vaganPasta} alt="Vegan Pasta" />
            </figure>
            <div className="card-body">
              <h3 className="card-title text-base-content">Vegan Pasta</h3>
              <p className="text-sm opacity-80">
                A healthy and creamy pasta loaded with plant-based goodness.
              </p>
            </div>
          </div>
        </div>
      </section>

      
      <section className="py-12 px-5 border-t border-gray-300 dark:border-gray-700 mt-20">
        <h2 className="text-center text-3xl font-semibold mb-8 text-orange-500">
          What People Are Saying
        </h2>
        <div className="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto">
          {[
            {
              text: `"The Spicy Chicken Curry was absolutely amazing! So flavorful and easy to follow."`,
              author: "Sarah M.",
            },
            {
              text: `"Loved the vegan pasta recipe! Perfect for a quick, healthy dinner."`,
              author: "David R.",
            },
            {
              text: `"Great selection of recipes. The instructions are clear and the results are delicious!"`,
              author: "Amanda C.",
            },
          ].map(({ text, author }, i) => (
            <div
              key={i}
              className="card w-72 bg-base-200 shadow-md p-6 hover:shadow-lg transition"
            >
              <p className="italic opacity-80">{text}</p>
              <p className="mt-4 font-semibold text-base-content"> {author}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;


