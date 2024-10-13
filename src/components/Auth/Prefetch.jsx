import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { store } from '../../store';
import { useGetPropertiesQuery } from '../../store/slices';
import secureLocalStorage from 'react-secure-storage';
import {
	notesApiSlice,
	usersApiSlice,
	propertiesApiSlice,
} from '../../store/slices';

export const Prefetch = () => {
	useEffect(() => {
		// console.log('subscribing')
		// const properties = store.dispatch(propertiesApiSlice.endpoints.getProperties.initiate())

		// return () => {
		//     console.log('unsubscribing')
		//     properties.unsubscribe();
		// }
		prefetchAllSlices();
	}, []);

	const prefetchAllSlices = async () => {
		store.dispatch(
			propertiesApiSlice.util.prefetch('getProperties', 'propertiesList', {
				force: true,
			})
		);
		store.dispatch(
			notesApiSlice.util.prefetch('getNotes', 'notesList', { force: true })
		);
		store.dispatch(
			usersApiSlice.util.prefetch('getUsers', 'usersList', { force: true })
		);
	};

	const { properties } = useGetPropertiesQuery(
		'propertiesList',
		{
			selectFromResult: ({ data }) => ({
				properties: data,
			}),
		}
	);

	if(properties) {
		secureLocalStorage.removeItem('propertyList');
		secureLocalStorage.setItem('propertyList', properties);
	}
	
	// const myList = secureLocalStorage.getItem('propertyList')	
	// console.log('myList = ', myList)

	return <Outlet />;
};
