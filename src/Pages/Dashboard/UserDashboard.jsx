import { useState } from "react";
import PropTypes from 'prop-types';
import * as Tabs from "@radix-ui/react-tabs";
import '@radix-ui/themes/styles.css';
import UserAppointments from "../../Components/UserAppointments/UserAppointments";
import Profile from "../../Components/Profile/Profile";

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

    // const [selectedTab, setSelectedTab] = useState("Upcoming Appointments");
    const tabItems = [
        "Upcoming Appointments",
        "Test Results",
        "My Profile",
    ];



    return (
        <>
            <Tabs.Root
                className="px-4 pt-7 md:px-8 sm:flex"
                defaultValue='Upcoming Appointments'
                orientation="vertical"
            >
                <Tabs.List
                    className=" flex-col justify-start items-start gap-y-3 text-sm sm:flex mr-10"
                    aria-label="Manage your account"
                >
                    {tabItems.map((item, idx) => (
                        <Tabs.Trigger
                            key={idx}
                            className="group outline-none px-1.5 border-l-2 border-white text-gray-500 data-[state=active]:border-secondary data-[state=active]:text-primary"
                            value={item}
                        >
                            <div className="py-1.5 px-3 rounded-lg duration-150 group-hover:text-primary group-hover:bg-gray-100 font-medium">
                                {item}
                            </div>
                        </Tabs.Trigger>
                    ))}
                </Tabs.List>

                <div className="max-w-5xl mx-auto">
                    <Tabs.Content className="py-6" value="Upcoming Appointments">
                        <div className="lg:w-[768px] sm:w-[540px]">
                            <div className="w-full px-4">
                                <div className="items-start justify-between sm:flex">
                                    <div>
                                        <h4 className="text-gray-800 text-xl font-semibold">Your Upcoming Appointments</h4>

                                    </div>
                                </div>
                                <UserAppointments />
                            </div>
                        </div>
                    </Tabs.Content>

                    <Tabs.Content className="py-6" value='Test Results'>
                        <p className="text-xs leading-normal">
                            This is <b>some text</b> Tab
                        </p>
                    </Tabs.Content>
                    <Tabs.Content className="py-6" value='My Profile'>
                        <Profile />
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