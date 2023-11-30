import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Button } from "@mui/material";
import Swal from "sweetalert2";

const UserAppointments = () => {
    const { user } = useContext(AuthContext)
    const [appointment, setAppointments] = useState([]);

    useEffect(() => {
        axios.get('https://diag-central-server.vercel.app/appointments', { withCredentials: true })
            .then(res => setAppointments(res.data))
    }, [setAppointments])
    // console.log(appointment);

    const handleCancel = (id) => {

        Swal.fire({
            title: "Do you want to cancel the appointment?",
            showDenyButton: true,
            confirmButtonText: "Yes",
            denyButtonText: `No`
        }).then((result) => {
            
            if (result.isConfirmed) {
                axios.delete(`https://diag-central-server.vercel.app/appointments/${id}`)
                    .then(() => {
                        axios.get('https://diag-central-server.vercel.app/appointments', { withCredentials: true })
                            .then(res => setAppointments(res.data))
                            .catch((err) => console.log(err))

                    });
                Swal.fire("Appointment is Canceled", "", "success");
            } 
        });





    }


    const userAppointment = appointment.filter(item => user.email === item.userEmail)
    // console.log(userAppointment);
    // const {title, image} = userAppointment;
    return (
        <div className="w-full">
            <div className="mt-12 divide-y">
                {
                    userAppointment.map((item, idx) => (
                        <div key={idx} className="py-5 flex items-center justify-between shadow-sm border p-2">
                            <div className="flex gap-3 items-center">
                                <img src={item.image} className="flex-none w-12 h-12 rounded-full" />
                                <div>
                                    <span className="block text-sm text-gray-700 font-semibold">{item.title}</span>
                                    <span className="block text-sm text-gray-600">{item.userEmail}</span>
                                    <p><span className="font-semibold">Appointment date:</span> {item.availableDate} </p>
                                    <p><span className="font-semibold">Appointment time:</span>  {item.timeSlot} </p>
                                </div>
                            </div>
                            <Button onClick={() => handleCancel(item._id)} variant="contained" color="warning">Cancel Appointment</Button>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default UserAppointments;