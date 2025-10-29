import image from '../assets/pexels-ella-olsson-572949-1640777.jpg';

const HeroArea = () => {
  return (
    <div className="relative mx-auto max-w-7xl h-[500px] my-5 overflow-hidden">
      <img className="w-full h-full object-cover" src={image} alt="Delicious food" />
      
 
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
      
    
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
        <h1 className="text-4xl font-bold mb-2 drop-shadow-lg">Welcome to Our Food Paradise</h1>
        <p className="text-lg drop-shadow-md">Delicious meals crafted with love and fresh ingredients</p>
      </div>
    </div>
  );
};

export default HeroArea;






