import { Button } from '@mui/material';
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom';

const TestCard = ({ test }) => {
    // console.log(test);
    const { availableDates, description, image, timeSlots, title, _id } = test;
    const navigate = useNavigate()
    const handleDetails = (id) => {
        navigate(`/test-details/${id}`)
    }
    return (
        <div>

            <article className="shadow-lg border rounded-md duration-300 hover:shadow-sm text-start">
                <button onClick={() => handleDetails(_id)}>
                    <div className="">
                        <img src={image} loading="lazy" alt={title} className="w-full h-60 rounded-t-md" />

                    </div>
                    <div className="pt-3 ml-4 mr-2 mb-3 text-start space-y-3">
                        <h3 className="text-2xl text-gray-900">
                            {title}
                        </h3>
                        <p className="text-gray-400 text-sm mt-1">{description.slice(0, 100)}...</p>
                        <Button variant='contained' fullWidth sx={{fontWeight: 'bold'}}>More Details</Button>
                    </div>
                </button>
            </article>

        </div>
    );
};
TestCard.propTypes = {
    test: PropTypes.object
}

export default TestCard;