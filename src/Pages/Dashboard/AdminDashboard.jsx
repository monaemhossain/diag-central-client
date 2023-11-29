
import * as Tabs from "@radix-ui/react-tabs";
import { useState } from "react";
import AllUsers from '../../Components/AllUsers/AllUsers';
import ManageAllTests from "../../Components/ManageAllTests/ManageAllTests";
import AddTest from "../../Components/AddTest/AddTest";

const AdminDashboard = () => {
    const [selectedTab, setSelectedTab] = useState("All Users");


    return (
        <Tabs.Root
            className="mt-4 px-4 md:px-8 sm:flex gap-10"
            value={selectedTab}
            onValueChange={(val) => setSelectedTab(val)}
            orientation="vertical"
        >
            <div>
                <Tabs.List
                    className="hidden fixed border-l flex-col justify-start items-start gap-y-3 text-sm sm:flex pt-5"
                    aria-label="Manage your account"
                >

                    <Tabs.Trigger
                        className="group outline-none px-1.5 border-l-2 border-white text-gray-500 data-[state=active]:border-primary data-[state=active]:text-primary "
                        value={"All Users"}
                    >
                        <div className="py-1.5 px-3 rounded-lg duration-150 group-hover:text-primary group-hover:bg-gray-100 font-normal text-base">
                            All Users
                        </div>
                    </Tabs.Trigger>

                    <Tabs.Trigger
                        className="group outline-none px-1.5 border-l-2 border-white text-gray-500 data-[state=active]:border-primary data-[state=active]:text-primary"
                        value={"Add a test"}
                    >
                        <div className="py-1.5 px-3 rounded-lg duration-150 group-hover:text-primary group-hover:bg-gray-100 font-normal text-base">
                            Add a test
                        </div>
                    </Tabs.Trigger>

                    <Tabs.Trigger
                        className="group outline-none px-1.5 border-l-2 border-white text-gray-500 data-[state=active]:border-primary data-[state=active]:text-primary"
                        value={"All Tests"}
                    >
                        <div className="py-1.5 px-3 rounded-lg duration-150 group-hover:text-primary group-hover:bg-gray-100 font-normal text-base">
                            All Tests
                        </div>
                    </Tabs.Trigger>

                    <Tabs.Trigger
                        className="group outline-none px-1.5 border-l-2 border-white text-gray-500 data-[state=active]:border-primary data-[state=active]:text-primary"
                        value={"Reservations"}
                    >
                        <div className="py-1.5 px-3 rounded-lg duration-150 group-hover:text-primary group-hover:bg-gray-100 font-normal text-base">
                            Reservations
                        </div>
                    </Tabs.Trigger>

                    <Tabs.Trigger
                        className="group outline-none px-1.5 border-l-2 border-white text-gray-500 data-[state=active]:border-primary data-[state=active]:text-primary"
                        value={"Add banner"}
                    >
                        <div className="py-1.5 px-3 rounded-lg duration-150 group-hover:text-primary group-hover:bg-gray-100 font-normal text-base">
                            Add banner
                        </div>
                    </Tabs.Trigger>

                    <Tabs.Trigger
                        className="group outline-none px-1.5 border-l-2 border-white text-gray-500 data-[state=active]:border-primary data-[state=active]:text-primary"
                        value={"All banners"}
                    >
                        <div className="py-1.5 px-3 rounded-lg duration-150 group-hover:text-primary group-hover:bg-gray-100 font-normal text-base">
                            All banners
                        </div>
                    </Tabs.Trigger>


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
                        className="py-2 px-3 w-full bg-transparent appearance-none outline-none border rounded-lg shadow-sm focus:border-primary text-sm"
                        onChange={(e) => setSelectedTab(e.target.value)}
                    >

                        <option value="All Users">All Users</option>
                        <option value="Add a Test">Add a Test</option>
                        <option value="All Tests">All Tests</option>
                        <option value="Reservations">Reservations</option>
                        <option value="Add banner">Add banner</option>
                        <option value="All banners">All banners</option>
                    </select>
                </div>
            </div>
            <div className="flex-1">
                <Tabs.Content className="py-6" value="All Users">
                    <div className="w-full mx-auto">
                        <AllUsers />
                    </div>
                </Tabs.Content>

                <Tabs.Content className="py-6" value="Add a test">
                    <AddTest></AddTest>
                </Tabs.Content>

                <Tabs.Content className="py-6" value="All Tests">
                    <ManageAllTests />
                </Tabs.Content>

                <Tabs.Content className="py-6" value="Reservations">
                    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
                        This is <b>All Users4</b> Tab
                    </div>
                </Tabs.Content>

                <Tabs.Content className="py-6" value="Add banner">
                    <p className="text-xs leading-normal">
                        This is <b>All Users5</b> Tab
                    </p>
                </Tabs.Content>

                <Tabs.Content className="py-6" value="All banners">
                    <p className="text-xs leading-normal">
                        This is <b>All Users6</b> Tab
                    </p>
                </Tabs.Content>

            </div>
        </Tabs.Root>
    );
};

export default AdminDashboard