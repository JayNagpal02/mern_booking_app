import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
    const { isLoggedIn } = useAppContext();
    return (
        // container with blue background and padding on top & bottom, in tailwind higher the value of color darker the color is
        <div className="bg-blue-800 py-6">
            {/* container with auto margins, flex layout, justified between */}
            <div className="container mx-auto flex justify-between">
                {/* website name with large white text, bold font, and tight tracking => changes the spacing between letters */}
                <span className="text-3xl text-white font-bold tracking-tight">
                    {/* link to home page */}
                    <Link to="/">Holidays.com</Link>
                </span>
                {/* container for navigation links */}
                <span className="flex space-x-2">
                    {isLoggedIn ? (
                        // if user is logged in
                        <>
                            <Link
                                to="/my-bookings"
                                className="flex text-white items-center px-3 font-bold hover:bg-blue-600"
                            >
                                My Bookings
                            </Link>
                            <Link
                                to="/my-hotels"
                                className="flex text-white items-center px-3 font-bold hover:bg-blue-600"
                            >
                                My Hotels
                            </Link>
                            <SignOutButton />
                        </>
                    ) : (
                        // if user is not logged in
                        <Link
                            to="/sign-in"
                            className="flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-gray-200"
                        >
                            Sign In
                        </Link>
                    )}
                </span>
            </div>
        </div>
    );
};

export default Header;
