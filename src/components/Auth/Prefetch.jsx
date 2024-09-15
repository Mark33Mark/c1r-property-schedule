import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { store } from '../../store';
import { notesApiSlice, usersApiSlice, propertiesApiSlice, useGetPropertiesQuery} from '../../store/slices';
import secureLocalStorage from 'react-secure-storage';
import { deserializeData } from '../../utils';

export const Prefetch = () => {

    useEffect(() => {

        // console.log('subscribing')
        // const properties = store.dispatch(propertiesApiSlice.endpoints.getProperties.initiate())

        // return () => {
        //     console.log('unsubscribing')
        //     properties.unsubscribe();
        // }
        store.dispatch(propertiesApiSlice.util.prefetch('getProperties', 'propertiesList', { force: true }))
        store.dispatch(notesApiSlice.util.prefetch('getNotes', 'notesList', { force: true }))
        store.dispatch(usersApiSlice.util.prefetch('getUsers', 'usersList', { force: true }))
    }, [])


    // store properties data in LocalStorage to improve performance
    const { properties, isLoading, isError, error } = useGetPropertiesQuery(
        'propertiesList',
        {
            selectFromResult: ({ data }) => ({
                properties: data,
            }),
        }
    );

    const deserializedPropertiesList = properties ? deserializeData(properties) : null;

    console.log('properties List from RTK = ', properties)
    console.log('properties Deserialized List = ', deserializedPropertiesList)

    secureLocalStorage.setItem('propertiesList', deserializedPropertiesList);



    return <Outlet />
};
