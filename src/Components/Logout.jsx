import React, { useContext } from 'react';
import { MdLogout } from "react-icons/md";
import { AuthContext } from '../AuthContext/AuthProvider';

const Logout = () => {

    const { logout } = useContext(AuthContext);

    const handleLogout = () => {
        console.log('User logged out');
        logout();
    };

return (

    <div
        onClick={handleLogout} 
        className='w-full flex gap-8 items-center font-semibold text-xl px-7 py-3 mt-32 text-logout cursor-pointer'
    >
        <MdLogout size={35} /> Logout
    </div>
);
};

export default Logout;