import axios from "axios";
import toast from "react-hot-toast";


const AddBanner = () => {

    const handleAddBanner = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const imageUrl = form.imageUrl.value;
        const title = form.title.value;
        const description = form.description.value;
        const couponCode = form.couponCode.value;
        const couponValue = form.couponValue.value;

        const bannerData = { name, imageUrl, title, description, couponCode, couponValue, isActive: false}
        // console.log(bannerData);
        axios.post('https://diag-central-server.vercel.app/banners', bannerData)
        .then(() => {
            toast.success('banner added successfully')
        })
        .catch(err => console.log(err))
    }


    return (
        <div>
            <main className="w-full flex flex-col items-center justify-center sm:px-4">
                <div className="w-full pb-6 space-y-6 sm:max-w-md">
                    <div className="text-center">
                        <div className="mt-5 space-y-2">
                            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Add a banner</h3>
                        </div>
                    </div>
                    <div className="bg-white shadow p-4 sm:p-6 sm:rounded-lg">
                        <form
                            onSubmit={(e) => handleAddBanner(e)}
                            className="space-y-5"

                        >
                            <div>
                                <label className="font-medium" htmlFor="name">
                                    Name
                                </label>
                                <input
                                    id="name"
                                    placeholder="banner name"
                                    type="text"
                                    required
                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="font-medium" htmlFor="imageUrl">
                                    Image url
                                </label>
                                <input
                                    id="imageUrl"
                                    placeholder="banner image url"
                                    type="text"
                                    required
                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="font-medium" htmlFor="title">
                                    Title
                                </label>
                                <input
                                    id="title"
                                    placeholder="banner title"
                                    type="text"
                                    required
                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                />
                            </div>

                            <div>
                                <label className="font-medium" htmlFor="description">
                                    Test description
                                </label>
                                <textarea placeholder="banner description" required id="description" className="w-full mt-2 h-36 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-primary shadow-sm rounded-lg"></textarea>
                            </div>

                            <div className="flex gap-2">
                                <div>
                                    <label className="font-medium" htmlFor="couponCode">
                                        Coupon code
                                    </label>
                                    <input
                                        id="couponCode"
                                        placeholder="coupon code"
                                        type="text"
                                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label className="font-medium" htmlFor="couponValue">
                                        Coupon value
                                    </label>
                                    <input
                                        id="couponValue"
                                        placeholder="coupon value"
                                        type="number"
                                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                    />
                                </div>
                            </div>
                            <button type="submit"
                                className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                            >
                                Add banner
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AddBanner;