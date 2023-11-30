import axios from "axios";
import { useEffect, useState } from "react";
import TestCard from "../Cards/TestCard";
import { Container } from "@mui/system";
import { Link } from "react-router-dom";

const Recommendation = () => {
    const [tests, setTests] = useState([]);
    useEffect(() => {
        axios.get('https://diag-central-server.vercel.app/tests')
            .then(res => setTests(res.data))
    }, [])

    return (
        <div className="py-10 pb-16">
            <Container maxWidth="xl">
                <div>
                    <h1 className="text-4xl font-bold">Recommended Tests</h1>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-10">
                    {
                        tests?.slice(0, 4).map(test => <TestCard key={test._id} test={test} />)
                    }
                </div>
                <Link to='/all-tests' className="grid justify-center items-center bg-primary hover:bg-opacity-95 transition-all text-white w-40 mx-auto px-5 py-2 shadow-lg border rounded-md duration-300 hover:shadow-sm ">See All Tests</Link>
            </Container>
        </div>
    );
};

export default Recommendation;