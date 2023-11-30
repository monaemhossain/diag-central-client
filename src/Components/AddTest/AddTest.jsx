import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import validator from 'validator';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddTest = () => {
    
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());

    const handleAddTest = async (e) => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const availableDate = form.availableDate.value;
        const timeSlotFrom = startTime;
        const timeSlotTo = endTime;
        const timeSlot = `${formatTime(timeSlotFrom)} - ${formatTime(timeSlotTo)}`;
        const image = form.image.value;

        if (validator.isURL(image) === false) {
            toast.error('Image link is invalid');
            return;
        }

        const description = form.description.value;
        const availableSlot = parseInt(form.availableSlot.value);
        const price = form.price.value;

        const testData = { title, availableDate, timeSlot, image, description, availableSlot, price };

        try {
            const response = await axios.post('https://diag-central-server.vercel.app/tests', testData);
            console.log(response.data);
            toast.success("Test Added");
        } catch (error) {
            toast.error("Something went wrong, unable to add test");
            console.log(error);
        }
    };

    const formatTime = (time) => {
        return new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).format(time);
    };

    return (
        <main className="w-full min-h-screen flex flex-col items-center">
            <div className="w-full space-y-1 text-gray-600 sm:max-w-md">
                <div className="text-center">
                    <div className="mt-5 space-y-2">
                        <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Add a test</h3>
                    </div>
                </div>
                <div className="bg-white shadow p-4 py-6 sm:p-6 sm:rounded-lg">
                    <form onSubmit={handleAddTest} className="space-y-5">
                        <div>
                            <label className="font-medium" htmlFor="title">
                                Test name
                            </label>
                            <input
                                id="title"
                                type="text"
                                required
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-primary shadow-sm rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="font-medium" htmlFor="availableDate">
                                Available date
                            </label>
                            <br />
                            <input
                                id="availableDate"
                                type="date"
                                required
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-primary shadow-sm rounded-lg"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <label className="font-medium" htmlFor="timeSlotFrom">
                                    Available Time From
                                </label>
                                <DatePicker
                                    selected={startTime}
                                    onChange={(date) => setStartTime(date)}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeCaption="Time"
                                    dateFormat="h:mm aa"
                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-primary shadow-sm rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="font-medium" htmlFor="timeSlotTo">
                                    Available Time To
                                </label>
                                <DatePicker
                                    selected={endTime}
                                    onChange={(date) => setEndTime(date)}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeCaption="Time"
                                    dateFormat="h:mm aa"
                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-primary shadow-sm rounded-lg"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="font-medium" htmlFor="image">
                                Test thumbnail image url
                            </label>
                            <input
                                id="image"
                                type="text"
                                required
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-primary shadow-sm rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="font-medium" htmlFor="description">
                                Test description
                            </label>
                            <textarea required id="description" className="w-full mt-2 h-36 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-primary shadow-sm rounded-lg"></textarea>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <label className="font-medium" htmlFor="availableSlot">
                                    Available slot
                                </label>
                                <input
                                    id="availableSlot"
                                    type="number"
                                    required
                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-primary shadow-sm rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="font-medium" htmlFor="price">
                                    Price
                                </label>
                                <input
                                    id="price"
                                    type="number"
                                    required
                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-primary shadow-sm rounded-lg"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-white font-medium bg-primary hover:bg-secondary active:bg-primary rounded-lg duration-150"
                        >
                            Add test
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default AddTest;
