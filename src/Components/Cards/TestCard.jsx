import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom';

const TestCard = ({ test }) => {
    // console.log(test);
    const { availableDates, description, image, timeSlots, title, _id } = test;
    const navigate = useNavigate()
    const hangleDetails = (id) =>{
        navigate(`/test-details/${id}`)
    }
    return (
        <div>

            <article className="shadow-lg border rounded-md duration-300 hover:shadow-sm">
                <button onClick={()=>hangleDetails(_id)}>
                    <img src={image} loading="lazy" alt={title} className="w-full h-48 rounded-t-md" />
                    <div className="flex items-center mt-2 pt-3 ml-4 mr-2">

                    </div>
                    <div className="pt-3 ml-4 mr-2 mb-3">
                        <h3 className="text-xl text-gray-900">
                            {title}
                        </h3>
                        <p className="text-gray-400 text-sm mt-1">{description.slice(0, 100)}...</p>
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