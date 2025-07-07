
export enum Priority {
  High = 'high',
  Medium = 'medium',
  Low = 'low',
}

export enum EnergyLevel {
  Low = 'low',
  Medium = 'medium',
  High = 'high',
}

export enum TimerMode {
  Work = 'work',
  Break = 'break',
}

export enum ActiveTabKey {
  Dashboard = 'dashboard',
  Tasks = 'tasks',
  Goals = 'goals',
  Habits = 'habits',
  Timer = 'timer',
  Notes = 'notes',
  Achievements = 'achievements',
}

export interface Task {
  id: number;
  text: string;
  priority: Priority;
  completed: boolean;
  timeEstimate: number;
  category: string;
  date: string;
  project: string;
}

export interface Goal {
  id: number;
  title: string;
  progress: number;
  target: number;
  date: string;
  milestone: string;
}

export interface Habit {
  id: number;
  name: string;
  completed: boolean;
  date: string;
  category: string;
  streak: number;
  recurring: 'daily' | 'weekly';
}

export interface QuickNote {
  id: number;
  text: string;
  date: string;
  category: string;
}

export interface TimerSession {
  date: string;
  type: TimerMode;
  duration: number;
  timestamp: string;
  hour: number;
}

export interface Settings {
  notifications: boolean;
  autoStartBreaks: boolean;
  soundEnabled: boolean;
  dailyGoalTasks: number;
  focusGoalSessions: number;
  showMotivationalQuotes: boolean;
  preferredWorkLength: number;
  preferredBreakLength: number;
}

export interface MotivationalQuote {
  text: string;
  author: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  earnedAt: string;
}

export interface AchievementDefinition extends Omit<Achievement, 'earnedAt'> {
  condition: (stats: any) => boolean;
}
