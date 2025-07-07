import { Calendar, CheckCircle, Target, Zap, BarChart2, Award, Timer, Brain, Star, TrendingUp } from 'lucide-react';
import type { Quote, ActiveTab, AchievementTrack } from './types';

export const QUOTES: Quote[] = [
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
    { text: "The secret of success is to do the common thing uncommonly well.", author: "John D. Rockefeller Jr." },
    { text: "I find that the harder I work, the more luck I seem to have.", author: "Thomas Jefferson" }
];

export const NAV_ITEMS: { key: ActiveTab; label: string; icon: React.ElementType }[] = [
    { key: 'dashboard', label: 'Dashboard', icon: Calendar },
    { key: 'tasks', label: 'Tasks', icon: CheckCircle },
    { key: 'goals', label: 'Goals', icon: Target },
    { key: 'habits', label: 'Habits', icon: Zap },
    { key: 'stats', label: 'Stats', icon: BarChart2 },
    { key: 'achievements', label: 'Achievements', icon: Award },
    { key: 'timer', label: 'Focus Timer', icon: Timer },
    { key: 'notes', label: 'Quick Notes', icon: Brain }
];

export const ACHIEVEMENT_TRACKS: AchievementTrack[] = [
    {
        id: 'task_completion',
        title: 'Task Master',
        icon: Star,
        unit: 'tasks',
        levels: [
            { level: 1, name: 'First Task', desc: 'Complete your first task', goal: 1 },
            { level: 2, name: 'Task Starter', desc: 'Complete 5 tasks', goal: 5 },
            { level: 3, name: 'Task Finisher', desc: 'Complete 10 tasks', goal: 10 },
            { level: 4, name: 'Productivity Pro', desc: 'Complete 25 tasks', goal: 25 },
            { level: 5, name: 'Execution Expert', desc: 'Complete 50 tasks', goal: 50 },
            { level: 6, name: 'Task Legend', desc: 'Complete 100 tasks', goal: 100 },
        ]
    },
    {
        id: 'focus_mastery',
        title: 'Deep Work',
        icon: Timer,
        unit: 'minutes',
        levels: [
            { level: 1, name: 'First Focus Session', desc: 'Log your first 25-minute focus session', goal: 25 },
            { level: 2, name: 'Focused Mind', desc: 'Log 5 hours (300 min) of focus', goal: 300 },
            { level: 3, name: 'Flow State', desc: 'Log 10 hours (600 min) of focus', goal: 600 },
            { level: 4, name: 'Zen Coder', desc: 'Log 25 hours (1500 min) of focus', goal: 1500 },
            { level: 5, name: 'Unwavering Concentration', desc: 'Log 50 hours (3000 min) of focus', goal: 3000 },
        ]
    },
    {
        id: 'habit_streak',
        title: 'Habit Hero',
        icon: TrendingUp,
        unit: 'day streak',
        levels: [
            { level: 1, name: 'Habit Starter', desc: 'Maintain a 3-day streak', goal: 3 },
            { level: 2, name: 'Consistent Performer', desc: 'Maintain a 7-day streak', goal: 7 },
            { level: 3, name: 'Streak Champion', desc: 'Maintain a 14-day streak', goal: 14 },
            { level: 4, name: 'Unstoppable Force', desc: 'Maintain a 30-day streak', goal: 30 },
            { level: 5, name: 'Lifestyle Integration', desc: 'Maintain a 60-day streak', goal: 60 },
        ]
    }
];
