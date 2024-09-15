import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { store } from '../../store';
import { notesApiSlice, usersApiSlice, propertiesApiSlice } from '../../store/slices';

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

    return <Outlet />
};
