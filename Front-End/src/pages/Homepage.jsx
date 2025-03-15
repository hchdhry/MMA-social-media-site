import Footer from "../Components/Footer"
import Hero from "../Components/Hero"
import Header from "../Components/Header"

const HomePage = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <Hero />
            <Footer />
        </div>
    );
};

export default HomePage;