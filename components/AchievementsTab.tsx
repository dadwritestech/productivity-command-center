import React from 'react';
import { Star } from 'lucide-react';
import type { Task, FocusLogEntry, Habit } from '../types';
import { getHabitStreak } from '../utils';
import { ACHIEVEMENT_TRACKS } from '../constants';

interface AchievementsTabProps {
    tasks: Task[];
    focusLog: FocusLogEntry[];
    habits: Habit[];
}

export function AchievementsTab({ tasks, focusLog, habits }: AchievementsTabProps) {
    const progressValues = {
        task_completion: tasks.filter(t => t.completed).length,
        focus_mastery: focusLog.reduce((acc, log) => acc + log.minutes, 0),
        habit_streak: Math.max(0, ...habits.map(h => getHabitStreak(h.completions))),
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 animate-fade-in">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Your Achievements</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {ACHIEVEMENT_TRACKS.map(track => {
                    const currentValue = progressValues[track.id as keyof typeof progressValues] || 0;
                    
                    const achievedLevels = track.levels.filter(level => currentValue >= level.goal);
                    const lastAchievedLevel = achievedLevels.length > 0 ? achievedLevels[achievedLevels.length - 1] : null;

                    const nextLevel = track.levels.find(level => currentValue < level.goal);
                    
                    const displayLevel = nextLevel || lastAchievedLevel;

                    if (!displayLevel) return null;

                    const prevLevelGoal = lastAchievedLevel ? lastAchievedLevel.goal : 0;
                    
                    const progressOnCurrentLevel = nextLevel
                        ? ((currentValue - prevLevelGoal) / (nextLevel.goal - prevLevelGoal)) * 100
                        : 100;

                    return (
                        <div key={track.id} className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg flex flex-col justify-between bg-gray-50 dark:bg-gray-800/50 transition-all hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-600">
                            <div>
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-center">
                                        <track.icon className="w-8 h-8 mr-3 text-yellow-500" />
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{track.title}</h3>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        {achievedLevels.map(lvl => (
                                            <Star key={lvl.level} size={16} className="text-yellow-400 fill-yellow-400" />
                                        ))}
                                        {Array.from({ length: track.levels.length - achievedLevels.length }).map((_, i) => (
                                             <Star key={i} size={16} className="text-gray-300 dark:text-gray-600" />
                                        ))}
                                    </div>
                                </div>

                                <h4 className="font-semibold text-gray-800 dark:text-gray-200">{displayLevel.name}</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-4 min-h-[40px]">{displayLevel.desc}</p>
                            </div>
                            
                            <div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-2">
                                    <div className="bg-yellow-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progressOnCurrentLevel}%` }}></div>
                                </div>
                                <p className="text-right text-sm font-medium text-gray-600 dark:text-gray-300">
                                    {nextLevel ? `${currentValue} / ${nextLevel.goal}` : 'All levels completed!'}
                                    <span className="ml-1">{track.unit}</span>
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}