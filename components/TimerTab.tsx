import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import type { FocusLogEntry } from '../types';
import { getTodayString } from '../utils';

interface TimerTabProps {
    setFocusLog: React.Dispatch<React.SetStateAction<FocusLogEntry[]>>;
}

export function TimerTab({ setFocusLog }: TimerTabProps) {
    const [timerMinutes, setTimerMinutes] = useState(25);
    const [timerSeconds, setTimerSeconds] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [timerMode, setTimerMode] = useState<'work' | 'break'>('work');

    useEffect(() => {
        let interval: number | undefined = undefined;
        if (isTimerRunning && (timerMinutes > 0 || timerSeconds > 0)) {
            interval = window.setInterval(() => {
                if (timerSeconds > 0) {
                    setTimerSeconds(s => s - 1);
                } else {
                    setTimerMinutes(m => m - 1);
                    setTimerSeconds(59);
                }
            }, 1000);
        } else if (isTimerRunning && timerMinutes === 0 && timerSeconds === 0) {
            setIsTimerRunning(false);
            if (timerMode === 'work') {
                setFocusLog(prevLog => {
                    const today = getTodayString();
                    const existingEntry = prevLog.find(entry => entry.date === today);
                    if (existingEntry) {
                        return prevLog.map(e => e.date === today ? { ...e, minutes: e.minutes + 25 } : e);
                    } else {
                        return [...prevLog, { date: today, minutes: 25 }];
                    }
                });
                setTimerMode('break');
                setTimerMinutes(5);
            } else {
                setTimerMode('work');
                setTimerMinutes(25);
            }
            setTimerSeconds(0);
        }
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isTimerRunning, timerMinutes, timerSeconds, timerMode, setFocusLog]);

    const resetTimer = () => {
        setIsTimerRunning(false);
        setTimerMinutes(timerMode === 'work' ? 25 : 5);
        setTimerSeconds(0);
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 animate-fade-in">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">Focus Timer</h2>
            <div className="flex flex-col items-center">
                <div className="text-8xl font-mono text-gray-900 dark:text-white mb-4">{String(timerMinutes).padStart(2, '0')}:{String(timerSeconds).padStart(2, '0')}</div>
                <div className="text-xl text-gray-600 dark:text-gray-400 mb-8 font-semibold">{timerMode === 'work' ? 'Work Session' : 'Break Time'}</div>
                <div className="flex justify-center space-x-4 mb-8">
                    <button onClick={() => setIsTimerRunning(!isTimerRunning)} className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-indigo-700 flex items-center font-semibold transition-transform transform hover:scale-105">
                        {isTimerRunning ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
                        {isTimerRunning ? 'Pause' : 'Start'}
                    </button>
                    <button onClick={resetTimer} className="bg-gray-500 text-white px-8 py-3 rounded-lg text-lg hover:bg-gray-600 flex items-center font-semibold transition-transform transform hover:scale-105">
                        <RotateCcw className="w-5 h-5 mr-2" />Reset
                    </button>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-xs">Focus for 25 minutes, then take a 5-minute break. Repeat to maintain productivity!</div>
            </div>
        </div>
    );
}
