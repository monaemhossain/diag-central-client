import { Avatar, Button } from "@mui/material";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import axios from "axios";


const DropDown = () => {

  const { user, logOut } = useContext(AuthContext)
  // console.log(user);
  const { displayName, photoURL, email } = user;
  const profileRef = useRef()
  const [isProfileActive, setIsProfileActive] = useState(false)


  const handleLogOut = () => {
    
    logOut()
      .then(() => {
        axios.post('https://diag-central-server.vercel.app/logout', {user: email}, { withCredentials: true })
          .then(res => {
            console.log(res.data);
          })
      })
    // .then(res => console.log(res))
    // .catch(err => console.log(err))
  }


  return (
    <div className="relative flex-1 text-right">
      <button ref={profileRef} className="p-1.5 rounded-md text-gray-500 hover:bg-gray-50 active:bg-gray-100"
        onClick={() => setIsProfileActive(!isProfileActive)}
      >
        <Avatar alt="Remy Sharp" src={photoURL} />
      </button>
      {
        isProfileActive ? (
          <div className="absolute z-10 top-12 right-0 w-64 rounded-lg bg-white shadow-md border">
            <div className="p-4 text-left grid gap-3">

              <h2 className="text-defaultText text-lg">Hello! {displayName}</h2>
              {
                user ? <Button
                  fullWidth
                  variant='outlined'
                  color={'error'}
                  onClick={handleLogOut}
                  sx={{ fontWeight: 'bold', color: 'red' }}
                  className='absolute'
                >
                  Log out
                </Button> : ''
              }
            </div>
          </div>
        ) : ""
      }
    </div>
  );
};

export default DropDown;