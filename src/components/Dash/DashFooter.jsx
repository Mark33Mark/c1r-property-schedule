import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks';
import { constants } from '../../config';
import { House } from '../../assets';


export const DashFooter = () => {

    const { username, status } = useAuth()

    const navigate = useNavigate()
    const { pathname } = useLocation()

    const onGoHomeClicked = () => navigate('/dash')

    const { locale, timestampFormat } = constants[0];
	const today = new Date().toLocaleString(locale, timestampFormat);

    let goHomeButton = null
    if (pathname !== '/dash') {
        goHomeButton = (
            <button
                className='dash-footer__button icon-button'
                title='Home'
                onClick={onGoHomeClicked}
            >
                < House />
            </button>
        )
    }

    const content = (
        <footer className='dash-footer'>
            <div className='dash-footer__icon'>
                {goHomeButton}
            </div>
            <div className='dash-footer__text'>
                <p className='dash-footer__user'><b>{username} privileges:</b> {status}</p>
                <p className='dash-footer__timestamp'><b>activity timestamp:</b> {today}</p>
            </div>
        </footer>
    )
    return content;
};
