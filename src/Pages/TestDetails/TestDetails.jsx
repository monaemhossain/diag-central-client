import { Button } from '@mui/material';
import { Container } from '@mui/system';
import PropTypes from 'prop-types'
import { useLoaderData } from 'react-router-dom';

const TestDetails = () => {
    // console.log(test);
    const testDetails = useLoaderData()
    const { availableDate, description, image, timeSlot, title, availableSlot, price } = testDetails;
    return (
        <Container maxWidth="lg">
            <div className='py-8'>

                <div className="shadow-lg border rounded-md duration-300 hover:shadow-sm p-4">
                    <div className='md:grid grid-cols-2 gap-3'>
                        <div className="flex items-center m-2">
                            <img src={image} loading="lazy" alt={title} className="w-full max-h-96 rounded-t-md" />

                        </div>
                        <div className="py-2 h-full flex flex-col justify-between">
                            <div>
                                <h3 className="text-3xl text-defaultText">
                                    Test Name: {title}
                                </h3>
                                <div className='w-full justify-around py-3 space-y-2'>
                                    <p className=''>Available Date: {availableDate}</p>
                                    <p>Available Time: {timeSlot}</p>
                                    <p>Slot Left: {availableSlot}</p>
                                </div>
                                <p className="text-gray-400 text-sm mt-1">Test description: {description}</p>
                            </div>
                            <div className='w-full grid grid-cols-2 '>
                                <h1 className='flex justify-center items-center font-bold'>Test Price: <span className='text-red-900'> {price} $</span></h1>
                                <Button variant='contained' >Get an Appointment</Button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </Container>
    );
};
TestDetails.propTypes = {
    test: PropTypes.object
}

export default TestDetails;