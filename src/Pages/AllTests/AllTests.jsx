import axios from "axios";
import { useEffect, useState } from "react";
import TestCard from "../../Components/Cards/TestCard";
import { Container } from "@mui/system";

const AllTests = () => {
    const [tests, setTests] = useState([]);
    useEffect(() => {
        axios.get('https://diag-central-server.vercel.app/tests')
            .then(res => setTests(res.data))
    }, [])


    const today = new Date().toISOString().split('T')[0];

    const handleClearDate = () => {
        document.getElementById('searchInput').value = ""
        axios.get('https://diag-central-server.vercel.app/tests')
            .then(res => setTests(res.data))
    };

// SEARCH TESTS
    const handleSearch = (e) => {
        e.preventDefault();
        const searchDate = e.target.searchInput.value
        try {
            axios.get(`https://diag-central-server.vercel.app/tests/${searchDate}`)
                .then(res => setTests(res.data))
                .catch(() => {
                    axios.get('https://diag-central-server.vercel.app/tests')
                        .then(res => setTests(res.data))
                    console.log(tests);
                })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container maxWidth="xl">
            <div className="max-w-sm text-center px-4 mx-auto mt-12">
                <h1 className="text-3xl font-medium text-center mb-4">Search Test by date</h1>
                <form
                    className="flex gap-1 text-center justify-center items-center"
                    onSubmit={(e) => handleSearch(e)}
                >
                    <div className="relative flex">

                        <input
                            id="searchInput"
                            type="date"
                            defaultValue={today}
                            placeholder="Search"
                            className="w-full py-2 pl-3 pr-14 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-primary"
                        />
                        <button type="submit" className="absolute rounded-md border-l mr-[1px] grid justify-center items-center top-0 bottom-0 w-10 h-8 my-auto right-0">

                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>
                    <button
                        onClick={handleClearDate}
                        className="px-4 py-2 text-gray-700 border rounded-lg duration-100 hover:border-indigo-600 active:shadow-lg">Clear Date</button>
                </form>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-10">
                {
                    tests?.map(test => <TestCard key={test._id} test={test} />)
                }
            </div>
        </Container>
    );
};

export default AllTests;