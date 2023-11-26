import { Helmet } from "react-helmet-async";
import Hero from "../../Components/Hero/Hero";

const Home = () => {
    return (
        <div>            
            <Helmet>
                <title>DiagCentral | Home</title>
            </Helmet>
 
            <Hero />
            
            <div className="h-[100svh]"></div>           
        </div>
    );
};

export default Home;