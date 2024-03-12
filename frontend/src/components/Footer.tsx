const Footer = () => {
  return (
    // container with blue background and padding top & bottom
    <div className="bg-blue-800 py-10">
      {/* container with auto margins, flex layout, justified between, and centered items */}
      <div className="container mx-auto flex justify-between items-center">
        {/* website name with large white text, bold font, and tight tracking */}
        <span className="text-3xl text-white font-bold tracking-tight">
          Holidays.com
        </span>
        {/* links with white text, bold font, and tight tracking */}
        <span className="text-white tracking-tight font-bold flex gap-4">
          {/* privacy policy link */}
          <p className="cursor-pointer">Privacy Policy</p>
          {/* terms of service link */}
          <p className="cursor-pointer">Terms of Service</p>
        </span>
      </div>
    </div>
  );
};

export default Footer;
