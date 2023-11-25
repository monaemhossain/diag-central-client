import Hero from "../../Components/Hero/Hero";
import AppMenu from "../../Components/Shared/AppMenu";

const Home = () => {
    return (
        <div>
            <AppMenu /> 
            <Hero />
            <div className="h-[2000px]"></div>           
        </div>
    );
};

export default Home;