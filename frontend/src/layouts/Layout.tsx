import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";

// define Props interface
interface Props {
    // children prop should be React Node
    children: React.ReactNode;
}

// define Layout component
const Layout = ({ children }: Props) => {
    return (
        /**
         * container div with flex column layout and minimum height of the screen
         * min-h-screen => it going to make sure app takes whole screen so this helps keep the header at top and footer at bottom
         * */
        <div className="flex flex-col min-h-screen">
            <Header />
            <Hero />
            <div className="container mx-auto">
                <SearchBar />
            </div>
            {/* main content container with padding, flex-1 ensures it takes remaining space */}
            <div className="container mx-auto py-10 flex-1">{children}</div>
            <Footer />
        </div>
    );
};

export default Layout;
