
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  Plus, Clock, Target, CheckCircle, Circle, Play, Pause, RotateCcw, Calendar, 
  BookOpen, Zap, Brain, Timer, Edit2, Trash2, Moon, Sun, Download, Upload, 
  BarChart3, Award, Star, Trophy, Medal, TrendingUp, X,
  PieChart, Sparkles, Heart, Repeat
} from '../icons';
import { 
  Task, Goal, Habit, QuickNote, TimerSession, Settings as SettingsType, MotivationalQuote, Achievement, AchievementDefinition,
  Priority, EnergyLevel, TimerMode, ActiveTabKey
} from '../../types';
import { MOTIVATIONAL_QUOTES, ACHIEVEMENT_DEFINITIONS } from '../../constants';
import { Search } from '../icons';

export const ProductivityDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState<ActiveTabKey>(ActiveTabKey.Dashboard);
  const [darkMode, setDarkMode] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  
  // Tasks state
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: 'Review AI impact on technical writing industry', priority: Priority.High, completed: false, timeEstimate: 60, category: 'research', date: new Date().toISOString().split('T')[0], project: 'Career Development' },
    { id: 2, text: 'Update portfolio with recent projects', priority: Priority.Medium, completed: false, timeEstimate: 120, category: 'career', date: new Date().toISOString().split('T')[0], project: 'Portfolio' },
    { id: 3, text: 'Draft weekly content calendar', priority: Priority.High, completed: false, timeEstimate: 30, category: 'work', date: new Date().toISOString().split('T')[0], project: 'Content Strategy' }
  ]);
  
  // Goals state
  const [goals, setGoals] = useState<Goal[]>([
    { id: 1, title: 'Adapt skills for AI-augmented writing', progress: 20, target: 100, date: new Date().toISOString().split('T')[0], milestone: 'Learn 3 AI tools' },
    { id: 2, title: 'Build network in German tech industry', progress: 35, target: 100, date: new Date().toISOString().split('T')[0], milestone: 'Connect with 20 professionals' },
    { id: 3, title: 'Create 3 months emergency fund', progress: 60, target: 100, date: new Date().toISOString().split('T')[0], milestone: 'Save €5000' }
  ]);
  
  // Habits state
  const [habits, setHabits] = useState<Habit[]>([
    { id: 1, name: 'Morning planning (10 min)', completed: false, date: new Date().toISOString().split('T')[0], category: 'productivity', streak: 5, recurring: 'daily' },
    { id: 2, name: 'Learn new tech writing tool', completed: false, date: new Date().toISOString().split('T')[0], category: 'learning', streak: 3, recurring: 'daily' },
    { id: 3, name: 'Industry news reading', completed: true, date: new Date().toISOString().split('T')[0], category: 'professional', streak: 12, recurring: 'daily' },
    { id: 4, name: 'Evening reflection', completed: false, date: new Date().toISOString().split('T')[0], category: 'wellness', streak: 2, recurring: 'daily' }
  ]);
  
  // Timer state
  const [timerMinutes, setTimerMinutes] = useState(25);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerMode, setTimerMode] = useState<TimerMode>(TimerMode.Work);
  const [timerSessions, setTimerSessions] = useState<TimerSession[]>([]);
  const [customTimerLength, setCustomTimerLength] = useState(25);
  
  // Achievement state
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [newAchievements, setNewAchievements] = useState<Achievement[]>([]);
  
  // Quick notes state
  const [quickNotes, setQuickNotes] = useState<QuickNote[]>([
    { id: 1, text: 'Research German technical writing certification programs', date: new Date().toISOString().split('T')[0], category: 'career' },
    { id: 2, text: 'Follow up on freelance client proposal', date: new Date().toISOString().split('T')[0], category: 'work' },
    { id: 3, text: 'Update LinkedIn with AI collaboration skills', date: new Date().toISOString().split('T')[0], category: 'professional' }
  ]);
  
  // Settings state
  const [settings, setSettings] = useState<SettingsType>({
    notifications: true,
    autoStartBreaks: true,
    soundEnabled: true,
    dailyGoalTasks: 5,
    focusGoalSessions: 4,
    showMotivationalQuotes: true,
    preferredWorkLength: 25,
    preferredBreakLength: 5
  });
  
  // Productivity stats
  const [productivityScore, setProductivityScore] = useState(0);
  const [energyLevel, setEnergyLevel] = useState<EnergyLevel>(EnergyLevel.Medium);
  const [mostProductiveHours, setMostProductiveHours] = useState<number[]>([]);
  
  // Form inputs
  const [newTask, setNewTask] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<Priority>(Priority.Medium);
  const [newTaskEstimate, setNewTaskEstimate] = useState(30);
  const [newTaskDate, setNewTaskDate] = useState(new Date().toISOString().split('T')[0]);
  const [newTaskProject, setNewTaskProject] = useState('');
  
  const [newGoal, setNewGoal] = useState('');
  const [newGoalDate, setNewGoalDate] = useState(new Date().toISOString().split('T')[0]);
  const [newGoalMilestone, setNewGoalMilestone] = useState('');
  
  const [newHabit, setNewHabit] = useState('');
  const [newHabitCategory, setNewHabitCategory] = useState('productivity');
  const [newHabitRecurring, setNewHabitRecurring] = useState<'daily' | 'weekly'>('daily');
  
  const [newNote, setNewNote] = useState('');
  const [newNoteCategory, setNewNoteCategory] = useState('general');
  
  // Edit states
  const [editingTask, setEditingTask] = useState<number | null>(null);
  const [editingGoal, setEditingGoal] = useState<number | null>(null);
  const [editingHabit, setEditingHabit] = useState<number | null>(null);
  const [editingNote, setEditingNote] = useState<number | null>(null);
  
  // Search and filter
  const [searchQuery, setSearchQuery] = useState('');
  const [filterProject, setFilterProject] = useState('all');
  
  const [currentQuote, setCurrentQuote] = useState<MotivationalQuote>(MOTIVATIONAL_QUOTES[0]);
  
  // Update current time
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  
  // Rotate motivational quotes
  useEffect(() => {
    if (settings.showMotivationalQuotes) {
      const quoteTimer = setInterval(() => {
        const randomQuote = MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];
        setCurrentQuote(randomQuote);
      }, 30000); // Change every 30 seconds
      return () => clearInterval(quoteTimer);
    }
  }, [settings.showMotivationalQuotes, MOTIVATIONAL_QUOTES]);
  
  // Timer countdown
  useEffect(() => {
    let interval: number | null = null;
    if (isTimerRunning && (timerMinutes > 0 || timerSeconds > 0)) {
      interval = setInterval(() => {
        if (timerSeconds > 0) {
          setTimerSeconds(timerSeconds - 1);
        } else if (timerMinutes > 0) {
          setTimerMinutes(timerMinutes - 1);
          setTimerSeconds(59);
        }
      }, 1000);
    } else if (isTimerRunning && timerMinutes === 0 && timerSeconds === 0) {
      setIsTimerRunning(false);
      handleTimerComplete();
    }
    return () => {
      if(interval) clearInterval(interval)
    };
  }, [isTimerRunning, timerMinutes, timerSeconds]);
  
  // Handle timer completion
  const handleTimerComplete = () => {
    const sessionData: TimerSession = {
      date: new Date().toISOString().split('T')[0],
      type: timerMode,
      duration: timerMode === TimerMode.Work ? customTimerLength : settings.preferredBreakLength,
      timestamp: new Date().toISOString(),
      hour: new Date().getHours()
    };
    setTimerSessions(prev => [...prev, sessionData]);
    
    if (settings.notifications) {
      showNotification(
        timerMode === 'work' ? 'Work session complete!' : 'Break time over!',
        timerMode === 'work' ? 'Time for a break!' : 'Ready to focus again?'
      );
    }
    
    if (timerMode === TimerMode.Work) {
      setTimerMode(TimerMode.Break);
      setTimerMinutes(settings.preferredBreakLength);
      if (settings.autoStartBreaks) {
        setIsTimerRunning(true);
      }
    } else {
      setTimerMode(TimerMode.Work);
      setTimerMinutes(settings.preferredWorkLength);
    }
    setTimerSeconds(0);
  };
  
  const showNotification = (title: string, body: string) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, { body });
    }
  };
  
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);
  
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const todayTasks = tasks.filter(t => t.date === today);
    const completedTodayTasks = todayTasks.filter(t => t.completed);
    const todayHabits = habits.filter(h => h.date === today);
    const completedTodayHabits = todayHabits.filter(h => h.completed);
    const todaySessions = timerSessions.filter(s => s.date === today && s.type === 'work');
    
    const taskScore = todayTasks.length > 0 ? (completedTodayTasks.length / todayTasks.length) * 40 : 0;
    const habitScore = todayHabits.length > 0 ? (completedTodayHabits.length / todayHabits.length) * 30 : 0;
    const focusScore = Math.min((todaySessions.length / settings.focusGoalSessions) * 30, 30);
    
    setProductivityScore(Math.round(taskScore + habitScore + focusScore));
  }, [tasks, habits, timerSessions, settings.focusGoalSessions]);
  
  useEffect(() => {
    const hourCounts = timerSessions.reduce((acc, session) => {
      if (session.type === 'work') {
        acc[session.hour] = (acc[session.hour] || 0) + 1;
      }
      return acc;
    }, {} as Record<number, number>);
    
    const sortedHours = Object.entries(hourCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([hour]) => parseInt(hour));
    
    setMostProductiveHours(sortedHours);
  }, [timerSessions]);
  
  const getTaskSuggestions = useCallback(() => {
    const uncompleted = tasks.filter(t => !t.completed);
    
    if (energyLevel === EnergyLevel.High) {
      return uncompleted.filter(t => t.priority === Priority.High || t.timeEstimate > 60).slice(0, 3);
    } else if (energyLevel === EnergyLevel.Medium) {
      return uncompleted.filter(t => t.priority === Priority.Medium || (t.timeEstimate >= 30 && t.timeEstimate <= 60)).slice(0, 3);
    } else {
      return uncompleted.filter(t => t.priority === Priority.Low || t.timeEstimate < 30).slice(0, 3);
    }
  }, [tasks, energyLevel]);
  
  const addTask = () => {
    if (newTask.trim()) {
      const task: Task = {
        id: Date.now(),
        text: newTask,
        priority: newTaskPriority,
        completed: false,
        timeEstimate: newTaskEstimate,
        category: 'general',
        date: newTaskDate,
        project: newTaskProject || 'General'
      };
      setTasks([...tasks, task]);
      setNewTask('');
      setNewTaskProject('');
    }
  };
  
  const updateTask = (id: number, updates: Partial<Task>) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, ...updates } : task));
    setEditingTask(null);
  };
  
  const deleteTask = (id: number) => setTasks(tasks.filter(task => task.id !== id));
  
  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };
  
  const addGoal = () => {
    if (newGoal.trim()) {
      const goal: Goal = {
        id: Date.now(),
        title: newGoal,
        progress: 0,
        target: 100,
        date: newGoalDate,
        milestone: newGoalMilestone
      };
      setGoals([...goals, goal]);
      setNewGoal('');
      setNewGoalMilestone('');
    }
  };
  
  const updateGoal = (id: number, updates: Partial<Goal>) => {
    setGoals(goals.map(goal => goal.id === id ? { ...goal, ...updates } : goal));
    setEditingGoal(null);
  };
  
  const deleteGoal = (id: number) => setGoals(goals.filter(goal => goal.id !== id));
  
  const updateGoalProgress = (id: number, newProgress: number) => {
    setGoals(goals.map(goal =>
      goal.id === id ? { ...goal, progress: Math.max(0, Math.min(100, newProgress)) } : goal
    ));
  };
  
  const addHabit = () => {
    if (newHabit.trim()) {
      const habit: Habit = {
        id: Date.now(),
        name: newHabit,
        completed: false,
        date: new Date().toISOString().split('T')[0],
        category: newHabitCategory,
        streak: 0,
        recurring: newHabitRecurring
      };
      setHabits([...habits, habit]);
      setNewHabit('');
    }
  };

  const updateHabit = (id: number, updates: Partial<Habit>) => {
    setHabits(habits.map(habit => (habit.id === id ? { ...habit, ...updates } : habit)));
    setEditingHabit(null);
  };

  const deleteHabit = (id: number) => setHabits(habits.filter(habit => habit.id !== id));

  const toggleHabit = (id: number) => {
    setHabits(habits.map(habit => {
      if (habit.id === id) {
        const newCompleted = !habit.completed;
        const newStreak = newCompleted ? habit.streak + 1 : Math.max(0, habit.streak - 1);
        return { ...habit, completed: newCompleted, streak: newStreak };
      }
      return habit;
    }));
  };
  
  const addNote = () => {
    if (newNote.trim()) {
      const note: QuickNote = {
        id: Date.now(),
        text: newNote,
        date: new Date().toISOString().split('T')[0],
        category: newNoteCategory
      };
      setQuickNotes([...quickNotes, note]);
      setNewNote('');
    }
  };

  const updateNote = (id: number, updates: Partial<QuickNote>) => {
    setQuickNotes(quickNotes.map(note => (note.id === id ? { ...note, ...updates } : note)));
    setEditingNote(null);
  };

  const deleteNote = (id: number) => setQuickNotes(quickNotes.filter(note => note.id !== id));

  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimerMinutes(timerMode === 'work' ? settings.preferredWorkLength : settings.preferredBreakLength);
    setTimerSeconds(0);
  };

  const exportData = () => {
    const data = {
      tasks,
      goals,
      habits,
      quickNotes,
      timerSessions,
      achievements,
      settings,
      exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `productivity-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };
  
  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          if (data.tasks) setTasks(data.tasks);
          if (data.goals) setGoals(data.goals);
          if (data.habits) setHabits(data.habits);
          if (data.quickNotes) setQuickNotes(data.quickNotes);
          if (data.timerSessions) setTimerSessions(data.timerSessions);
          if (data.achievements) setAchievements(data.achievements);
          if (data.settings) setSettings(data.settings);
          alert('Data imported successfully!');
        } catch (error) {
          alert('Error importing data. Please check the file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  const calculateStats = () => {
    const today = new Date().toISOString().split('T')[0];
    const completedTasks = tasks.filter(task => task.completed);
    const highPriorityCompleted = completedTasks.filter(task => task.priority === 'high');
    const focusSessions = timerSessions.filter(session => session.type === 'work');
    
    let maxConsecutive = 0;
    let currentConsecutive = 0;
    timerSessions.forEach((session) => {
      if (session.type === 'work') {
        currentConsecutive++;
        maxConsecutive = Math.max(maxConsecutive, currentConsecutive);
      } else {
        currentConsecutive = 0;
      }
    });
    
    const completedGoals = goals.filter(goal => goal.progress >= 100);
    const maxHabitStreak = Math.max(...habits.map(h => h.streak), 0);
    
    const todayHabits = habits.filter(h => h.date === today);
    const perfectHabitDays = todayHabits.length > 0 && todayHabits.every(h => h.completed) ? 1 : 0;
    
    const earlyBirdSessions = timerSessions.filter(session => new Date(session.timestamp).getHours() < 8 && session.type === 'work');
    const nightOwlSessions = timerSessions.filter(session => new Date(session.timestamp).getHours() >= 22 && session.type === 'work');
    
    return {
      completedTasks: completedTasks.length,
      highPriorityCompleted: highPriorityCompleted.length,
      focusSessions: focusSessions.length,
      consecutiveFocus: maxConsecutive,
      totalGoals: goals.length,
      completedGoals: completedGoals.length,
      maxHabitStreak,
      perfectHabitDays,
      earlyBirdSessions: earlyBirdSessions.length,
      nightOwlSessions: nightOwlSessions.length,
      highProductivityDays: productivityScore >= 90 ? 1 : 0
    };
  };

  const checkAchievements = useCallback(() => {
    const stats = calculateStats();
    const newlyEarned: Achievement[] = [];
    
    ACHIEVEMENT_DEFINITIONS.forEach(achievementDef => {
      const alreadyEarned = achievements.some(earned => earned.id === achievementDef.id);
      if (!alreadyEarned && achievementDef.condition(stats)) {
        newlyEarned.push({
          ...achievementDef,
          earnedAt: new Date().toISOString()
        });
      }
    });
    
    if (newlyEarned.length > 0) {
      setAchievements(prev => [...prev, ...newlyEarned]);
      setNewAchievements(newlyEarned);
      setTimeout(() => setNewAchievements([]), 5000);
    }
  }, [achievements, tasks, goals, habits, timerSessions, productivityScore]);

  useEffect(() => {
    checkAchievements();
  }, [checkAchievements]);

  const getUniqueProjects = useMemo(() => ['all', ...new Set(tasks.map(task => task.project))], [tasks]);
  
  const filteredTasks = useMemo(() => {
    return tasks
      .filter(task => 
        searchQuery ? task.text.toLowerCase().includes(searchQuery.toLowerCase()) || task.project.toLowerCase().includes(searchQuery.toLowerCase()) : true
      )
      .filter(task => 
        filterProject !== 'all' ? task.project === filterProject : true
      );
  }, [tasks, searchQuery, filterProject]);

  const getHighPriorityTasks = () => tasks.filter(task => task.priority === 'high' && !task.completed);
  const getTodayHabits = () => habits.filter(habit => habit.date === new Date().toISOString().split('T')[0]);
  
  const getTimerStats = () => {
    const todayWorkSessions = timerSessions.filter(s => s.date === new Date().toISOString().split('T')[0] && s.type === 'work').length;
    return {
      todayWorkSessions,
      totalWorkSessions: timerSessions.filter(s => s.type === 'work').length,
    };
  };
  
  const formatTime = (date: Date) => date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const formatDate = (date: Date) => date.toLocaleDateString('de-DE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  
  const getAnalyticsData = () => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d.toISOString().split('T')[0];
    }).reverse();
    
    return {
      tasksByDay: last7Days.map(date => ({
        date,
        completed: tasks.filter(t => t.date === date && t.completed).length,
        total: tasks.filter(t => t.date === date).length
      })),
      sessionsByDay: last7Days.map(date => ({
        date,
        sessions: timerSessions.filter(s => s.date === date && s.type === 'work').length
      })),
      categoryBreakdown: tasks.reduce((acc, task) => {
        if (task.completed) acc[task.category] = (acc[task.category] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
    };
  };

  const themeClasses = darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100';
  const cardClasses = darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900';
  const textClasses = darkMode ? 'text-gray-300' : 'text-gray-600';
  const borderClasses = darkMode ? 'border-gray-700' : 'border-gray-200';

  return (
    <div className={`min-h-screen ${themeClasses} p-4`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className={`${cardClasses} rounded-lg shadow-lg p-6 mb-6`}>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Productivity Command Center
              </h1>
              <p className={`${textClasses} mt-1`}>{formatDate(currentTime)}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-3xl font-mono text-blue-600">{formatTime(currentTime)}</div>
                <div className="flex items-center space-x-2">
                  <Heart className={`w-4 h-4 ${productivityScore >= 80 ? 'text-red-500' : 'text-gray-400'}`} />
                  <span className={`text-sm ${textClasses}`}>Productivity Score: {productivityScore}%</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                  {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                <button onClick={() => setShowAnalytics(!showAnalytics)} className="p-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600 transition-colors" title="Analytics">
                  <BarChart3 className="w-5 h-5" />
                </button>
                <button onClick={exportData} className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors" title="Export Data">
                  <Download className="w-5 h-5" />
                </button>
                <label className="p-2 rounded-lg bg-green-500 text-white hover:bg-green-600 cursor-pointer transition-colors" title="Import Data">
                  <Upload className="w-5 h-5" />
                  <input type="file" accept=".json" onChange={importData} className="hidden" />
                </label>
              </div>
            </div>
          </div>
        </header>

        {/* Navigation */}
        <nav className={`${cardClasses} rounded-lg shadow-lg mb-6`}>
          <div className="flex border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
            {[
              { key: 'dashboard', label: 'Dashboard', icon: Calendar },
              { key: 'tasks', label: 'Tasks', icon: CheckCircle },
              { key: 'goals', label: 'Goals', icon: Target },
              { key: 'habits', label: 'Habits', icon: Zap },
              { key: 'timer', label: 'Focus Timer', icon: Timer },
              { key: 'notes', label: 'Quick Notes', icon: Brain },
              { key: 'achievements', label: 'Achievements', icon: Trophy }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as ActiveTabKey)}
                className={`flex items-center px-6 py-3 font-medium transition-all relative whitespace-nowrap ${
                  activeTab === key
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                    : `${textClasses} hover:text-gray-700 dark:hover:text-gray-300`
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {label}
                {key === 'achievements' && achievements.length > 0 && (
                  <span className="ml-2 bg-yellow-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {achievements.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* Achievement Notifications */}
        {newAchievements.length > 0 && (
          <div className="fixed top-4 right-4 z-50 space-y-2">
            {newAchievements.map((achievement) => (
              <div key={achievement.id} className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 rounded-lg shadow-lg transform transition-all duration-300 animate-bounce">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{achievement.icon}</span>
                  <div>
                    <div className="font-bold">Achievement Unlocked!</div>
                    <div className="text-sm">{achievement.name}</div>
                    <div className="text-xs opacity-90">{achievement.description}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Analytics Modal */}
        {showAnalytics && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
            <div className={`${cardClasses} rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto`}>
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Productivity Analytics</h2>
                  <button onClick={() => setShowAnalytics(false)} className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h3 className="font-semibold mb-3 flex items-center"><TrendingUp className="w-4 h-4 mr-2 text-green-500" />Task Completion (7 days)</h3>
                    <div className="space-y-2">
                      {getAnalyticsData().tasksByDay.map(day => (
                        <div key={day.date} className="flex items-center justify-between">
                          <span className="text-sm">{new Date(day.date + 'T00:00:00').toLocaleDateString('de-DE', { weekday: 'short' })}</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-32 bg-gray-200 dark:bg-gray-600 rounded-full h-2"><div className="bg-green-500 h-2 rounded-full" style={{ width: `${day.total > 0 ? (day.completed / day.total) * 100 : 0}%` }}></div></div>
                            <span className="text-xs">{day.completed}/{day.total}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h3 className="font-semibold mb-3 flex items-center"><Timer className="w-4 h-4 mr-2 text-orange-500" />Focus Sessions (7 days)</h3>
                    <div className="space-y-2">
                      {getAnalyticsData().sessionsByDay.map(day => (
                        <div key={day.date} className="flex items-center justify-between">
                          <span className="text-sm">{new Date(day.date + 'T00:00:00').toLocaleDateString('de-DE', { weekday: 'short' })}</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-32 bg-gray-200 dark:bg-gray-600 rounded-full h-2"><div className="bg-orange-500 h-2 rounded-full" style={{ width: `${(day.sessions / settings.focusGoalSessions) * 100}%` }}></div></div>
                            <span className="text-xs">{day.sessions} sessions</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h3 className="font-semibold mb-3 flex items-center"><Clock className="w-4 h-4 mr-2 text-blue-500" />Most Productive Hours</h3>
                    <div className="space-y-2">
                      {mostProductiveHours.length > 0 ? mostProductiveHours.map((hour, index) => (
                        <div key={hour} className="flex items-center justify-between">
                          <span className="text-sm">#{index + 1}</span><span className="font-medium">{hour}:00 - {hour + 1}:00</span>
                        </div>
                      )) : <p className="text-sm text-gray-500">Complete more focus sessions to see patterns</p>}
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h3 className="font-semibold mb-3 flex items-center"><PieChart className="w-4 h-4 mr-2 text-purple-500" />Task Categories</h3>
                    <div className="space-y-2">
                      {Object.entries(getAnalyticsData().categoryBreakdown).map(([category, count]) => (
                        <div key={category} className="flex items-center justify-between">
                          <span className="text-sm capitalize">{category}</span><span className="font-medium">{count} tasks</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <main>
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className={`${cardClasses} rounded-lg shadow-lg p-6`}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold flex items-center"><Sparkles className="w-5 h-5 mr-2 text-yellow-500" />Smart Task Suggestions</h3>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm ${textClasses}`}>Energy Level:</span>
                    <select value={energyLevel} onChange={(e) => setEnergyLevel(e.target.value as EnergyLevel)} className="px-3 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700">
                      <option value="low">Low 😴</option><option value="medium">Medium 😊</option><option value="high">High 🚀</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {getTaskSuggestions().map(task => (
                    <div key={task.id} className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <div className="flex items-start">
                        <button onClick={() => toggleTask(task.id)} className="mr-2 mt-1"><Circle className="w-4 h-4 text-blue-500" /></button>
                        <div>
                          <div className="text-sm font-medium">{task.text}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{task.timeEstimate} min • {task.priority} priority</div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {getTaskSuggestions().length === 0 && <div className="col-span-3 text-center text-gray-500">No tasks match your current energy level</div>}
                </div>
              </div>

              {settings.showMotivationalQuotes && (
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg p-6 text-white">
                  <div className="flex items-start">
                    <Star className="w-6 h-6 mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-lg italic">"{currentQuote.text}"</p>
                      <p className="text-sm opacity-75 mt-2">— {currentQuote.author}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className={`${cardClasses} rounded-lg shadow-lg p-6`}>
                  <h3 className="text-lg font-semibold mb-4 flex items-center"><Target className="w-5 h-5 mr-2 text-red-500" />High Priority Today</h3>
                  <div className="space-y-2">
                    {getHighPriorityTasks().slice(0, 3).map(task => (
                      <div key={task.id} className="flex items-center p-2 bg-red-50 dark:bg-red-900/20 rounded">
                        <button onClick={() => toggleTask(task.id)} className="mr-2 text-red-500"><Circle className="w-4 h-4" /></button>
                        <span className="text-sm flex-1">{task.text}</span><span className="text-xs text-gray-500">{task.timeEstimate}m</span>
                      </div>
                    ))}
                    {getHighPriorityTasks().length === 0 && <p className={`${textClasses} text-sm`}>No high priority tasks! 🎉</p>}
                  </div>
                </div>

                <div className={`${cardClasses} rounded-lg shadow-lg p-6`}>
                  <h3 className="text-lg font-semibold mb-4">Today's Progress</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className={`text-sm ${textClasses}`}>Tasks Completed</span>
                      <div className="flex items-center">
                        <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2"><div className="bg-green-500 h-2 rounded-full transition-all" style={{ width: `${tasks.length > 0 ? (tasks.filter(t=>t.completed).length / tasks.length) * 100 : 0}%` }}></div></div>
                        <span className="font-semibold text-green-600 text-sm">{tasks.filter(t=>t.completed).length}/{tasks.length}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className={`text-sm ${textClasses}`}>Habits Done</span>
                      <div className="flex items-center">
                        <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2"><div className="bg-blue-500 h-2 rounded-full transition-all" style={{ width: `${getTodayHabits().length > 0 ? (getTodayHabits().filter(h => h.completed).length / getTodayHabits().length) * 100 : 0}%` }}></div></div>
                        <span className="font-semibold text-blue-600 text-sm">{getTodayHabits().filter(h => h.completed).length}/{getTodayHabits().length}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className={`text-sm ${textClasses}`}>Focus Sessions</span>
                      <div className="flex items-center">
                        <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2"><div className="bg-purple-500 h-2 rounded-full transition-all" style={{ width: `${(getTimerStats().todayWorkSessions / settings.focusGoalSessions) * 100}%` }}></div></div>
                        <span className="font-semibold text-purple-600 text-sm">{getTimerStats().todayWorkSessions}/{settings.focusGoalSessions}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`${cardClasses} rounded-lg shadow-lg p-6`}>
                  <h3 className="text-lg font-semibold mb-4 flex items-center"><Timer className="w-5 h-5 mr-2 text-orange-500" />Quick Focus</h3>
                  <div className="text-center">
                    <div className="text-3xl font-mono mb-3">{String(timerMinutes).padStart(2, '0')}:{String(timerSeconds).padStart(2, '0')}</div>
                    <div className={`text-sm ${textClasses} mb-3`}>{timerMode === 'work' ? 'Work Session' : 'Break Time'}</div>
                    <div className="flex justify-center space-x-2">
                      <button onClick={() => setIsTimerRunning(!isTimerRunning)} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center">{isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}</button>
                      <button onClick={resetTimer} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"><RotateCcw className="w-4 h-4" /></button>
                    </div>
                  </div>
                </div>

                <div className={`${cardClasses} rounded-lg shadow-lg p-6`}>
                  <h3 className="text-lg font-semibold mb-4 flex items-center"><Zap className="w-5 h-5 mr-2 text-yellow-500" />Today's Habits</h3>
                  <div className="space-y-2">
                    {getTodayHabits().map(habit => (
                      <div key={habit.id} className="flex items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded transition-colors">
                        <button onClick={() => toggleHabit(habit.id)} className="mr-3">{habit.completed ? <CheckCircle className="w-5 h-5 text-green-500" /> : <Circle className="w-5 h-5 text-gray-400" />}</button>
                        <div className="flex-1">
                          <span className={`text-sm ${habit.completed ? 'line-through text-gray-500' : ''}`}>{habit.name}</span>
                          {habit.streak > 0 && <span className="ml-2 text-xs text-orange-500">🔥 {habit.streak} day streak</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`${cardClasses} rounded-lg shadow-lg p-6`}>
                  <h3 className="text-lg font-semibold mb-4 flex items-center"><Target className="w-5 h-5 mr-2 text-green-500" />Goal Progress</h3>
                  <div className="space-y-3">
                    {goals.slice(0, 3).map(goal => (
                      <div key={goal.id}>
                        <div className="flex justify-between items-center mb-1"><span className="text-sm font-medium truncate">{goal.title}</span><span className="text-xs text-gray-500">{goal.progress}%</span></div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div className={`h-2 rounded-full transition-all ${goal.progress >= 100 ? 'bg-green-500' : goal.progress >= 70 ? 'bg-blue-500' : goal.progress >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${goal.progress}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`${cardClasses} rounded-lg shadow-lg p-6`}>
                  <h3 className="text-lg font-semibold mb-4 flex items-center"><Award className="w-5 h-5 mr-2 text-yellow-500" />Recent Achievements</h3>
                  <div className="space-y-2">
                    {achievements.slice(-3).reverse().map(achievement => (
                      <div key={achievement.id} className="flex items-center p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                        <span className="text-xl mr-3">{achievement.icon}</span>
                        <div>
                          <div className="font-medium text-sm">{achievement.name}</div>
                          <div className={`text-xs ${textClasses}`}>{achievement.description}</div>
                        </div>
                      </div>
                    ))}
                    {achievements.length === 0 && <div className={`${textClasses} text-sm text-center py-4`}>Complete your first task to unlock achievements! 🏆</div>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tasks' && (
            <div className={`${cardClasses} rounded-lg shadow-lg p-6`}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Task Management</h2>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input type="text" placeholder="Search tasks..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800" />
                  </div>
                  <select value={filterProject} onChange={(e) => setFilterProject(e.target.value)} className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800">
                    {getUniqueProjects.map(project => <option key={project} value={project}>{project === 'all' ? 'All Projects' : project}</option>)}
                  </select>
                </div>
              </div>
              
              <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3">
                  <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="Add a new task..." className="lg:col-span-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800" onKeyPress={(e) => e.key === 'Enter' && addTask()} />
                  <input type="text" value={newTaskProject} onChange={(e) => setNewTaskProject(e.target.value)} placeholder="Project" className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800" />
                  <select value={newTaskPriority} onChange={(e) => setNewTaskPriority(e.target.value as Priority)} className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800">
                    <option value="low">Low Priority</option><option value="medium">Medium Priority</option><option value="high">High Priority</option>
                  </select>
                  <input type="date" value={newTaskDate} onChange={(e) => setNewTaskDate(e.target.value)} className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800" />
                  <button onClick={addTask} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center justify-center transition-colors"><Plus className="w-4 h-4 mr-1" />Add</button>
                </div>
              </div>

              <div className="space-y-3">
                {filteredTasks.map(task => (
                  <div key={task.id} className={`flex items-center p-4 border rounded-lg transition-all ${task.completed ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : `${borderClasses} hover:shadow-md`}`}>
                    <button onClick={() => toggleTask(task.id)} className="mr-3">{task.completed ? <CheckCircle className="w-5 h-5 text-green-500" /> : <Circle className="w-5 h-5 text-gray-400" />}</button>
                    <div className="flex-1">
                      {editingTask === task.id ? (
                        <input type="text" defaultValue={task.text} onBlur={(e) => updateTask(task.id, { text: e.target.value })} onKeyPress={(e) => e.key === 'Enter' && (e.target as HTMLInputElement).blur()} className="w-full px-2 py-1 border rounded bg-white dark:bg-gray-800" autoFocus />
                      ) : (
                        <div className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>{task.text}</div>
                      )}
                      <div className={`text-sm ${textClasses} mt-1 flex items-center space-x-3 flex-wrap`}>
                        <span className={`px-2 py-1 rounded text-xs ${task.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' : task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' : 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'}`}>{task.priority} priority</span>
                        <span className="flex items-center"><Clock className="w-3 h-3 mr-1" />{task.timeEstimate} min</span>
                        <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" />{new Date(task.date  + 'T00:00:00').toLocaleDateString('de-DE')}</span>
                        <span className="bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 px-2 py-1 rounded text-xs">{task.project}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button onClick={() => setEditingTask(editingTask === task.id ? null : task.id)} className="text-blue-500 hover:text-blue-700 transition-colors"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => deleteTask(task.id)} className="text-red-500 hover:text-red-700 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
                {filteredTasks.length === 0 && <div className="text-center py-8 text-gray-500">{searchQuery || filterProject !== 'all' ? 'No tasks match your filters' : 'No tasks yet. Add one to get started!'}</div>}
              </div>
            </div>
          )}

          {activeTab === 'goals' && (
            <div className={`${cardClasses} rounded-lg shadow-lg p-6`}>
              <h2 className="text-xl font-semibold mb-6">Goals & Progress</h2>
              <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <input type="text" value={newGoal} onChange={(e) => setNewGoal(e.target.value)} placeholder="Enter your goal..." className="md:col-span-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800" onKeyPress={(e) => e.key === 'Enter' && addGoal()} />
                  <input type="text" value={newGoalMilestone} onChange={(e) => setNewGoalMilestone(e.target.value)} placeholder="Milestone" className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800" />
                  <button onClick={addGoal} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center justify-center transition-colors"><Plus className="w-4 h-4 mr-1" />Add Goal</button>
                </div>
              </div>
              <div className="space-y-6">
                {goals.map(goal => (
                  <div key={goal.id} className={`p-4 border ${borderClasses} rounded-lg hover:shadow-md transition-all`}>
                    <div className="flex justify-between items-center mb-3">
                      {editingGoal === goal.id ? <input type="text" defaultValue={goal.title} onBlur={(e) => updateGoal(goal.id, { title: e.target.value })} onKeyPress={(e) => e.key === 'Enter' && (e.target as HTMLInputElement).blur()} className="flex-1 mr-3 px-2 py-1 border rounded bg-white dark:bg-gray-800" autoFocus /> : <h3 className="font-medium flex-1">{goal.title}</h3>}
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm font-semibold ${goal.progress >= 100 ? 'text-green-600' : goal.progress >= 70 ? 'text-blue-600' : goal.progress >= 40 ? 'text-yellow-600' : 'text-red-600'}`}>{goal.progress}%</span>
                        <button onClick={() => setEditingGoal(editingGoal === goal.id ? null : goal.id)} className="text-blue-500 hover:text-blue-700"><Edit2 className="w-4 h-4" /></button>
                        <button onClick={() => deleteGoal(goal.id)} className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                    {goal.milestone && <div className={`text-sm ${textClasses} mb-2 flex items-center`}><Target className="w-3 h-3 mr-1" />Milestone: {goal.milestone}</div>}
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-3"><div className={`h-3 rounded-full transition-all duration-500 ${goal.progress >= 100 ? 'bg-gradient-to-r from-green-400 to-green-600' : goal.progress >= 70 ? 'bg-gradient-to-r from-blue-400 to-blue-600' : goal.progress >= 40 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' : 'bg-gradient-to-r from-red-400 to-red-600'}`} style={{ width: `${goal.progress}%` }}></div></div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <button onClick={() => updateGoalProgress(goal.id, goal.progress - 10)} className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600">-10%</button>
                        <button onClick={() => updateGoalProgress(goal.id, goal.progress - 5)} className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600">-5%</button>
                        <button onClick={() => updateGoalProgress(goal.id, goal.progress + 5)} className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600">+5%</button>
                        <button onClick={() => updateGoalProgress(goal.id, goal.progress + 10)} className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">+10%</button>
                      </div>
                      <div className="text-right">
                        <div className={`text-xs ${textClasses}`}>{goal.progress === 100 ? '🎉 Complete!' : `${100 - goal.progress}% remaining`}</div>
                        <div className={`text-xs ${textClasses}`}>Target: {new Date(goal.date + 'T00:00:00').toLocaleDateString('de-DE')}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'habits' && (
            <div className={`${cardClasses} rounded-lg shadow-lg p-6`}>
              <h2 className="text-xl font-semibold mb-6">Daily Habits</h2>
              <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <input type="text" value={newHabit} onChange={(e) => setNewHabit(e.target.value)} placeholder="Add a new habit..." className="md:col-span-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800" onKeyPress={(e) => e.key === 'Enter' && addHabit()} />
                  <select value={newHabitCategory} onChange={(e) => setNewHabitCategory(e.target.value)} className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800">
                    <option value="productivity">Productivity</option><option value="learning">Learning</option><option value="professional">Professional</option><option value="wellness">Wellness</option><option value="personal">Personal</option>
                  </select>
                  <button onClick={addHabit} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center justify-center"><Plus className="w-4 h-4 mr-1" />Add Habit</button>
                </div>
              </div>
              <div className="space-y-3">
                {habits.map(habit => (
                  <div key={habit.id} className={`flex items-center p-4 border ${borderClasses} rounded-lg hover:shadow-md transition-all`}>
                    <button onClick={() => toggleHabit(habit.id)} className="mr-4">{habit.completed ? <CheckCircle className="w-6 h-6 text-green-500" /> : <Circle className="w-6 h-6 text-gray-400" />}</button>
                    <div className="flex-1">
                      {editingHabit === habit.id ? <input type="text" defaultValue={habit.name} onBlur={(e) => updateHabit(habit.id, { name: e.target.value })} onKeyPress={(e) => e.key === 'Enter' && (e.target as HTMLInputElement).blur()} className="w-full px-2 py-1 border rounded bg-white dark:bg-gray-800" autoFocus /> : 
                      <div>
                        <span className={`text-lg ${habit.completed ? 'line-through text-gray-500' : ''}`}>{habit.name}</span>
                        <div className={`text-sm ${textClasses} flex items-center space-x-3 mt-1`}>
                          <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs">{habit.category}</span>
                          {habit.streak > 0 && <span className="flex items-center text-orange-500"><Zap className="w-3 h-3 mr-1" />{habit.streak} day streak</span>}
                          <span className="flex items-center"><Repeat className="w-3 h-3 mr-1" />{habit.recurring}</span>
                        </div>
                      </div>}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button onClick={() => setEditingHabit(editingHabit === habit.id ? null : habit.id)} className="text-blue-500 hover:text-blue-700"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => deleteHabit(habit.id)} className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'timer' && (
            <div className={`${cardClasses} rounded-lg shadow-lg p-6`}>
              <h2 className="text-xl font-semibold mb-6">Focus Timer</h2>
              <div className="flex justify-center mb-6"><div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 inline-flex items-center space-x-4"><label className="text-sm">Work Duration:</label><input type="number" value={customTimerLength} onChange={(e) => setCustomTimerLength(Math.max(1, parseInt(e.target.value) || 25))} className="w-16 px-2 py-1 border rounded bg-white dark:bg-gray-800" min="1" max="60" /><span className="text-sm">minutes</span></div></div>
              <div className="text-center">
                <div className="relative inline-block"><div className="text-8xl font-mono mb-6">{String(timerMinutes).padStart(2, '0')}:{String(timerSeconds).padStart(2, '0')}</div>{isTimerRunning && <div className="absolute -top-2 -right-2"><div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div></div>}</div>
                <div className={`text-xl ${textClasses} mb-8`}>{timerMode === 'work' ? '💼 Work Session' : '☕ Break Time'}</div>
                <div className="flex justify-center space-x-4 mb-8">
                  <button onClick={() => setIsTimerRunning(!isTimerRunning)} className="bg-blue-500 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-600 flex items-center transition-all transform hover:scale-105">{isTimerRunning ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}{isTimerRunning ? 'Pause' : 'Start'}</button>
                  <button onClick={resetTimer} className="bg-gray-500 text-white px-8 py-3 rounded-lg text-lg hover:bg-gray-600 flex items-center transition-all transform hover:scale-105"><RotateCcw className="w-5 h-5 mr-2" />Reset</button>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-400 mb-2">🍅 Pomodoro Technique Tips</h4>
                  <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1 text-left">
                    <li>• Focus on one task for the entire session</li><li>• Take breaks seriously - step away from your desk</li><li>• After 4 work sessions, take a longer 15-30 min break</li><li>• Turn off notifications during work sessions</li>
                  </ul>
                </div>
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">Today's Sessions</h3>
                  <div className="max-h-40 overflow-y-auto space-y-2">
                    {timerSessions.filter(s => s.date === new Date().toISOString().split('T')[0]).reverse().map((session, index) => (
                      <div key={index} className={`flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700 rounded text-sm`}>
                        <span>{session.type === 'work' ? '🍅 Work' : '☕ Break'} session</span><span>{new Date(session.timestamp).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notes' && (
            <div className={`${cardClasses} rounded-lg shadow-lg p-6`}>
              <h2 className="text-xl font-semibold mb-6">Quick Notes</h2>
              <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <input type="text" value={newNote} onChange={(e) => setNewNote(e.target.value)} placeholder="Capture a quick thought..." className="md:col-span-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800" onKeyPress={(e) => e.key === 'Enter' && addNote()} />
                  <select value={newNoteCategory} onChange={(e) => setNewNoteCategory(e.target.value)} className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800">
                    <option value="general">General</option><option value="career">Career</option><option value="work">Work</option><option value="professional">Professional</option><option value="personal">Personal</option>
                  </select>
                  <button onClick={addNote} className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 flex items-center justify-center"><Plus className="w-4 h-4 mr-1" />Add Note</button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {quickNotes.map((note) => (
                  <div key={note.id} className="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg hover:shadow-md transition-all">
                    {editingNote === note.id ? <textarea defaultValue={note.text} onBlur={(e) => updateNote(note.id, { text: e.target.value })} className="w-full px-2 py-1 border rounded bg-white dark:bg-gray-800 resize-none" rows={3} autoFocus /> : 
                    <div>
                      <div className="mb-2">{note.text}</div>
                      <div className="flex items-center justify-between">
                        <div className={`text-xs ${textClasses}`}><span className="bg-purple-100 dark:bg-purple-800 px-2 py-1 rounded">{note.category}</span><span className="ml-2">{new Date(note.date + 'T00:00:00').toLocaleDateString('de-DE')}</span></div>
                        <div className="flex items-center space-x-2">
                          <button onClick={() => setEditingNote(editingNote === note.id ? null : note.id)} className="text-blue-500 hover:text-blue-700"><Edit2 className="w-4 h-4" /></button>
                          <button onClick={() => deleteNote(note.id)} className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </div>
                    </div>}
                  </div>
                ))}
                {quickNotes.length === 0 && <div className="col-span-full text-center py-8 text-gray-500">No notes yet. Add one to capture your thoughts!</div>}
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="space-y-6">
              <div className={`${cardClasses} rounded-lg shadow-lg p-6`}>
                <h2 className="text-xl font-semibold mb-4 flex items-center"><Trophy className="w-6 h-6 mr-2 text-yellow-500" />Achievement Collection</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg"><div className="text-3xl font-bold text-yellow-500">{achievements.length}</div><div className={`text-sm ${textClasses}`}>Total Earned</div></div>
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg"><div className="text-3xl font-bold text-blue-500">{ACHIEVEMENT_DEFINITIONS.length}</div><div className={`text-sm ${textClasses}`}>Total Available</div></div>
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg"><div className="text-3xl font-bold text-green-500">{Math.round((achievements.length / ACHIEVEMENT_DEFINITIONS.length) * 100)}%</div><div className={`text-sm ${textClasses}`}>Completion</div></div>
                  <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg"><div className="text-3xl font-bold text-purple-500">{achievements.filter(a => new Date(a.earnedAt).toDateString() === new Date().toDateString()).length}</div><div className={`text-sm ${textClasses}`}>Today</div></div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-4"><div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-4 rounded-full transition-all duration-500" style={{ width: `${(achievements.length / ACHIEVEMENT_DEFINITIONS.length) * 100}%` }}></div></div>
              </div>
              {Object.entries(ACHIEVEMENT_DEFINITIONS.reduce((acc, achievement) => {
                (acc[achievement.category] = acc[achievement.category] || []).push(achievement);
                return acc;
              }, {} as Record<string, AchievementDefinition[]>)).map(([category, categoryAchievements]) => (
                <div key={category} className={`${cardClasses} rounded-lg shadow-lg p-6`}>
                  <h3 className="text-lg font-semibold mb-4 capitalize flex items-center">
                    {category === 'tasks' && <CheckCircle className="w-5 h-5 mr-2 text-blue-500" />}
                    {category === 'focus' && <Timer className="w-5 h-5 mr-2 text-orange-500" />}
                    {category === 'goals' && <Target className="w-5 h-5 mr-2 text-green-500" />}
                    {category === 'habits' && <Zap className="w-5 h-5 mr-2 text-yellow-500" />}
                    {category === 'special' && <Star className="w-5 h-5 mr-2 text-pink-500" />}
                    {category} Achievements
                    <span className="ml-2 text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">{achievements.filter(a => a.category === category).length}/{categoryAchievements.length}</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categoryAchievements.map(achievementDef => {
                      const earned = achievements.find(a => a.id === achievementDef.id);
                      return (
                        <div key={achievementDef.id} className={`p-4 rounded-lg border-2 transition-all ${earned ? 'border-yellow-300 bg-yellow-50 dark:bg-yellow-900/20 shadow-md transform hover:scale-105' : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 opacity-60'}`}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-2xl">{achievementDef.icon}</span>
                            {earned && <Medal className="w-5 h-5 text-yellow-500" />}
                          </div>
                          <h4 className={`font-semibold ${earned ? '' : 'text-gray-500'}`}>{achievementDef.name}</h4>
                          <p className={`text-sm mt-1 ${earned ? textClasses : 'text-gray-400'}`}>{achievementDef.description}</p>
                          {earned && <p className="text-xs text-gray-500 mt-2">Earned: {new Date(earned.earnedAt).toLocaleDateString('de-DE')}</p>}
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
