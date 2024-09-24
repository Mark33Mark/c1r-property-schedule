import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetUsersQuery } from '../../store/slices/usersApiSlice';
import { PenToSquare } from '../../assets';


const User = ({ userId }) => {

    const { user } = useGetUsersQuery('usersList', {
        selectFromResult: ({ data }) => ({
            user: data?.entities[userId]
        }),
    });

    // console.log('user = ', user);

    const navigate = useNavigate();

    if (user) {
        const handleEdit = () => navigate(`/dash/users/${userId}`)

        const userRolesString = user.roles.toString().replaceAll(',', ', ')

        const cellStatus = user.active ? '' : 'table__cell--inactive'

        return (
            <tr className='table__row user'>
                <td className={`table__cell ${cellStatus}`}>{user.username}</td>
                <td className={`table__cell ${cellStatus}`}>{userRolesString}</td>
                <td className={`table__cell ${cellStatus}`}>
                    <button
                        className='icon-button table__button'
                        onClick={handleEdit}
                    >
                        <PenToSquare />
                    </button>
                </td>
            </tr>
        )

    } else return null;

};

export default memo(User);
