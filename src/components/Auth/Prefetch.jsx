import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { store } from '../../store';
import { notesApiSlice } from '../../store/slices/notesApiSlice';
import { usersApiSlice } from '../../store/slices/usersApiSlice';

export const Prefetch = () => {

    useEffect(() => {
        store.dispatch(notesApiSlice.util.prefetch('getNotes', 'notesList', { force: true }))
        store.dispatch(usersApiSlice.util.prefetch('getUsers', 'usersList', { force: true }))
    }, [])

    return <Outlet />
};
