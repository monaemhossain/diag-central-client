import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import PinterestIcon from '@mui/icons-material/Pinterest';
import LinkedinIcon from '@mui/icons-material/Linkedin';
import { Link } from 'react-router-dom';

const Footer = () => {



    return (
        <div className='relative z-10'>
            <footer className='bg-white'>
                

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