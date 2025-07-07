import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import type { QuickNote, EditingState } from '../types';

interface NotesTabProps {
    notes: QuickNote[];
    editingState: EditingState;
    setEditingState: React.Dispatch<React.SetStateAction<EditingState>>;
    onAddNote: (text: string) => void;
    onRemoveNote: (id: number) => void;
    onStartEdit: (type: 'note', item: QuickNote) => void;
    onCancelEdit: () => void;
    onSaveEdit: () => void;
}

export function NotesTab({ notes, editingState, setEditingState, onAddNote, onRemoveNote, onStartEdit, onCancelEdit, onSaveEdit }: NotesTabProps) {
    const [newNote, setNewNote] = useState('');

    const handleAddNote = () => {
        if (newNote.trim()) {
            onAddNote(newNote);
            setNewNote('');
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 animate-fade-in">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Quick Notes</h2>
            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div className="flex gap-3">
                    <input type="text" value={newNote} onChange={(e) => setNewNote(e.target.value)} placeholder="Capture a quick thought..." className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700"/>
                    <button onClick={handleAddNote} className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 flex items-center font-semibold transition"><Plus className="w-4 h-4 mr-1" />Add</button>
                </div>
            </div>
            <div className="space-y-3">
                {notes.map(note => (
                    <div key={note.id} className="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
                        {editingState.id === note.id && editingState.type === 'note' ? (
                            <div className="flex items-center gap-2">
                                <input type="text" value={editingState.text} onChange={(e) => setEditingState({...editingState, text: e.target.value})} className="flex-1 px-3 py-1 border border-gray-300 rounded-md bg-white dark:bg-gray-700"/>
                                <button onClick={onSaveEdit} className="p-2 text-green-500"><Save size={18}/></button>
                                <button onClick={onCancelEdit} className="p-2 text-red-500"><X size={18}/></button>
                            </div>
                        ) : (
                            <div className="flex items-center">
                                <div className="flex-1 text-gray-900 dark:text-gray-100">{note.text}</div>
                                <button onClick={() => onStartEdit('note', note)} className="ml-4 p-2 text-gray-400 hover:text-blue-500"><Edit size={16}/></button>
                                <button onClick={() => onRemoveNote(note.id)} className="p-2 text-gray-400 hover:text-red-500"><Trash2 size={16}/></button>
                            </div>
                        )}
                    </div>
                ))}
                {notes.length === 0 && (<div className="text-center py-8 text-gray-500 dark:text-gray-400">No notes yet. Add one to get started!</div>)}
            </div>
        </div>
    );
}