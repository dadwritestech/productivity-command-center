import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X, Circle, CheckCircle, TrendingUp } from 'lucide-react';
import type { Habit, EditingState } from '../types';
import { getTodayString, getHabitStreak } from '../utils';

interface HabitsTabProps {
    habits: Habit[];
    editingState: EditingState;
    setEditingState: React.Dispatch<React.SetStateAction<EditingState>>;
    onAddHabit: (name: string) => void;
    onDeleteHabit: (id: number) => void;
    onToggleHabit: (id: number) => void;
    onStartEdit: (type: 'habit', item: Habit) => void;
    onCancelEdit: () => void;
    onSaveEdit: () => void;
}

export function HabitsTab({ habits, editingState, setEditingState, onAddHabit, onDeleteHabit, onToggleHabit, onStartEdit, onCancelEdit, onSaveEdit }: HabitsTabProps) {
    const [newHabit, setNewHabit] = useState('');
    const today = getTodayString();

    const handleAddHabit = () => {
        if (newHabit.trim()) {
            onAddHabit(newHabit);
            setNewHabit('');
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 animate-fade-in">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Daily Habits</h2>
            <div className="space-y-3">
                {habits.map(habit => {
                    const isCompletedToday = habit.completions.includes(today);
                    const streak = getHabitStreak(habit.completions);
                    return (
                        <div key={habit.id} className={`p-4 border rounded-lg transition-colors ${isCompletedToday ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/[0.5]'}`}>
                            {editingState.id === habit.id && editingState.type === 'habit' ? (
                                <div className="flex items-center gap-2">
                                    <input type="text" value={editingState.text} onChange={(e) => setEditingState({...editingState, text: e.target.value})} className="flex-1 px-3 py-1 border border-gray-300 rounded-md bg-white dark:bg-gray-700"/>
                                    <button onClick={onSaveEdit} className="p-2 text-green-500"><Save size={18}/></button>
                                    <button onClick={onCancelEdit} className="p-2 text-red-500"><X size={18}/></button>
                                </div>
                            ) : (
                                <div className="flex items-center">
                                    <button onClick={() => onToggleHabit(habit.id)} className="mr-4">{isCompletedToday ? <CheckCircle className="w-6 h-6 text-green-500" /> : <Circle className="w-6 h-6 text-gray-400 dark:text-gray-500" />}</button>
                                    <span className={`flex-1 text-lg font-medium ${isCompletedToday ? 'line-through text-gray-500' : 'text-gray-900 dark:text-gray-100'}`}>{habit.name}</span>
                                    {streak > 0 && <div className="ml-4 flex items-center text-sm font-semibold text-orange-500"><TrendingUp size={16} className="mr-1"/>{streak}-day streak</div>}
                                    <button onClick={() => onStartEdit('habit', habit)} className="ml-4 p-2 text-gray-400 hover:text-blue-500"><Edit size={16}/></button>
                                    <button onClick={() => onDeleteHabit(habit.id)} className="p-2 text-gray-400 hover:text-red-500"><Trash2 size={16}/></button>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
            <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">Add New Habit</h3>
                <div className="flex gap-3">
                    <input type="text" value={newHabit} onChange={(e) => setNewHabit(e.target.value)} placeholder="Enter a new habit..." className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700"/>
                    <button onClick={handleAddHabit} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center font-semibold transition"><Plus className="w-4 h-4 mr-1" />Add Habit</button>
                </div>
            </div>
        </div>
    );
}