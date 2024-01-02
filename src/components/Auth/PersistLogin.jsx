import React, { useEffect, useRef, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { usePersist } from '../../hooks';
import { useSelector } from 'react-redux';

import { useRefreshMutation } from '../../store/slices/authApiSlice';
import { selectCurrentToken } from '../../store/slices/authSlice';

import PulseLoader from 'react-spinners/PulseLoader';

export const PersistLogin = () => {

    const [persist] = usePersist()
    const token = useSelector(selectCurrentToken)
    const effectRan = useRef(false)

    const [trueSuccess, setTrueSuccess] = useState(false)

    const [refresh, {
        isUninitialized,
        isLoading,
        isSuccess,
        isError,
        error
    }] = useRefreshMutation()


    useEffect(() => {

        // React 18 Strict Mode
        if (effectRan.current === true || process.env.NODE_ENV !== 'development') { 

            const verifyRefreshToken = async () => {

                console.log('verifying refresh token');

                try {
                    //const response = 
                    await refresh();
                    //const { accessToken } = response.data
                    setTrueSuccess(true);
                }
                catch (err) {
                    console.error(err);
                }
            }

            if (!token && persist) verifyRefreshToken();

        }

        return () => effectRan.current = true;

    // eslint-disable-next-line
    }, [])

    let content;

    if (!persist) {                             // persist: no
        console.log('no persist')
        content = <Outlet />

    } else if (isLoading) {                     //persist: yes, token: no
        console.log('loading')
        content = <PulseLoader color={'#FFF'} />

    } else if (isError) {                       //persist: yes, token: no
        console.log('error')
        content = (
            <p className='errmsg'>
                {`${error?.data?.message} - `}
                <Link to='/login'>Please login again</Link>.
            </p>
        )

    } else if (isSuccess && trueSuccess) {      //persist: yes, token: yes
        console.log('success')
        content = <Outlet />

    } else if (token && isUninitialized) {      //persist: yes, token: yes
        console.log('token and uninit')
        console.log(isUninitialized)
        content = <Outlet />
    }

    return content
};
