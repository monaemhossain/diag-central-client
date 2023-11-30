import { Link } from "react-router-dom";
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
    // console.log(banner);

    return (
        <div className="bg-secondary bg-opacity-50 mb-10">
            <div>
                <section className="items-center lg:flex">
                    <div className="flex-1 sm:text-center lg:text-left grid justify-center items-center">
                        <div className="space-y-4 lg:max-w-3xl p-6">
                            <h1 className="text- font-bold text-4xl xl:text-5xl" style={{lineHeight: '1.2em'}}>
                                {banner?.title}
                            </h1>
                            <p className="text-defaultText max-w-xl text-lg tracking-wider leading-relaxed sm:mx-auto lg:ml-0">
                                {banner?.description}
                            </p>
                            <div className="items-center justify-center space-y-3 sm:space-x-6 sm:space-y-0 sm:flex lg:justify-start">
                                <Link to="/all-tests" className="px-7 py-3 w-full bg-white text-gray-800 text-center rounded-md shadow-md block sm:w-auto font-bold">
                                    Explore Tests
                                </Link>

                            </div>

                            <div className="mt-4">
                                {banner?.couponCode ? <p className="text- text-lg tracking-widest font-semibold">Get discount using Code <span className="text-primary text-base">{banner?.couponCode}</span></p> : ''}
                            </div>
                        </div>
                    </div>
                    <div className="flex-1">
                        <img src={banner?.imageUrl} className="w-full mx-auto" />
                    </div>
                </section>

            </div>
        </div>
    )
}

export default Hero;