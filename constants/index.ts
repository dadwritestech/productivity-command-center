
import { MotivationalQuote, AchievementDefinition } from '../types/index.ts';

export const MOTIVATIONAL_QUOTES: MotivationalQuote[] = [
  { text: "AI is a tool that amplifies human creativity and expertise.", author: "Tech Wisdom" },
  { text: "Your unique perspective is your greatest asset in the AI era.", author: "Career Coach" },
  { text: "Consistency beats perfection every time.", author: "Productivity Expert" },
  { text: "Small progress is still progress.", author: "Motivation Daily" },
  { text: "Focus on progress, not perfection.", author: "Growth Mindset" },
  { text: "Every expert was once a beginner.", author: "Learning Path" }
];

export const ACHIEVEMENT_DEFINITIONS: AchievementDefinition[] = [
  // Task Achievements
  { id: 'first_task', name: 'Getting Started', description: 'Complete your first task', icon: '🎯', category: 'tasks', condition: (stats) => stats.completedTasks >= 1 },
  { id: 'task_streak_5', name: 'Task Warrior', description: 'Complete 5 tasks', icon: '⚔️', category: 'tasks', condition: (stats) => stats.completedTasks >= 5 },
  { id: 'task_streak_25', name: 'Productivity Hero', description: 'Complete 25 tasks', icon: '🦸', category: 'tasks', condition: (stats) => stats.completedTasks >= 25 },
  { id: 'high_priority_hero', name: 'Priority Pro', description: 'Complete 10 high priority tasks', icon: '🔥', category: 'tasks', condition: (stats) => stats.highPriorityCompleted >= 10 },
  
  // Focus/Timer Achievements
  { id: 'first_focus', name: 'Focus Beginner', description: 'Complete your first focus session', icon: '🍅', category: 'focus', condition: (stats) => stats.focusSessions >= 1 },
  { id: 'focus_5', name: 'Focused Mind', description: 'Complete 5 focus sessions', icon: '🧠', category: 'focus', condition: (stats) => stats.focusSessions >= 5 },
  { id: 'deep_work', name: 'Deep Work Master', description: 'Complete 3 focus sessions in a row', icon: '🎯', category: 'focus', condition: (stats) => stats.consecutiveFocus >= 3 },
  
  // Goal Achievements
  { id: 'first_goal', name: 'Goal Setter', description: 'Create your first goal', icon: '🎯', category: 'goals', condition: (stats) => stats.totalGoals >= 1 },
  { id: 'goal_complete', name: 'Goal Crusher', description: 'Complete your first goal', icon: '✅', category: 'goals', condition: (stats) => stats.completedGoals >= 1 },
  
  // Habit Achievements
  { id: 'habit_streak_7', name: 'Week Warrior', description: 'Maintain a 7-day habit streak', icon: '📅', category: 'habits', condition: (stats) => stats.maxHabitStreak >= 7 },
  { id: 'perfect_day', name: 'Perfect Day', description: 'Complete all habits in one day', icon: '🌟', category: 'habits', condition: (stats) => stats.perfectHabitDays >= 1 },
  
  // Special Achievements
  { id: 'early_bird', name: 'Early Bird', description: 'Start a focus session before 8 AM', icon: '🌅', category: 'special', condition: (stats) => stats.earlyBirdSessions >= 1 },
  { id: 'night_owl', name: 'Night Owl', description: 'Start a focus session after 10 PM', icon: '🦉', category: 'special', condition: (stats) => stats.nightOwlSessions >= 1 },
  { id: 'productivity_master', name: 'Productivity Master', description: 'Achieve 90%+ productivity score', icon: '🏆', category: 'special', condition: (stats) => stats.highProductivityDays >= 1 }
];