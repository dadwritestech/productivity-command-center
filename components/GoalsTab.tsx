import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import type { Goal, EditingState } from '../types';

interface GoalsTabProps {
    goals: Goal[];
    editingState: EditingState;
    setEditingState: React.Dispatch<React.SetStateAction<EditingState>>;
    onAddGoal: (title: string) => void;
    onDeleteGoal: (id: number) => void;
    onUpdateProgress: (id: number, progress: number) => void;
    onStartEdit: (type: 'goal', item: Goal) => void;
    onCancelEdit: () => void;
    onSaveEdit: () => void;
}

export function GoalsTab({ goals, editingState, setEditingState, onAddGoal, onDeleteGoal, onUpdateProgress, onStartEdit, onCancelEdit, onSaveEdit }: GoalsTabProps) {
    const [newGoal, setNewGoal] = useState('');

    const handleAddGoal = () => {
        if (newGoal.trim()) {
            onAddGoal(newGoal);
            setNewGoal('');
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 animate-fade-in">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Goals & Progress</h2>
            <div className="space-y-6">
                {goals.map(goal => (
                    <div key={goal.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        {editingState.id === goal.id && editingState.type === 'goal' ? (
                            <div className="flex items-center gap-2 mb-3">
                                <input type="text" value={editingState.text} onChange={(e) => setEditingState({...editingState, text: e.target.value})} className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 dark:border-gray-600"/>
                                <button onClick={onSaveEdit} className="p-2 text-green-500 hover:bg-green-100 dark:hover:bg-green-800 rounded-full"><Save size={18}/></button>
                                <button onClick={onCancelEdit} className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-800 rounded-full"><X size={18}/></button>
                            </div>
                        ) : (
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="font-medium text-gray-900 dark:text-gray-100">{goal.title}</h3>
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{goal.progress}%</span>
                                    <button onClick={() => onStartEdit('goal', goal)} className="text-gray-400 hover:text-blue-500"><Edit size={16}/></button>
                                    <button onClick={() => onDeleteGoal(goal.id)} className="text-gray-400 hover:text-red-500"><Trash2 size={16}/></button>
                                </div>
                            </div>
                        )}
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-3">
                            <div className="bg-indigo-500 h-2.5 rounded-full" style={{ width: `${goal.progress}%` }}></div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <button onClick={() => onUpdateProgress(goal.id, goal.progress - 5)} className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 px-3 py-1 rounded-md text-sm hover:bg-gray-300 dark:hover:bg-gray-500 transition">-5%</button>
                                <button onClick={() => onUpdateProgress(goal.id, goal.progress + 5)} className="bg-green-500 text-white px-3 py-1 rounded-md text-sm hover:bg-green-600 transition">+5%</button>
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">{goal.progress === 100 ? '🎉 Complete!' : `${100 - goal.progress}% remaining`}</div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">Add New Goal</h3>
                <div className="flex gap-3">
                    <input type="text" value={newGoal} onChange={(e) => setNewGoal(e.target.value)} placeholder="Enter your goal..." className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700"/>
                    <button onClick={handleAddGoal} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center font-semibold transition"><Plus className="w-4 h-4 mr-1" />Add Goal</button>
                </div>
            </div>
        </div>
    );
}