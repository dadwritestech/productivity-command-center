import React, { useState, useMemo } from 'react';
import { Plus, Clock, Edit, Trash2, Save, X, Circle, CheckCircle } from 'lucide-react';
import type { Task, Priority, EditingState } from '../types';

interface TasksTabProps {
    tasks: Task[];
    editingState: EditingState;
    setEditingState: React.Dispatch<React.SetStateAction<EditingState>>;
    onAddTask: (text: string, priority: Priority, timeEstimate: number, tags: string[], dueDate: string) => void;
    onDeleteTask: (id: number) => void;
    onToggleTask: (id: number) => void;
    onStartEdit: (type: 'task', item: Task) => void;
    onCancelEdit: () => void;
    onSaveEdit: () => void;
}

export function TasksTab({ tasks, editingState, setEditingState, onAddTask, onDeleteTask, onToggleTask, onStartEdit, onCancelEdit, onSaveEdit }: TasksTabProps) {
    const [newTask, setNewTask] = useState('');
    const [newTaskPriority, setNewTaskPriority] = useState<Priority>('medium');
    const [newTaskEstimate, setNewTaskEstimate] = useState(30);
    const [newTaskTags, setNewTaskTags] = useState('');
    const [newTaskDate, setNewTaskDate] = useState(new Date().toISOString().split('T')[0]);
    const [taskTagFilter, setTaskTagFilter] = useState('all');

    const allTags = useMemo(() => ['all', ...new Set(tasks.flatMap(t => t.tags))], [tasks]);
    const filteredTasks = useMemo(() => taskTagFilter === 'all' ? tasks : tasks.filter(t => t.tags.includes(taskTagFilter)), [tasks, taskTagFilter]);

    const handleAddTask = () => {
        if (newTask.trim()) {
            const tags = newTaskTags.split(',').map(tag => tag.trim()).filter(Boolean);
            onAddTask(newTask, newTaskPriority, newTaskEstimate, tags, newTaskDate);
            setNewTask('');
            setNewTaskTags('');
        }
    };
    
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 animate-fade-in">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Task Management</h2>
            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 items-end">
                    <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="Add a new task..." className="sm:col-span-2 md:col-span-1 flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700"/>
                    <input type="text" value={newTaskTags} onChange={(e) => setNewTaskTags(e.target.value)} placeholder="Tags (comma-separated)" className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700"/>
                    <div className="flex gap-3">
                        <select value={newTaskPriority} onChange={(e) => setNewTaskPriority(e.target.value as Priority)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700"><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option></select>
                        <input type="number" value={newTaskEstimate} onChange={(e) => setNewTaskEstimate(parseInt(e.target.value))} placeholder="Mins" className="w-24 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700"/>
                    </div>
                    <button onClick={handleAddTask} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center justify-center font-semibold transition"><Plus className="w-4 h-4 mr-1" />Add</button>
                </div>
            </div>
            <div className="mb-4 flex items-center gap-2 overflow-x-auto pb-2">
                {allTags.map(tag => <button key={tag} onClick={() => setTaskTagFilter(tag)} className={`px-3 py-1 text-sm rounded-full whitespace-nowrap ${taskTagFilter === tag ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'}`}>{tag}</button>)}
            </div>
            <div className="space-y-3">
                {filteredTasks.map(task => (
                    <div key={task.id} className={`p-4 border rounded-lg transition-colors ${task.completed ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/[0.5]'}`}>
                        {editingState.id === task.id && editingState.type === 'task' ? (
                            <div className="flex items-center gap-2"><input type="text" value={editingState.text} onChange={(e) => setEditingState({...editingState, text: e.target.value})} className="flex-1 px-3 py-1 border border-gray-300 rounded-md bg-white dark:bg-gray-700"/><button onClick={onSaveEdit} className="p-2 text-green-500"><Save size={18}/></button><button onClick={onCancelEdit} className="p-2 text-red-500"><X size={18}/></button></div>
                        ) : (
                            <div className="flex items-center">
                                <button onClick={() => onToggleTask(task.id)} className="mr-4">{task.completed ? <CheckCircle className="w-6 h-6 text-green-500" /> : <Circle className="w-6 h-6 text-gray-400 dark:text-gray-500" />}</button>
                                <div className="flex-1">
                                    <div className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900 dark:text-gray-100'}`}>{task.text}</div>
                                    <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-400 mt-1">
                                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${task.priority === 'high' ? 'bg-red-100 text-red-800' : task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>{task.priority}</span>
                                        <span className="flex items-center"><Clock className="w-4 h-4 mr-1" />{task.timeEstimate} min</span>
                                        <div className="flex items-center gap-1">{task.tags.map(tag => <span key={tag} className="text-xs bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded">{tag}</span>)}</div>
                                    </div>
                                </div>
                                <button onClick={() => onStartEdit('task', task)} className="ml-4 p-2 text-gray-400 hover:text-blue-500"><Edit size={16}/></button>
                                <button onClick={() => onDeleteTask(task.id)} className="p-2 text-gray-400 hover:text-red-500"><Trash2 size={16}/></button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}