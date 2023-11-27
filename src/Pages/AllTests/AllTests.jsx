import axios from "axios";
import { useEffect, useState } from "react";
import TestCard from "../../Components/Cards/TestCard";
import { Container } from "@mui/system";

const AllTests = () => {
    const [tests, setTests] = useState();
    useEffect(() => {
        axios.get('http://localhost:4000/tests')
            .then(res => setTests(res.data))
    }, [])
    // console.log(tests);
    return (
        <Container maxWidth="xl">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 py-10">
                {
                    tests?.map(test => <TestCard key={test._id} test={test} />)
                }
            </div>
        </Container>
    );
};

export default AllTests;