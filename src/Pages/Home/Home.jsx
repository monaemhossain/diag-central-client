import { Helmet } from "react-helmet-async";
import Hero from "../../Components/Hero/Hero";
import Recommendation from "../../Components/Recommendation/Recommendation";
import BlogPage from "../BlogPage/BlogPage";
import ContactPage from "../ContactPage/ContactPage";
import AboutPage from "../AboutPage/AboutPage";
import FooterInfo from "../../Components/FooterInfo/FooterInfo";

const Home = () => {
    return (
        <div>            
            <Helmet>
                <title>DiagCentral | Home</title>
            </Helmet>
 
            <Hero />
            <Recommendation />
            <BlogPage />
            <AboutPage />
            <ContactPage />
            <FooterInfo />
        </div>
    );
};

export default Home;