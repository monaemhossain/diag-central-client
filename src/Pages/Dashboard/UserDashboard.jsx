import { useContext, useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types';
import PersonIcon from '@mui/icons-material/Person';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import BiotechIcon from '@mui/icons-material/Biotech';
import { AuthContext } from "../../Components/AuthProvider/AuthProvider";
import * as Tabs from "@radix-ui/react-tabs";
import '@radix-ui/themes/styles.css';

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

const UserDashboard = () => {
    // firebase user
    // const { user, dbUsers } = useContext(AuthContext)
    // const { displayName, photoURL, email } = user;
    // db user
    // const currentUser = dbUsers.filter(user => email == user.userEmail)
    // const { role } = currentUser[0];

    const [selectedTab, setSelectedTab] = useState("Overview");
    const tabItems = [
        "Upcoming Appointments",
        "Test Results",
        "My Profile",
    ];

    const members = [
        {
            avatar: "https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg",
            name: "John lorin",
            email: "john@example.com"
        }, {
            avatar: "https://randomuser.me/api/portraits/men/86.jpg",
            name: "Chris bondi",
            email: "chridbondi@example.com"
        }, {
            avatar: "https://images.unsplash.com/photo-1464863979621-258859e62245?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
            name: "yasmine",
            email: "yasmine@example.com"
        }, {
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=a72ca28288878f8404a795f39642a46f",
            name: "Joseph",
            email: "joseph@example.com"
        },
    ]

    return (
        <>
            <Tabs.Root
                className="px-4 pt-7 md:px-8 sm:flex"
                value={selectedTab}
                onValueChange={(val) => setSelectedTab(val)}
                orientation="vertical"
            >
                <Tabs.List
                    className="hidden flex-col justify-start items-start gap-y-3 text-sm sm:flex mr-10"
                    aria-label="Manage your account"
                >
                    {tabItems.map((item, idx) => (
                        <Tabs.Trigger
                            key={idx}
                            className="group outline-none px-1.5 border-l-2 border-white text-gray-500 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600"
                            value={item}
                        >
                            <div className="py-1.5 px-3 rounded-lg duration-150 group-hover:text-indigo-600 group-hover:bg-gray-100 font-medium">
                                {item}
                            </div>
                        </Tabs.Trigger>
                    ))}
                </Tabs.List>
                <div className="relative text-gray-500 sm:hidden">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="pointer-events-none w-5 h-5 absolute right-2 inset-y-0 my-auto"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <select
                        value={selectedTab}
                        className="py-2 px-3 w-full bg-transparent appearance-none outline-none border rounded-lg shadow-sm focus:border-indigo-600 text-sm"
                        onChange={(e) => setSelectedTab(e.target.value)}
                    >
                        {tabItems.map((item, idx) => (
                            <option key={idx} >
                                {item}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="max-w-2xl mx-auto">
                    <Tabs.Content className="py-6" value="Upcoming Appointments">
                        <div>
                            <div className="max-w-2xl mx-auto px-4">
                                <div className="items-start justify-between sm:flex">
                                    <div>
                                        <h4 className="text-gray-800 text-xl font-semibold">Team members</h4>
                                        <p className="mt-2 text-gray-600 text-base sm:text-sm">Give your team members access to manage the system.</p>
                                    </div>
                                    <a href="javascript:void(0)" className="inline-flex items-center justify-center gap-1 py-2 px-3 mt-2 font-medium text-sm text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg sm:mt-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                                        </svg>
                                        New member
                                    </a>
                                </div>
                                <ul className="mt-12 divide-y">
                                    {
                                        members.map((item, idx) => (
                                            <li key={idx} className="py-5 flex items-start justify-between">
                                                <div className="flex gap-3">
                                                    <img src={item.avatar} className="flex-none w-12 h-12 rounded-full" />
                                                    <div>
                                                        <span className="block text-sm text-gray-700 font-semibold">{item.name}</span>
                                                        <span className="block text-sm text-gray-600">{item.email}</span>
                                                    </div>
                                                </div>
                                                <a href="javascript:void(0)" className="text-gray-700 text-sm border rounded-lg px-3 py-2 duration-150 bg-white hover:bg-gray-100">Manage</a>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    </Tabs.Content>
                    <Tabs.Content className="py-6" value='Test Results'>
                        <p className="text-xs leading-normal">
                            This is <b>hijibiji</b> Tab
                        </p>
                    </Tabs.Content>
                    <Tabs.Content className="py-6" value='My Profile'>
                        <p className="text-xs leading-normal">
                            This is <b>proofile</b> Tab
                        </p>
                    </Tabs.Content>
                </div>

            </Tabs.Root>
        </>
    );
};
Menu.propTypes = {
    children: PropTypes.any,
    items: PropTypes.any,
}

export default UserDashboard;