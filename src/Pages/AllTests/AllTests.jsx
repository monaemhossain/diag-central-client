import axios from "axios";
import { useEffect, useState } from "react";
import TestCard from "../../Components/Cards/TestCard";
import { Container } from "@mui/system";

const AllTests = () => {
    const [tests, setTests] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:4000/tests')
            .then(res => setTests(res.data))
    }, [])
    // console.log(tests);
    // search tests
    const handleSearch = (e) => {
        e.preventDefault();
        const searchInput = e.target.searchInput.value
        try {
            axios.get(`http://localhost:4000/tests/${searchInput}`)
                .then(res => setTests(res.data))
                .catch(() => {
                    axios.get('http://localhost:4000/tests')
                        .then(res => setTests(res.data))
                        console.log(tests);
                })
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Container maxWidth="xl">
            <div className="max-w-md px-4 mx-auto mt-12">
                <h1 className="text-3xl font-medium text-center mb-4">Search Test</h1>
                <form
                    onSubmit={(e) => handleSearch(e)}
                >
                    <div className="relative flex">

                        <input
                            id="searchInput"
                            type="text"
                            placeholder="Search"
                            className="w-full py-3 pl-3 pr-14 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-primary"
                        />
                        <button type="submit" className="absolute rounded-md border-l mr-[1px] p-2 grid justify-center items-center top-0 bottom-0 w-16 h-12 my-auto right-0">
                           
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 py-10">
                {
                    tests?.map(test => <TestCard key={test._id} test={test} />)
                }
            </div>
        </Container>
    );
};

export default AllTests;