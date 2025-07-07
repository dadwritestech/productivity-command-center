export type Priority = 'low' | 'medium' | 'high';
export type Theme = 'light' | 'dark';
export type ActiveTab = 'dashboard' | 'tasks' | 'goals' | 'habits' | 'stats' | 'achievements' | 'timer' | 'notes';

export interface Task {
  id: number;
  text: string;
  priority: Priority;
  completed: boolean;
  timeEstimate: number;
  dueDate: string;
  tags: string[];
  completionDate: string | null;
}

export interface Goal {
  id: number;
  title: string;
  progress: number;
  target: number;
}

export interface Habit {
  id: number;
  name: string;
  completions: string[];
}

export interface QuickNote {
  id: number;
  text: string;
}

export interface FocusLogEntry {
  date: string;
  minutes: number;
}

export interface Quote {
  text: string;
  author: string;
}

export interface EditingState {
  id: number | null;
  type: 'task' | 'goal' | 'habit' | 'note' | '';
  text: string;
}

export interface AchievementLevel {
    level: number;
    name: string;
    desc: string;
    goal: number;
}

export interface AchievementTrack {
    id: string;
    title: string;
    icon: React.ElementType;
    unit: string;
    levels: AchievementLevel[];
}
