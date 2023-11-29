import { Button } from '@mui/material';
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom';
import validator from 'validator';

const TestCard = ({ test }) => {
    // console.log(test);
    const { availableDate, availableSlot, description, image, timeSlot, title, _id } = test;
    const navigate = useNavigate()
    const handleDetails = (id) => {
        navigate(`/test-details/${id}`)
    }
    return (
        <div>

            <article className="shadow-lg border rounded-md duration-300 hover:shadow-sm text-start min-h-[469px]">
                <div onClick={() => handleDetails(_id)} className='flex flex-col justify-between'>
                    <div>
                        <div className="">
                            <img src={validator.isURL(image) ? image : "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg"} loading="lazy" alt={title} className="w-full  lg:max-h-60 md:max-h-72 rounded-t-md" />

                        </div>
                        <div className="pt-3 ml-2 mr-2 mb-3 text-start space-y-3">
                            <h3 className="text-2xl text-gray-900">
                                {title}
                            </h3>
                            <p>Available Date: <span className='font-semibold'>{availableDate}</span></p>
                            <p>Available Time: <span className='font-semibold'>{timeSlot}</span></p>
                            <p className="text-gray-400 text-sm mt-1">{description.slice(0, 100)}...</p>
                        </div>
                    </div>
                    <div className="ml-2 mr-2 mb-3 text-start space-y-3">
                        <Button variant='contained' fullWidth sx={{ fontWeight: 'bold' }}>More Details</Button>
                    </div>
                </div>
            </article>

        </div>
    );
};
TestCard.propTypes = {
    test: PropTypes.object
}

export default TestCard;