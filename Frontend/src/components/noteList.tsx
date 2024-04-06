import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import DeleteNoteButton from './deleteNote';
import EditNoteButton from './editNote';
import AddNoteForm from './addForm';
import './noteList.css';
import DOMPurify from 'dompurify';
import { fetchNotes } from '../features/notesSlice';

const NoteList: React.FC = () => {
    const dispatch = useDispatch<any>();
    const { notes, status, error } = useSelector((state: RootState) => state.notes);

    useEffect(() => {
        dispatch(fetchNotes());
    }, [dispatch]);

    if (status === 'loading') return <div>Loading...</div>;
    if (status === 'failed') return <div>Error: {error}</div>;

    return (
        <div className="note-list-container">
            <h1>Notes App</h1>
            <AddNoteForm />
            <ul className="note-list">
                {notes.map(note => (
                    <li key={note._id} className="note-item">
                        <div className="note-text" dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(note.content, { USE_PROFILES: { html: true } })
                        }}>
                        </div>
                        <div className="note-buttons">
                            <EditNoteButton id={note._id} initialText={note.content} />
                            <DeleteNoteButton id={note._id} />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NoteList;