import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { CsrIcon } from '../../assets';

export const NavBar = () => {

    const location = useLocation();

    const content = (
        <nav className="public__nav-bar">
            <div className="public__navbar-welcome">
                <h1>
                    Welcome to the
                </h1>
                <CsrIcon className='welcome-logo' height={48} width={48} />
                <h1> 
                    Property Schedule
                </h1>
            </div>

            <div className="public__navbar-menu">
                
                { location.pathname !== '/' ?
                    <NavLink
                        className='public__navbar-link'
                        to='/'
                    >
                        Home
                    </NavLink>
                    :
                    // <NavLink
                    //     className='public__navbar-link guest'
                    //     to='/'
                    //     title='guest'
                    // >
                    //     G
                    // </NavLink>
                    null
                }

                <NavLink
                    className='public__navbar-link'
                    to='/login'
                >
                    Login
                </NavLink>
                {/* <NavLink
                    className='public__navbar-link'
                    to='/register'
                >
                    Register
                </NavLink> */}
            </div>
        </nav>
    );
    return content;
};
