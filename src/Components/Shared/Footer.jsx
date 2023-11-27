import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import PinterestIcon from '@mui/icons-material/Pinterest';
import LinkedinIcon from '@mui/icons-material/Linkedin';
import { Link } from 'react-router-dom';

const Footer = () => {

    // const footerNavs = [
    //     {
    //         href: '#',
    //         name: 'About'
    //     },
    //     {
    //         href: '#',
    //         name: 'Blog'
    //     },
    //     {
    //         href: '#',
    //         name: ''
    //     },
    //     {
    //         href: '#',
    //         name: 'Team'
    //     },
    //     {
    //         href: '#',
    //         name: 'Careers'
    //     },

    //     {
    //         href: '#',
    //         name: 'Support'
    //     }
    // ]

    return (
        <div className='relative z-10'>
            <footer className='bg-white'>
                {/* <Container maxWidth="xl">
                    <div>
                        <div className="max-w-3xl sm:mx-auto sm:text-center">
                            <img src="logo.png" className="w-48 sm:mx-auto" />
                            <p className="leading-relaxed mt-2 text-[15px]">
                                Discover a healthier tomorrow with DiagCentral. Our commitment to your well-being is unwavering. As a leading provider of diagnostic services, we strive to empower you with accurate insights into your health. From routine check-ups to specialized testing, DiagCentral is your trusted partner on the journey to optimal health.
                            </p>
                        </div>
                        <ul className="items-center justify-center my-8 space-y-5 sm:flex sm:space-x-4 sm:space-y-0">
                            {
                                footerNavs.map((item, idx) => (
                                    <li key={idx} className=" hover:text-gray-800">
                                        <a key={idx} href={item.href}>
                                            {item.name}
                                        </a>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </Container> */}

                <Paper className='py-4'>
                    <Container maxWidth='xl'>
                        <div className="items-center justify-between sm:flex">
                            <div>
                                &copy; 2023 DiagCentral All rights reserved.
                            </div>
                            <div className="mt-6 sm:mt-0">
                                <ul className="flex items-center space-x-4">
                                    <li className="w-10 h-10 border rounded-full flex items-center justify-center">
                                        <Link to='#'>
                                            <TwitterIcon />
                                        </Link>
                                    </li>

                                    <li className="w-10 h-10 border rounded-full flex items-center justify-center">
                                        <Link to='#'>
                                            <FacebookIcon />
                                        </Link>
                                    </li>

                                    <li className="w-10 h-10 border rounded-full flex items-center justify-center">
                                        <Link to='#'>
                                            <PinterestIcon />
                                        </Link>
                                    </li>

                                    <li className="w-10 h-10 border rounded-full flex items-center justify-center">
                                        <Link to='#'>
                                            <LinkedinIcon />
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </Container>
                </Paper>
            </footer>
        </div>
    )
}
export default Footer;