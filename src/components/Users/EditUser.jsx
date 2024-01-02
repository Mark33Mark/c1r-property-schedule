import React from 'react';
import { useParams } from 'react-router-dom';
import { EditUserForm } from './EditUserForm';
import { useGetUsersQuery } from '../../store/slices/usersApiSlice';
import PulseLoader from 'react-spinners/PulseLoader';
import { useTitle } from '../../hooks/useTitle';

const EditUser = () => {

    useTitle('CSR: Edit User')

    const { id } = useParams()

    const { user } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            user: data?.entities[id]
        }),
    })

    if (!user) return <PulseLoader color={"#FFF"} />

    const content = <EditUserForm user={user} />

    return content;

};

export { EditUser };