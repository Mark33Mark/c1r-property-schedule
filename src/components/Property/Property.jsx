import React, { useState } from 'react';
import { useGetPropertiesQuery } from '../../store/slices/propertyApiSlice';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { useTitle } from '../../hooks';
import PulseLoader from 'react-spinners/PulseLoader';
import { constants } from '../../config';
import { differenceInDates } from '../../utils/converter';
import { PropertySearch, MapAustAndNz } from '../../assets';
// import { MapAustAndNz } from '../../assets';

export const Property = () => {
	const [selection, setSelection] = useState({});

	useTitle('CSR: Properties');

	const {
		data: properties,
		isLoading,
		isSuccess,
		isError,
		error,
	} = useGetPropertiesQuery('propertiesList', {
		pollingInterval: 150000,
		refetchOnFocus: true,
		refetchOnMountOrArgChange: true,
	});

	let content;
	let cardContent;
	let deserializedContent;

	if (isLoading) content = <PulseLoader color={'#FFF'} />;

	if (isError) {
		content = <p className='errmsg'>{error?.data?.message}</p>;
	}

	if (isSuccess) {
		const { ids, entities } = properties;

		// remove the id serialization by RTK's createEntityAdapter
		deserializedContent =
			ids?.length && ids.map((propertyId) => entities[propertyId]);
	}

	const handleOnSelect = (item) => {
		console.log('handleOnSelect = ', item);
		setSelection(item);
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

	const { locale, dateOnlyFormat } = constants[0];

	if (Object.keys(selection).length !== 0) {
		const exerciseOptionDate = new Date(selection.lease?.options?.exercise);
        const daysLeftToExerciseOption = differenceInDates(exerciseOptionDate);

		cardContent = (
			<div className='property__display-card'>
				<div className='map__container'>
					<MapAustAndNz className='map__image' />
				</div>
				<div className='property__address'>
					<p className='property__card-contents'>{selection.address?.street}</p>
					<p className='property__card-contents'>{selection.address?.suburb}</p>
					<p className='property__card-contents'>{selection.address?.state}</p>
				</div>
				<br />
				<p className='property__card-contents'>
					<b>Last day to exercise option: </b>
				</p>
				<p className='property__card-contents'>
                    There are <span className='property__days-to-exercise'>{daysLeftToExerciseOption}</span> left to notify the landlord before:
				</p>
                <p>{exerciseOptionDate.toLocaleDateString(locale, dateOnlyFormat)}</p>
                {/* <table className='table' >
                    <tbody>

                    <tr>
                        <th scope='col' className='table__th'>Firstname</th>
                        <td className='table__cell'>Jill</td>
                        <td className='table__cell'>Eve</td>
                    </tr>
                    <tr>
                        <th scope='col' className='table__th'>Lastname</th>
                        <td className='table__cell'>Smith</td>
                        <td className='table__cell'>Jackson</td>
                    </tr>
                    <tr>
                        <th scope='col' className='table__th'>Age</th>  
                        <td className='table__cell'>50</td>
                        <td className='table__cell'>94</td>
                    </tr>
                    </tbody>
                </table> */}
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
