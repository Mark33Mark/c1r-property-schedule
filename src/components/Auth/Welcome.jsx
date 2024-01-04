import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth, useTitle } from '../../hooks';
import { constants } from '../../config';

import { IndustrialBuilding } from '../../assets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFileCirclePlus,
    faFilePen,
    faUserGear,
    faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

export const Welcome = () => {
	const { username, isManager, isAdmin } = useAuth();

	useTitle(`CSR: ${username}`);

	const { locale, timestampFormat } = constants[0];
	const today = new Date().toLocaleString(locale, timestampFormat);

	const content = (
		<>
			<section className='welcome'>
				<div className='welcome__username'>👋🏼 {username}</div>
			</section>

            <section className='welcome__property-schedule'>
                <p className='welcome__icon-link-container'>
                    <Link to='/dash/property'>
                        <IndustrialBuilding className="welcome__icons icon-button__custom property-icon svg-inline--fa fa-file-pen welcome__icons" height={40} width={40} /> 
                        <span className='welcome__link-text'>View Properties</span>
					</Link>
                </p>
			</section>

			<section className='welcome__administration'>
                <h3>Admin tasks:</h3>
                <br />
				<p className='welcome__icon-link-container'>
                    <Link to='/dash/notes'>
                        <FontAwesomeIcon className='welcome__icons' icon={faFilePen} />
                        <span className='welcome__link-text'>View Action Requests</span>
					</Link>
				</p>

				<p className='welcome__icon-link-container'>
                    <Link to='/dash/notes/new'>
                        <FontAwesomeIcon className='welcome__icons' icon={faFileCirclePlus} />
                        <span className='welcome__link-text'>Add New Action Request</span>
					</Link>
					<Link to='/dash/notes/new'></Link>
				</p>

                <br />

				{(isManager || isAdmin) && (
					<p className='welcome__icon-link-container'>
                        <Link to='/dash/users'>
                            <FontAwesomeIcon className='welcome__icons' icon={faUserGear} />
                            <span className='welcome__link-text'>View User Settings</span>
                        </Link>
					</p>
				)}

				{(isManager || isAdmin) && (
					<p className='welcome__icon-link-container'>
						<Link to='/dash/users/new'>
                        <FontAwesomeIcon className='welcome__icons' icon={faUserPlus} />
                            <span className='welcome__link-text'>Add New User</span>
                        </Link>
					</p>
				)}
			</section>
		</>
	);

	return content;
};
