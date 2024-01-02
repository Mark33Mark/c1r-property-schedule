import React from 'react';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetNotesQuery } from '../../store/slices/notesApiSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import constants from '../../config/constants';


const Note = ({ noteId }) => {

    const { note } = useGetNotesQuery('notesList', { selectFromResult: ({ data }) => ({ note: data?.entities[noteId] }) })

    const navigate = useNavigate();

    if (note) {

        const created = new Date(note.created).toLocaleString(constants.locale, constants.timestampFormat);
        const updated = note.created !== note.updated ? new Date(note.updated).toLocaleString(constants.locale, constants.timestampFormat) : '-'

        const handleEdit = () => navigate(`/dash/notes/${noteId}`)

        return (
            <tr className='table__row'>
                <td className='table__cell note__status'>
                    {note.completed
                        ? <span className='note__status--completed'>Completed</span>
                        : <span className='note__status--open'>Open</span>
                    }
                </td>
                <td className='table__cell note__created'>{created}</td>
                <td className='table__cell note__updated'>{updated}</td>
                <td className='table__cell note__title'>{note.title}</td>
                <td className='table__cell note__username'>{note.username}</td>

                <td className='table__cell'>
                    <button
                        className='icon-button table__button'
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
            </tr>
        )

    } else return null;
};

export default memo(Note);
