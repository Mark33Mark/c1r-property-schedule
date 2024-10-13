import React, { useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useSendLogoutMutation } from '../../store/slices/authApiSlice';
import { useAuth } from '../../hooks';
import {
	CsrIcon,
	IndustrialBuilding,
	DataConversion,
	UserGear,
	UserPlus,
	FilePen,
	FileCirclePlus,
    MapAustAndNz,
	RightFromBracket,
} from '../../assets';
import PulseLoader from 'react-spinners/PulseLoader';

const DASH_REGEX = /^\/dash(\/)?$/;
const NOTES_REGEX = /^\/dash\/notes(\/)?$/;
const DATA_REGEX = /^\/dash\/data(\/)?$/;
const PROPERTY_REGEX = /^\/dash\/property(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;

export const DashHeader = () => {
	const { isManager, isAdmin } = useAuth();

	const navigate = useNavigate();
	const { pathname } = useLocation();

	const [sendLogout, { isLoading, isSuccess, isError, error }] =
		useSendLogoutMutation();

	useEffect(() => {
		if (isSuccess) navigate('/');
	}, [isSuccess, navigate]);

	const onNewNoteClicked = () => navigate('/dash/notes/new');
	const onNewUserClicked = () => navigate('/dash/users/new');
	const onUsersClicked = () => navigate('/dash/users');
	const onNotesClicked = () => navigate('/dash/notes');
	const onPropertyClicked = () => navigate('/dash/property');
	const onDataClicked = () => navigate('/dash/data');

	let dashClass = null;
	if (
		!DASH_REGEX.test(pathname) &&
		!NOTES_REGEX.test(pathname) &&
		!USERS_REGEX.test(pathname) &&
		!PROPERTY_REGEX.test(pathname) &&
		!DATA_REGEX.test(pathname)
	) {
		dashClass = 'dash-header__container--small';
	}

	let propertyButton = null;
	if (
		!DASH_REGEX.test(pathname) &&
		!PROPERTY_REGEX.test(pathname) &&
		pathname.includes('/dash')
	) {
		propertyButton = (
			<button
				className='icon-button'
				title='property'
				onClick={onPropertyClicked}
			>
				<IndustrialBuilding
					className='icon-button__custom'
					height={40}
					width={40}
				/>
			</button>
		);
	}

	let dataConversionButton = null;
	if (isAdmin) {
		if (
			!DASH_REGEX.test(pathname) &&
			!PROPERTY_REGEX.test(pathname) &&
			!DATA_REGEX.test(pathname) &&
			!NOTES_REGEX.test(pathname) &&
			!pathname.includes('notes/new') &&
			pathname.includes('/dash')
		) {
			propertyButton = (
				<button
					className='icon-button'
					title='data conversion'
					onClick={onDataClicked}
				>
					<DataConversion
						className='icon-button__custom'
						style={{ width: '4rem', height: '4rem', fill: '#FFF' }}
					/>
				</button>
			);
		}
	}

	let newUserButton = null;
	if (USERS_REGEX.test(pathname)) {
		newUserButton = (
			<button
				className='icon-button'
				title='new user'
				onClick={onNewUserClicked}
			>
				<UserPlus />
			</button>
		);
	}

	let userButton = null;
	if (isManager || isAdmin) {
		if (
			!DASH_REGEX.test(pathname) &&
			!PROPERTY_REGEX.test(pathname) &&
			!USERS_REGEX.test(pathname) &&
			pathname.includes('/dash')
		) {
			userButton = (
				<button
					className='icon-button'
					title='Users'
					onClick={onUsersClicked}
				>
					<UserGear />
				</button>
			);
		}
	}

	let notesButton = null;
	if (
		!DASH_REGEX.test(pathname) &&
		!NOTES_REGEX.test(pathname) &&
		pathname.includes('/dash')
	) {
		notesButton = (
			<button
				className='icon-button'
				title='action requests'
				onClick={onNotesClicked}
			>
				<FilePen />
			</button>
		);
	}

	let newNoteButton = null;
	if (NOTES_REGEX.test(pathname)) {
		newNoteButton = (
			<button
				className='icon-button'
				title='new note'
				onClick={onNewNoteClicked}
			>
				<FileCirclePlus />
			</button>
		);
	}

	const mapCluster = (
		<button
			className='icon-button'
			title='map cluster of CSR locations'
			onClick={()=>{}}
		>
			<MapAustAndNz className = "icon-button__map-aus-nz" height={40} />
		</button>
	);

	const logoutButton = (
		<button
			className='icon-button'
			title='logout'
			onClick={sendLogout}
		>
			<RightFromBracket />
		</button>
	);

	const emptySpace = <div className='empty-space'></div>;

	const errClass = isError ? 'errmsg' : 'offscreen';

	let buttonContent;
	if (isLoading) {
		buttonContent = <PulseLoader color={'#FFF'} />;
	} else {
		buttonContent = (
			<>
				{propertyButton}
				{dataConversionButton}
				{newNoteButton}
				{newUserButton}
				{notesButton}
				{userButton}
                {/* {mapCluster} */}
				{logoutButton}
				{emptySpace}
			</>
		);
	}

	const content = (
		<>
			<p className={errClass}>{error?.data?.message}</p>

			<header className='dash-header'>
				<div className={`dash-header__container ${dashClass}`}>
					<Link
						className='dash-header__link'
						to='/dash'
						title='Home'
					>
						<div className='csr-icon-container'>
							<CsrIcon
								className='csr-icon'
								height={40}
								width={40}
							/>
						</div>
						<span className='dash-header__title'> Property</span>
					</Link>
					<nav className='dash-header__nav'>{buttonContent}</nav>
				</div>
			</header>
		</>
	);

	return content;
};
