import { Helmet } from "react-helmet-async";
import Hero from "../../Components/Hero/Hero";
import MyForm from "../../Components/SignUpForm/upload";

const Home = () => {
    return (
        <div>            
            <Helmet>
                <title>DiagCentral | Home</title>
            </Helmet>
 
            <Hero />
            <MyForm></MyForm>
            <div className="h-[100svh]"></div>           
        </div>
    );
};

export default Home;