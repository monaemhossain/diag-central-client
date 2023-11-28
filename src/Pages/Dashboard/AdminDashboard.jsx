import { useContext, useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types';
import PersonIcon from '@mui/icons-material/Person';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import BiotechIcon from '@mui/icons-material/Biotech';
import { AuthContext } from "../../Components/AuthProvider/AuthProvider";

const Menu = (props) => {
    const { children, items } = props
    const [isOpened, setIsOpened] = useState(false)
    return (
        <div className="">
            <button className="w-full flex items-center justify-between text-gray-600 p-2 rounded-lg  hover:bg-gray-50 active:bg-gray-100 duration-150"
                onClick={() => setIsOpened(!isOpened)}
            >
                <div className="flex items-center gap-x-2">
                    {children}
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`w-5 h-5 duration-150 ${isOpened ? 'rotate-180' : ''}`}>
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
            </button>
            {
                isOpened ? (
                    <ul className="mx-4 px-2 border-l text-sm font-medium">
                        {
                            items.map((item, idx) => (
                                <li key={idx}>
                                    <a href={item.href} className="flex items-center gap-x-2 text-gray-600 p-2 rounded-lg  hover:bg-gray-50 active:bg-gray-100 duration-150">
                                        {
                                            item.icon ? (
                                                <div className="text-gray-500">{item.icon}</div>
                                            ) : ""
                                        }
                                        {item.name}
                                    </a>
                                </li>
                            ))
                        }
                    </ul>
                ) : ""
            }
        </div>
    )
}

const AdminDashboard = () => {
    // firebase user
    const { user, dbUsers } = useContext(AuthContext)
    // if(!user){
        
    // }
    const { displayName, photoURL, email } = user;
    
    // db user
    
    const currentUser = dbUsers.filter(user => email == user.userEmail)
    const {role} = currentUser[0];
    // console.log(currentUser[0]);


    const navigation = [
        {
            href: '#',
            name: ' My profile',
            icon: <PersonIcon></PersonIcon>
            ,
        },
        {
            href: '#',
            name: ' Upcoming Appointments',
            icon: <CollectionsBookmarkIcon></CollectionsBookmarkIcon>
            ,
        },
        {
            href: '#',
            name: 'Test results',
            icon: <BiotechIcon></BiotechIcon>

            ,
        },

    ]

    const profileRef = useRef()
    const [isProfileActive, setIsProfileActive] = useState(false)


    useEffect(() => {
        const handleProfile = (e) => {
            if (profileRef.current && !profileRef.current.contains(e.target)) setIsProfileActive(false)
        }
        document.addEventListener('click', handleProfile)
    }, [])

    return (
        <>
            <div className="md:flex gap-6 w-full">
                <nav
                    className=" w-full min-h-full border-r bg-white space-y-8 md:w-80 pt-6 z-0 overflow-auto">
                    <div className="flex flex-col h-full px-4">
                        <div className='h-20 flex items-center pl-2'>
                            <div className="w-full flex items-center gap-x-4">
                                <img src={photoURL} className="w-10 h-10 rounded-full" />
                                <div>
                                    <span className="block text-gray-700 text-sm font-semibold">{displayName}</span>
                                    <span
                                        className="block mt-px text-gray-600 text-xs"
                                    >
                                        {role}
                                    </span>
                                </div>
                                <div className="relative flex-1 text-right">
                                    <button ref={profileRef} className="p-1.5 rounded-md text-gray-500 hover:bg-gray-50 active:bg-gray-100"
                                        onClick={() => setIsProfileActive(!isProfileActive)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                            <path fillRule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                    {
                                        isProfileActive ? (
                                            <div className="absolute z-10 top-12 right-0 w-64 rounded-lg bg-white shadow-md border text-sm text-gray-600">
                                                <div className="p-2 text-left">
                                                    <span className="block text-gray-500/80 p-2">alivika@gmail.com</span>
                                                    <a href="#" className="block w-full p-2 text-left rounded-md hover:bg-gray-50 active:bg-gray-100 duration-150">
                                                        Add another account
                                                    </a>
                                                    <div className="relative rounded-md hover:bg-gray-50 active:bg-gray-100 duration-150">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 absolute right-1 inset-y-0 my-auto pointer-events-none">
                                                            <path fillRule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clipRule="evenodd" />
                                                        </svg>
                                                        <select className="w-full cursor-pointer appearance-none bg-transparent p-2 outline-none">
                                                            <option disabled selected>Theme</option>
                                                            <option>Dark</option>
                                                            <option>Light</option>
                                                        </select>
                                                    </div>
                                                    <button className="block w-full p-2 text-left rounded-md hover:bg-gray-50 active:bg-gray-100 duration-150">
                                                        Logout
                                                    </button>
                                                </div>
                                            </div>
                                        ) : ""
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="overflow-auto">
                            <ul className="text-sm font-medium flex-1">
                                {
                                    navigation.map((item, idx) => (
                                        <li key={idx}>
                                            <a href={item.href} className="flex items-center gap-x-2 text-gray-600 p-2 rounded-lg  hover:bg-gray-50 active:bg-gray-100 duration-150">
                                                <div className="text-gray-500">{item.icon}</div>
                                                {item.name}
                                            </a>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div >
                    </div>
                </nav>
                <div className="flex-1 pt-6">

                </div>
            </div>
        </>
    );
};
Menu.propTypes = {
    children: PropTypes.any,
    items: PropTypes.any,
}

export default AdminDashboard;