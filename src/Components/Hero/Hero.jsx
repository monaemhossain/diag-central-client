import { Link } from "react-router-dom";
import Container from '@mui/material/Container';
import { useEffect, useState } from "react";
import axios from "axios";

const Hero = () => {
    const [dbBanner, setDbBanner] = useState([])

    useEffect(() => {
        axios.get('http://localhost:4000/banners')
            .then((res) => {
                setDbBanner(res.data)
            })
            .catch(err => console.log(err))
    }, [])
    // console.log(dbBanner);
    const activeBanner = dbBanner.filter(banner => banner.isActive === true)
    const banner = activeBanner[0]
    console.log(banner);

    return (
        <div className="relative z-50">
            <div>
                <Container maxWidth='xl'>
                    <section className="py-6 items-center lg:flex">
                        <div className="space-y-4 flex-1 sm:text-center lg:text-left">
                            <h1 className="text-white font-bold text-4xl xl:text-5xl">
                                {banner?.title}
                            </h1>
                            <p className="text-gray-90000 max-w-xl leading-relaxed sm:mx-auto lg:ml-0">
                                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum
                            </p>
                            <div className="pt-10 items-center justify-center space-y-3 sm:space-x-6 sm:space-y-0 sm:flex lg:justify-start">
                                <Link to="/all-tests" className="px-7 py-3 w-full bg-white text-gray-800 text-center rounded-md shadow-md block sm:w-auto">
                                    Explore Tests
                                </Link>

                            </div>
                        </div>
                    </section>
                </Container>

            </div>
            <div className="absolute top-0 left-0 z-0">
                <img src={banner?.imageUrl} className="w-full mx-auto sm:w-10/12  lg:w-full" />
            </div>
        </div>
    )
}

export default Hero;