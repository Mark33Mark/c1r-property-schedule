import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth, useTitle } from '../../hooks';
import { OptionRenewalList } from '../Property';
import { useGetPropertiesQuery } from '../../store/slices';
import { constants } from '../../config';
import {
	IndustrialBuilding,
	PanelOpen,
	PanelClose,
	DataConversion,
} from '../../assets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faFileCirclePlus,
	faFilePen,
	faUserGear,
	faUserPlus,
} from '@fortawesome/free-solid-svg-icons';

export const Welcome = () => {
	const { username, isManager, isAdmin } = useAuth();
	const [showResults, setShowResults] = useState(false);
	const [propertyList, setPropertyList] = useState({});
	const [dataVersion, setDataVersion] = useState('version unavailable');

	const { locale, dateOnlyFormatShort } = constants[0];

	useTitle(`CSR: ${username}`);

	const handleShowResults = () => setShowResults(!showResults);

	const { properties } = useGetPropertiesQuery('propertiesList', {
		selectFromResult: ({ data }) => ({
			properties: data,
		}),
	});

	useEffect(() => {
		if (properties) {
			setPropertyList(
				properties.ids.map((propertyId) => properties.entities[propertyId])
			);
		}
	}, [properties]);

	useEffect(() => {
		if (propertyList[0]?.sap_data) {
			setDataVersion(
				new Date(propertyList[0]?.sap_data).toLocaleDateString(
					locale,
					dateOnlyFormatShort
				)
			);
		}
	}, [properties, propertyList]);

	const handleDownloadData = () => {
		
		const fileName = 'propertySchedule.json';
		
		// Create a blob of the data
		const fileToSave = new Blob(
			[
				JSON.stringify(propertyList)
			], 
			{
				type: 'application/json'
			}
		);
		
		// Save the file
		saveAs(fileToSave, fileName);
	}

	const content = (
		<>
			<section className='welcome'>
				<div className='welcome__username'>👋🏼 {username}</div>
			</section>

			<section className='welcome__property-schedule'>
				<p className='welcome__icon-link-container welcome__icon-link-property'>
					<Link to='/dash/property'>
						<IndustrialBuilding
							className='welcome__icons icon-button__custom property-icon svg-inline--fa fa-file-pen welcome__icons'
							height={40}
							width={40}
						/>
						<span className='welcome__link-text'>View Properties</span>
						<span className='welcome__version-text'>version: {dataVersion}</span>
					</Link>
				</p>
			</section>

			<section className='welcome__administration'>
				<div className='welcome__administration-title'>
					{showResults ? <b>Admin tasks </b> : ' click to open the Admin panel'}
				</div>
				{showResults ? (
					<>
						<PanelClose
							className='welcome__administration-icon'
							onClick={handleShowResults}
							height={32}
							width={32}
						/>
						<br />
						<p className='welcome__icon-link-container'>
							<Link to='/dash/notes'>
								<FontAwesomeIcon
									className='welcome__icons'
									icon={faFilePen}
								/>
								<span className='welcome__link-text'>View Action Requests</span>
							</Link>
						</p>

						<p className='welcome__icon-link-container'>
							<Link to='/dash/notes/new'>
								<FontAwesomeIcon
									className='welcome__icons'
									icon={faFileCirclePlus}
								/>
								<span className='welcome__link-text'>
									Add New Action Request
								</span>
							</Link>
							<Link to='/dash/notes/new'></Link>
						</p>

						<br />

						{(isManager || isAdmin) && (
							<p className='welcome__icon-link-container'>
								<Link to='/dash/users'>
									<FontAwesomeIcon
										className='welcome__icons'
										icon={faUserGear}
									/>
									<span className='welcome__link-text'>View User Settings</span>
								</Link>
							</p>
						)}

						{(isManager || isAdmin) && (
							<p className='welcome__icon-link-container'>
								<Link to='/dash/users/new'>
									<FontAwesomeIcon
										className='welcome__icons'
										icon={faUserPlus}
									/>
									<span className='welcome__link-text'>Add New User</span>
								</Link>
							</p>
						)}

						{isAdmin && (
							<p className='welcome__icon-link-container-data'>
								<Link to='/dash/data'>
									<DataConversion
										style={{ fill: '#FFF', height: '4rem', width: '4rem' }}
									/>
									<span className='welcome__link-text-data'>
										xlsx to json converter
									</span>
								</Link>
							</p>
						)}

						{isAdmin && (
							<button className="welcome__download-json" type="button" onClick={handleDownloadData}>download data</button>
						)}
					</>
				) : (
					<PanelOpen
						className='welcome__administration-icon'
						onClick={handleShowResults}
						height={32}
						width={32}
					/>
				)}
			</section>
			<OptionRenewalList properties={properties} />
		</>
	);

	return content;
};
