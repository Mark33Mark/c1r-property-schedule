import { memo, useCallback } from 'react';
import { matchLogo } from '../../utils';
import { useMap } from '@vis.gl/react-google-maps';

const FEATURE_ARRAY_LENGTH = 10;
const numFmt = new Intl.NumberFormat();

const ListItem = (props) => {
	const { coords, handleClick, business, suburb } = props;

	return (
		<>
			<li className='list__property--item'>
				<button
					className='button__property'
					onClick={handleClick}
					value={coords}
				>
					{business} - {suburb}
				</button>
			</li>
		</>
	);
};

export const InfoWindowContent = memo((props) => {
	const { features } = props;
	const { contract, business, holding, name, address } = features[0].properties;
	const { street, suburb } = address;

	const map = useMap();

	const handleClick = useCallback(
		(event) => {
			event.stopPropogation;

			// convert returned string back to array using split and delimiter ","
			const coords = event.target.value.split(',');

			// create coordinates object to pass to Google Maps.
			const coordsObj = {
				lng: parseFloat(coords[0]),
				lat: parseFloat(coords[1]),
			};

			map.setZoom(17);
			map.setCenter(coordsObj);
		},
		[features]
	);

	// if one 1 property in the supercluster then provide property information
	if (features.length === 1) {
		return (
			<div>
				<div
					className='logo-container'
					data-holding={holding}
				>
					{matchLogo(business)}
				</div>
				<h4>
					{name} - {holding}
				</h4>
				<div className='cluster__selected-info'>
					{/* <a href={getDetailsUrl(props)} target="_blank">
						more information
					</a> */}
					<p>{contract}</p>
					<p>{street}</p>
					<p>{suburb}</p>
				</div>
			</div>
		);
	}

	// if more than 1 property in cluster array then summarise the information
	return (
		<div className='info__panel'>
			<h4>Click on property to zoom to it.</h4>
			<ul className='list__property'>
				{/* list up to 10 properties from the cluster array */}
				{features?.slice(0, FEATURE_ARRAY_LENGTH).map((feature) => {
					return (
						<ListItem
							coords={feature.geometry.coordinates}
							handleClick={handleClick}
							key={feature.id}
							business={feature.properties.business}
							suburb={feature.properties.address.suburb}
						/>
					);
				})}
			</ul>
			{features.length > FEATURE_ARRAY_LENGTH && (
				<p>+ {numFmt.format(features.length - FEATURE_ARRAY_LENGTH)} more.</p>
			)}
		</div>
	);
});
