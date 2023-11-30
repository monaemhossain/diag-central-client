import { Container } from '@mui/system';

const FooterInfo = () => {

    const footerNavs = [
        {
            href: '#',
            name: 'About'
        },
        {
            href: '#',
            name: 'Blog'
        },
        {
            href: '#',
            name: ''
        },
        {
            href: '#',
            name: 'Team'
        },
        {
            href: '#',
            name: 'Careers'
        },

        {
            href: '#',
            name: 'Support'
        }
    ]
    return (
        <div>
            <Container maxWidth="xl">
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
            </Container>
        </div>
    );
};

export default FooterInfo;