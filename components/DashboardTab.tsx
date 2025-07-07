import React from 'react';
import { Target, Circle, CheckCircle, BarChart2, Zap as QuoteIcon } from 'lucide-react';
import type { Task, Habit, FocusLogEntry, Quote } from '../types';
import { getTodayString } from '../utils';

interface DashboardTabProps {
    tasks: Task[];
    habits: Habit[];
    focusLog: FocusLogEntry[];
    currentQuote: Quote;
    toggleTask: (id: number) => void;
}

export function DashboardTab({ tasks, habits, focusLog, currentQuote, toggleTask }: DashboardTabProps) {
    const highPriorityTasks = tasks.filter(t => t.priority === 'high' && !t.completed).slice(0, 3);
    const completedTasksCount = tasks.filter(t => t.completed).length;
    const completedHabitsToday = habits.filter(h => h.completions.includes(getTodayString())).length;
    const recentFocusLogs = [...focusLog].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0,3);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center"><Target className="w-5 h-5 mr-2 text-red-500" />High Priority Today</h3>
                <div className="space-y-2">
                    {highPriorityTasks.length > 0 ? highPriorityTasks.map(task => (
                        <div key={task.id} className="flex items-center p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
                            <button onClick={() => toggleTask(task.id)} className="mr-3 text-red-500 hover:text-red-700">
                                {task.completed ? <CheckCircle className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                            </button>
                            <span className="text-sm">{task.text}</span>
                        </div>
                    )) : (<p className="text-gray-500 dark:text-gray-400 text-sm">No high priority tasks! 🎉</p>)}
                </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Today's Progress</h3>
                <div className="space-y-4">
                    <div className="flex justify-between items-center"><span className="text-sm text-gray-600 dark:text-gray-400">Tasks Completed</span><span className="font-semibold text-green-600">{completedTasksCount}/{tasks.length}</span></div>
                    <div className="flex justify-between items-center"><span className="text-sm text-gray-600 dark:text-gray-400">Habits Done</span><span className="font-semibold text-blue-600">{completedHabitsToday}/{habits.length}</span></div>
                </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center"><BarChart2 className="w-5 h-5 mr-2 text-green-500" />Focus History</h3>
                <div className="space-y-2">
                    {recentFocusLogs.length > 0 ? recentFocusLogs.map(log => (
                        <div key={log.date} className="flex justify-between items-center p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            <span className="text-sm font-medium">{log.date}</span>
                            <span className="text-sm text-green-700 dark:text-green-300 font-semibold">{log.minutes} min</span>
                        </div>
                    )) : (<p className="text-gray-500 dark:text-gray-400 text-sm">No focus sessions logged yet.</p>)}
                </div>
            </div>
            <div className="md:col-span-2 lg:col-span-3 bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-800 dark:to-indigo-900 text-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold mb-2 flex items-center"><QuoteIcon className="w-5 h-5 mr-2"/>Quote of the Hour</h3>
                <p className="text-lg italic">"{currentQuote.text}"</p>
                <p className="text-right mt-2 font-medium">- {currentQuote.author}</p>
            </div>
        </div>
    );
}