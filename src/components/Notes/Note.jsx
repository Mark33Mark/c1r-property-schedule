import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetNotesQuery } from '../../store/slices/notesApiSlice';
import { PenToSquare } from '../../assets';
import { constants } from '../../config';

const Note = ({ noteId }) => {
	const { note } = useGetNotesQuery('notesList', {
		selectFromResult: ({ data }) => ({ note: data?.entities[noteId] }),
	});

	const navigate = useNavigate();

	const { locale, timestampFormat } = constants[0];

	if (note) {
		const created = new Date(note.created).toLocaleString(
			locale,
			timestampFormat
		);
		const updated =
			note.created !== note.updated
				? new Date(note.updated).toLocaleString(locale, timestampFormat)
				: '-';

		const handleEdit = () => navigate(`/dash/notes/${noteId}`);

		return (
			<tr className='table__row'>
				<td className='table__cell note__status'>
					{note.completed ? (
						<span className='note__status--completed'>Completed</span>
					) : (
						<span className='note__status--open'>Open</span>
					)}
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
						<PenToSquare />
					</button>
				</td>
			</tr>
		);
	} else return null;
};

export default memo(Note);
