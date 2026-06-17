import React from 'react'
import Navbar_left from './Navbar_left';
import Navbar_right from './Navbar_right';

const Navbar = () => {
    return (
        <div className='flex justify-between items-center p-10'>
            <div>
                <Navbar_left/>
            </div>
            <div>
                <Navbar_right/>
            </div>
        </div>
    )
}

export default Navbar;
