import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useEffect, useState } from "react";
import validator from 'validator';

const ManageAllTests = () => {
    const [tests, setTests] = useState();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:4000/tests')
            .then(res => setTests(res.data))
    }, [])
    // console.log(tests);
    const handleDeleteTest = (e, id) => {
        e.preventDefault();
        console.log(id);
        axios.delete(`http://localhost:4000/test/${id}`)
            .then(() => {
                axios.get('http://localhost:4000/tests')
                    .then(res => setTests(res.data))
                    .catch((err) => console.log(err))

            });
        setIsDialogOpen(false);
    }

    return (
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
            <div className="items-start justify-between md:flex">
                <div className="max-w-lg">
                    <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                        All tests
                    </h3>
                </div>
            </div>
            <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
                <table className="w-full table-auto text-sm text-left">
                    <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                        <tr>
                            <th className="py-3 px-6"></th>
                            <th className="py-3 px-6">Test Name</th>
                            <th className="py-3 px-6">Available Date</th>
                            <th className="py-3 px-6">Available Time </th>
                            <th className="py-3 px-6">Available Slot </th>
                            <th className="py-3 px-6"></th>

                        </tr>
                    </thead>
                    <tbody className="text-gray-600 divide-y">
                        {
                            tests?.map((item, idx) => (
                                <tr key={idx}>
                                    <td className="text-center">{idx + 1}.</td>
                                    <td className="flex items-center gap-x-3 py-3 whitespace-nowrap">
                                        <img src={validator.isURL(item.image) ? item.image : 'https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg'} className="w-10 h-10 rounded-full" />
                                        <div>
                                            <span className="block text-gray-700 text-sm font-medium">{item.title}</span>
                                            <span className="block text-gray-700 text-xs">{item?.description?.slice(0, 30)}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap space-x-3">{item.availableDate}</td>
                                    <td className="px-6 py-4 whitespace-nowrap space-x-3">{item.timeSlot}</td>
                                    <td className="px-6 py-4 whitespace-nowrap space-x-3 text-center">{item.availableSlot}</td>
                                    <td className="text-right px-6 whitespace-nowrap">
                                        <button className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg">
                                            Edit
                                        </button>


                                        <AlertDialog.Root open={isDialogOpen} onClose={() => setIsDialogOpen(false)} >
                                            <AlertDialog.Trigger>

                                                <button onClick={() => setIsDialogOpen(true)} className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg">
                                                    Delete
                                                </button>
                                            </AlertDialog.Trigger>
                                            <AlertDialog.Content style={{ maxWidth: 450 }}>
                                                <AlertDialog.Title>Delete Test</AlertDialog.Title>
                                                <AlertDialog.Description size="2">
                                                    Are you sure? This Test will be deleted permanently and cannot be recovered!!
                                                </AlertDialog.Description>

                                                <Flex gap="3" mt="4" justify="end">
                                                    <AlertDialog.Cancel>
                                                        <Button variant="soft" color="gray" onClick={() => setIsDialogOpen(false)}>
                                                            Cancel
                                                        </Button>
                                                    </AlertDialog.Cancel>
                                                    <AlertDialog.Action>
                                                        <Button variant="solid" color="red" onClick={(e) => handleDeleteTest(e, item._id)}>
                                                            Yes! Delete it
                                                        </Button>
                                                    </AlertDialog.Action>
                                                </Flex>
                                            </AlertDialog.Content>
                                        </AlertDialog.Root>



                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default ManageAllTests;