const Hero = () => {
  return (
    // container with blue background and padding bottom
    <div className="bg-blue-800 pb-16">
      {/* container with auto margins, flex column layout, and gap between children */}
      <div className="container mx-auto flex flex-col gap-2">
        {/* large title with white color and bold font */}
        <h1 className="text-5xl text-white font-bold">Find your next stay</h1>
        {/* subtitle with white color */}
        <p className="text-2xl text-white">
          Search low prices on hotels for your dream vacation...
        </p>
      </div>
    </div>
  );
};

export default Hero;
