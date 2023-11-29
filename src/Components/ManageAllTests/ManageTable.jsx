

onst ManageTable = ({}) => {
    return (
        <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
            <table className="w-full table-auto text-sm text-left">
                <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                    <tr>
                        <th className="py-3 px-6">Username</th>
                        <th className="py-3 px-6">Email</th>
                        <th className="py-3 px-6">Position</th>
                        <th className="py-3 px-6">Salary</th>
                        <th className="py-3 px-6"></th>

                    </tr>
                </thead>
                <tbody className="text-gray-600 divide-y">
                    {
                        tableItems.map((item, idx) => (
                            <tr key={idx}>
                                <td className="flex items-center gap-x-3 py-3 px-6 whitespace-nowrap">
                                    <img src={item.avatar} className="w-10 h-10 rounded-full" />
                                    <div>
                                        <span className="block text-gray-700 text-sm font-medium">{item.name}</span>
                                        <span className="block text-gray-700 text-xs">{item.email}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.phone_nimber}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.position}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.salary}</td>
                                <td className="text-right px-6 whitespace-nowrap">
                                    <a href="javascript:void()" className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg">
                                        Edit
                                    </a>
                                    <button href="javascript:void()" className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default ManageTable;