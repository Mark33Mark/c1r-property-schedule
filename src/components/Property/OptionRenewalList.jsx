import React, { useState, useEffect } from 'react';
import { useGetPropertiesQuery } from '../../store/slices';
import { RadioList } from '../RadioButton/RadioList';
import {
	propPicker,
	flattenObject,
	filterByDateRange,
	filterByExerciseDatePassed,
} from '../../utils';
import { differenceInDatesDetailed } from '../../utils';

export const OptionRenewalList = () => {
	const [radioValue, setRadioValue] = useState(localStorage.getItem('radio1') || '1');
    const [filteredData, setFilteredData] = useState([]);
	
	const { properties } = useGetPropertiesQuery('propertiesList', {
		selectFromResult: ({ data }) => ({
			properties: data,
		}),
	});

	let tableContentPendingNoticeDates;
	let filteredByDateRange;
	let deserializedContent;
	let newObjArray = [];
    let timeSpan;

	if (properties) {
		const { ids, entities } = properties;

		// remove the id serialization by RTK's createEntityAdapter
		deserializedContent =
			ids?.length && ids.map((propertyId) => entities[propertyId]);

		deserializedContent.map((mapObj) => {
			const contractAndAddressObj = propPicker(mapObj, [
				'business',
				'contract',
				'address',
				'exercise',
			]);
			const flattenObj = flattenObject(contractAndAddressObj);

			newObjArray.push(flattenObj);
		});
	};

	const customRadioButtonStatus = (value) => setRadioValue(value);

	switch (radioValue) {
		case null || '1':
			timeSpan = 3;
			break;
		case '2':
			timeSpan = 6;
			break;
		case '3':
			timeSpan = 9;
			break;
		case '4':
			timeSpan = 12;
			break;
		default:
			timeSpan = 3;
	}

	useEffect(() => {
		// Options to be exercised in user selected months
		filteredByDateRange = filterByDateRange(newObjArray, timeSpan);
		setFilteredData(filteredByDateRange);
	
		
		// const filteredByExerciseDatePassed = filterByExerciseDatePassed(newObjArray);
		// console.log('filter exercise date passed = ', filteredByExerciseDatePassed);

	}, [properties, radioValue]);


    const updatedContent =  filteredData ?
        filteredData
            // sort data first by date in ascending order
            .sort((a, b) => {
                return new Date(a.exercise) - new Date(b.exercise);
            })
            // map the data as it is sorted
            .map((data, i) => (
                <tr
                    key={i}
                    className='table__row'
                >
                    <td className='table__cell'>
                        {differenceInDatesDetailed(new Date(data.exercise))}
                    </td>
                    <td className='table__cell'>{data.business}</td>
                    <td className='table__cell'>
                        {data.street}, {data.suburb}, {data.state}
                    </td>
                    <td className='table__cell'>{data.contract}</td>
                </tr>
            ))
        : null;

	return (
		<div>
			<h2 className='welcome__option-dashboard-title'>
				Option Notices Dashboard
			</h2>

			<h4>filter time span: </h4>
			<RadioList
				updateParent={customRadioButtonStatus}
				items={[
					{ id: '1', label: '3 months' },
					{ id: '2', label: '6 months' },
					{ id: '3', label: '9 months' },
					{ id: '4', label: '12 months' },
				]}
			/>

			<div className='table-container'>
				<table className='table table--options' >
					<thead className='table__thead'>
						<tr>
							<th className='table__th'>last day to exercise</th>
							<th className='table__th'>business</th>
							<th className='table__th'>property</th>
							<th className='table__th'>contract</th>
						</tr>
					</thead>
					<tbody >{updatedContent}</tbody>
				</table>
			</div>
		</div>
	);
};
