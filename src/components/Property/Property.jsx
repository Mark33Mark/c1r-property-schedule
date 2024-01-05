import React, { useState, useEffect } from 'react';
import { useGetPropertiesQuery } from '../../store/slices';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { useTitle } from '../../hooks';
import PulseLoader from 'react-spinners/PulseLoader';
import { constants } from '../../config';
import { differenceInDates, differenceInDatesDetailed, differenceInDatesPast } from '../../utils/converter';
import { CloseButton, PropertySearch, MapAustAndNz } from '../../assets';
import secureLocalStorage from 'react-secure-storage';

export const Property = () => {
	const [selection, setSelection] = useState({});

	useTitle('CSR: Properties');

	// RTK Query already polled query when user logged in,
	// handled in <Prefetch /> component
	const { properties, isLoading, isError, error } = useGetPropertiesQuery(
		'propertiesList',
		{
			selectFromResult: ({ data }) => ({
				properties: data,
			}),
		}
	);

	let content;
	let cardContent;
	let deserializedContent;

	if (isLoading) content = <PulseLoader color={'#FFF'} />;

	if (isError) {
		content = <p className='errmsg'>{error?.data?.message}</p>;
	}

	if (properties) {
		const { ids, entities } = properties;

		// remove the id serialization by RTK's createEntityAdapter
		deserializedContent =
			ids?.length && ids.map((propertyId) => entities[propertyId]);
	}

	// handle for persisting selected property.
	useEffect(() => {
		if (
			Object.keys(selection).length === 0 &&
			secureLocalStorage.getItem('selectedProperty')
		) {
			setSelection(secureLocalStorage.getItem('selectedProperty'));
		}
	}, []);

	const handleOnSelect = (item) => {
		console.log('handleOnSelect = ', item);
		setSelection(item);
		secureLocalStorage.setItem('selectedProperty', item);
	};

	const formatResult = (item) => {
		return (
			<div className='result-wrapper'>
				<span className='result-span'>{item.address.street} </span>
				<span className='result-span'> {item.address.suburb},</span>
				<span className='result-span'> {item.address.state} </span>
			</div>
		);
	};

	const { locale, dateOnlyFormat, dateOnlyFormatShort } = constants[0];

	const handleCloseCard = () => {
		setSelection({});
		secureLocalStorage.removeItem('selectedProperty');
	};

	if (Object.keys(selection).length !== 0) {
		const exerciseOptionDate = new Date(selection.lease?.options?.exercise);
		const daysLeftToExerciseOption = differenceInDates(exerciseOptionDate);

		cardContent = (
			<div className='property__display-card'>
				<div className='map__container'>
					<button
						className='button__close-button'
						onClick={handleCloseCard}
						type='button'
						title='close card'
					>
						<CloseButton className='icon__close-button-image' />
					</button>
					<MapAustAndNz className='map__image' />
				</div>
				<div className='property__address'>
					<p className='property__card-contents'>{selection.address?.street}</p>
					<p className='property__card-contents'>{selection.address?.suburb}</p>
					<p className='property__card-contents'>{selection.address?.state}</p>
				</div>
				<br />

				<div className='table-container'>
					<table className='table--property'>
						<tbody className='table--property__body'>
							<tr className='table--property__row'>
								<th className="table--property__th" colSpan={2}>{selection?.business }</th>
								<th className="table--property__th" >SAP: {selection?.contract }</th>
								<th className="table--property__th" colSpan={2} >status: {selection?.lease.status }</th>
							</tr>
							<tr className='table--property__row'>
								<th className='table--property__th'>ends:</th>
								<td className='table--property__cell' colSpan={4}>{differenceInDatesDetailed(new Date(selection?.lease.end))} until lease expires</td>
							</tr>
							<tr className='table--property__row'>
								<th className='table--property__th'>commenced:</th>
								<td className='table--property__cell' colSpan={4}>{differenceInDatesPast(new Date(selection?.lease.start))}</td>
							</tr>
							<tr className='table--property__row'>
								<th className='table--property__th'>1st lease started:</th>
								<td className='table--property__cell' colSpan={4}> { new Date(selection?.lease.start).toLocaleDateString(locale, dateOnlyFormatShort)} </td>
							</tr>
							<tr className='table--property__row'>
								<th className='table--property__th' >options:</th>
								<td className="table--property__cell" colSpan={1}>{selection?.lease?.options?.available.length}<br />options available</td>
								<td className="table--property__cell" colSpan={3}>last date to exercise:<br /> { differenceInDatesDetailed(exerciseOptionDate)}</td>
							</tr>
							<tr className='table--property__row'>
								<th className="table--property__th" >options available:</th>
							</tr>
							<tr className='table--property__row'>
								<td className='table--property__cell'>{selection?.lease?.options?.available[0] ? selection?.lease?.options?.available[0] + ' year/s' : '-'}</td>
								<td className='table--property__cell'>{selection?.lease?.options?.available[1] ? selection?.lease?.options?.available[1] + ' year/s' : '-'}</td>
								<td className='table--property__cell'>{selection?.lease?.options?.available[2] ? selection?.lease?.options?.available[2] + ' year/s' : '-'}</td>
								<td className='table--property__cell'>{selection?.lease?.options?.available[3] ? selection?.lease?.options?.available[3] + ' year/s' : '-'}</td>
								<td className='table--property__cell'>{selection?.lease?.options?.available[4] ? selection?.lease?.options?.available[4] + ' year/s' : '-'}</td>
							</tr>
							<tr className='table--property__row'>
								<th className="table--property__th" >metrics:</th>
								<td className="table--property__cell" colSpan={2}>GLA: {selection?.lease.GLA}m²</td>
								<td className="table--property__cell" colSpan={2}>lease type: {selection?.lease.type}</td>
							</tr>
							<tr className='table--property__row'>
								<th className="table--property__th" >rent:</th>
								<td className="table--property__cell" colSpan={2}>${selection?.lease?.rent}</td>
								<td className="table--property__cell" colSpan={2}>${ (selection?.lease?.rent / selection?.lease?.GLA).toFixed(2)}/m²</td>
							</tr>
							<tr className='table--property__row'>
								<th className="table--property__th" >outgoings:</th>
								<td className="table--property__cell" colSpan={2}>${selection?.lease?.outgoings}</td>
								<td className="table--property__cell" colSpan={2}>${ (selection?.lease?.outgoings / selection?.lease?.GLA).toFixed(2)}/m²</td>
							</tr>
							<tr className='table--property__row'>
								<th className="table--property__th" colSpan={1}>landlord:</th>
								<td className="table--property__cell" colSpan={4}>name</td>
							</tr>
							<tr className='table--property__row'>
								<td className="table--property__th" colSpan={1}>{" "}</td>
								<td className="table--property__th" colSpan={2}> address </td>
								<td className="table--property__cell" colSpan={2}> contact number </td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		);
	}

	return (
		<div className='property__container'>
			<h2 className='property__heading'>
				<PropertySearch
					className='property__search-icon'
					height={48}
					width={48}
				/>
				filters by street, suburb and state
			</h2>
			<div style={{ width: '95%', maxWidth: '750px', margin: '1rem 0' }}>
				{deserializedContent?.length > 0 ? (
					<ReactSearchAutocomplete
						items={deserializedContent}
						fuseOptions={{
							keys: ['address.suburb', 'address.street', 'address.state'],
						}} // Search on both fields
						resultStringKeyName='business' // String to display in the results
						onSelect={handleOnSelect}
						// onSearch={handleOnSearch}
						// onHover={handleOnHover}
						// onFocus={handleOnFocus}
						// onClear={handleOnClear}
						formatResult={formatResult}
						showIcon={false}
						styling={{
							height: '48px',
							border: '1px solid darkgreen',
							borderRadius: '8px',
							backgroundColor: 'white',
							boxShadow: 'none',
							hoverBackgroundColor: 'lightgreen',
							color: 'darkgreen',
							fontSize: '1rem',
							fontFamily: 'inherit',
							iconColor: 'green',
							lineColor: 'lightgreen',
							placeholderColor: 'darkgreen',
							clearIconMargin: '3px 8px 0 0',
							zIndex: 2,
						}}
						autofocus
					/>
				) : (
					<p>
						waiting for database to load, try refreshing page if this message
						persists...
					</p>
				)}
			</div>
			{cardContent ? cardContent : null}
		</div>
	);
};
