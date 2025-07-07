import React, { useMemo } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { Task, FocusLogEntry, Theme } from '../types';
import { getDateString, getStartOfWeek } from '../utils';

interface StatsTabProps {
    tasks: Task[];
    focusLog: FocusLogEntry[];
    theme: Theme;
}

export function StatsTab({ tasks, focusLog, theme }: StatsTabProps) {
    const tasksByWeekData = useMemo(() => {
        const weeks: { [key: string]: number } = {};
        tasks.filter(t => t.completed && t.completionDate).forEach(task => {
            const weekStart = getDateString(getStartOfWeek(new Date(task.completionDate!)));
            weeks[weekStart] = (weeks[weekStart] || 0) + 1;
        });
        return Object.keys(weeks).map(week => ({ week, tasks: weeks[week] })).sort((a,b) => new Date(a.week).getTime() - new Date(b.week).getTime());
    }, [tasks]);

    const focusByDayData = useMemo(() => {
        return [...focusLog].sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }, [focusLog]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tasks Completed per Week</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={tasksByWeekData}>
                        <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#4A5568' : '#E2E8F0'}/>
                        <XAxis dataKey="week" stroke={theme === 'dark' ? '#A0AEC0' : '#4A5568'}/>
                        <YAxis stroke={theme === 'dark' ? '#A0AEC0' : '#4A5568'}/>
                        <Tooltip contentStyle={{ backgroundColor: theme === 'dark' ? '#2D3748' : '#FFFFFF', border: 'none' }}/>
                        <Legend />
                        <Bar dataKey="tasks" fill="#818cf8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Daily Focus Minutes</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={focusByDayData}>
                        <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#4A5568' : '#E2E8F0'}/>
                        <XAxis dataKey="date" stroke={theme === 'dark' ? '#A0AEC0' : '#4A5568'}/>
                        <YAxis stroke={theme === 'dark' ? '#A0AEC0' : '#4A5568'}/>
                        <Tooltip contentStyle={{ backgroundColor: theme === 'dark' ? '#2D3748' : '#FFFFFF', border: 'none' }}/>
                        <Legend />
                        <Line type="monotone" dataKey="minutes" stroke="#82ca9d" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}