import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteNote } from '../features/notesSlice';
import './deleteNote.css';

interface Props {
    id: string;
}

const DeleteNoteButton: React.FC<Props> = ({ id }) => {
    const dispatch = useDispatch<any>();

    const handleDelete = () => {
             dispatch(deleteNote(id));
    };

    return (
        <button onClick={handleDelete} className='delete-note-btn'>Delete</button>
    );
};

export default DeleteNoteButton;