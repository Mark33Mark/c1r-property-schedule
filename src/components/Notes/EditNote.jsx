import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetNotesQuery } from '../../store/slices/notesApiSlice';
import { useGetUsersQuery } from '../../store/slices/usersApiSlice';
import { EditNoteForm } from './EditNoteForm';
import { useAuth, useTitle } from '../../hooks';
import PulseLoader from 'react-spinners/PulseLoader';

export const EditNote = () => {

    useTitle('CSR: Edit Note')

    const { id } = useParams()

    const { username, isManager, isAdmin } = useAuth()

    const { note } = useGetNotesQuery("notesList", {
        selectFromResult: ({ data }) => ({
            note: data?.entities[id]
        }),
    })

    const { users } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            users: data?.ids.map(id => data?.entities[id])
        }),
    })

    if (!note || !users?.length) return <PulseLoader color={"#FFF"} />


    if (!isManager && !isAdmin) {
        if (note.username !== username) {
            return <p className="errmsg">No access</p>
        }
    }

    const content = <EditNoteForm note={note} users={users} />

    return content;
};
