import React, { useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { Task, Goal, Habit, QuickNote, FocusLogEntry, Theme, ActiveTab, EditingState, Priority, Quote } from './types';
import { QUOTES } from './constants';
import { getTodayString } from './utils';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { DashboardTab } from './components/DashboardTab';
import { TasksTab } from './components/TasksTab';
import { GoalsTab } from './components/GoalsTab';
import { HabitsTab } from './components/HabitsTab';
import { NotesTab } from './components/NotesTab';
import { StatsTab } from './components/StatsTab';
import { AchievementsTab } from './components/AchievementsTab';
import { TimerTab } from './components/TimerTab';

export default function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentQuote, setCurrentQuote] = useState<Quote>(QUOTES[0]);
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  
  const [theme, setTheme] = useLocalStorage<Theme>('theme', 'light');
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', [
    { id: 1, text: 'Review AI impact on technical writing industry', priority: 'high', completed: false, timeEstimate: 60, dueDate: '2025-07-08', tags: ['research', 'work'], completionDate: null },
    { id: 2, text: 'Update portfolio with recent projects', priority: 'medium', completed: true, timeEstimate: 120, dueDate: '2025-07-01', tags: ['career'], completionDate: '2025-07-02' },
  ]);
  const [goals, setGoals] = useLocalStorage<Goal[]>('goals', [{ id: 1, title: 'Adapt skills for AI-augmented writing', progress: 20, target: 100 }]);
  const [habits, setHabits] = useLocalStorage<Habit[]>('habits', [{ id: 1, name: 'Morning planning (10 min)', completions: ['2025-07-05', '2025-07-06'] }]);
  const [quickNotes, setQuickNotes] = useLocalStorage<QuickNote[]>('quickNotes', [{ id: 1, text: 'Research German technical writing certification programs' }]);
  const [focusLog, setFocusLog] = useLocalStorage<FocusLogEntry[]>('focusLog', [{ date: '2025-07-05', minutes: 50 }, { date: '2025-07-06', minutes: 75 }]);
  
  const [editingState, setEditingState] = useState<EditingState>({ id: null, type: '', text: '' });

  useEffect(() => {
    const timeTimer = setInterval(() => setCurrentTime(new Date()), 1000);
    const quoteTimer = setInterval(() => setCurrentQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]), 15000);
    return () => { clearInterval(timeTimer); clearInterval(quoteTimer); };
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const handleExportData = useCallback(() => {
    const dataToExport = JSON.stringify({ tasks, goals, habits, quickNotes, focusLog, theme });
    const blob = new Blob([dataToExport], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `productivity-dashboard-backup-${getTodayString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [tasks, goals, habits, quickNotes, focusLog, theme]);

  const handleImportData = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const result = e.target?.result;
          if (typeof result !== 'string') return;
          const importedData = JSON.parse(result);
          if (importedData.tasks && importedData.goals) {
            setTasks(importedData.tasks);
            setGoals(importedData.goals);
            setHabits(importedData.habits || []);
            setQuickNotes(importedData.quickNotes || []);
            setFocusLog(importedData.focusLog || []);
            setTheme(importedData.theme || 'light');
            alert('Data imported successfully!');
          } else { alert('Invalid data file.'); }
        } catch (error) { alert('Error reading file.'); }
      };
      reader.readAsText(file);
    }
  }, [setTasks, setGoals, setHabits, setQuickNotes, setFocusLog, setTheme]);

  // CRUD Handlers
  const startEditing = (type: EditingState['type'], item: Task | Goal | Habit | QuickNote) => {
    setEditingState({ id: item.id, type, text: 'title' in item ? item.title : 'name' in item ? item.name : item.text || '' });
  };
  const cancelEditing = () => setEditingState({ id: null, type: '', text: '' });
  
  const saveEdit = useCallback(() => {
    const { id, type, text } = editingState;
    if (!text.trim() || !id) return;

    const key = type === 'goal' ? 'title' : (type === 'habit' ? 'name' : 'text');
    
    switch (type) {
      case 'task': setTasks(p => p.map(i => i.id === id ? { ...i, [key]: text } : i)); break;
      case 'goal': setGoals(p => p.map(i => i.id === id ? { ...i, [key]: text } : i)); break;
      case 'habit': setHabits(p => p.map(i => i.id === id ? { ...i, [key]: text } : i)); break;
      case 'note': setQuickNotes(p => p.map(i => i.id === id ? { ...i, [key]: text } : i)); break;
    }
    cancelEditing();
  }, [editingState, setTasks, setGoals, setHabits, setQuickNotes]);

  const addTask = useCallback((text: string, priority: Priority, timeEstimate: number, tags: string[], dueDate: string) => {
    setTasks(prev => [{ id: Date.now(), text, priority, completed: false, timeEstimate, dueDate, tags, completionDate: null }, ...prev]);
  }, [setTasks]);
  const deleteTask = useCallback((id: number) => setTasks(prev => prev.filter(t => t.id !== id)), [setTasks]);
  const toggleTask = useCallback((id: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed, completionDate: t.completed ? null : getTodayString() } : t));
  }, [setTasks]);

  const addGoal = useCallback((title: string) => setGoals(prev => [...prev, { id: Date.now(), title, progress: 0, target: 100 }]), [setGoals]);
  const deleteGoal = useCallback((id: number) => setGoals(prev => prev.filter(g => g.id !== id)), [setGoals]);
  const updateGoalProgress = useCallback((id: number, progress: number) => {
    setGoals(prev => prev.map(g => g.id === id ? { ...g, progress: Math.max(0, Math.min(100, progress)) } : g));
  }, [setGoals]);

  const addHabit = useCallback((name: string) => setHabits(prev => [...prev, { id: Date.now(), name, completions: [] }]), [setHabits]);
  const deleteHabit = useCallback((id: number) => setHabits(prev => prev.filter(h => h.id !== id)), [setHabits]);
  const toggleHabit = useCallback((id: number) => {
    const today = getTodayString();
    setHabits(prev => prev.map(h => h.id === id ? { ...h, completions: h.completions.includes(today) ? h.completions.filter(c => c !== today) : [...h.completions, today] } : h));
  }, [setHabits]);

  const addNote = useCallback((text: string) => setQuickNotes(prev => [{ id: Date.now(), text }, ...prev]), [setQuickNotes]);
  const removeNote = useCallback((id: number) => setQuickNotes(prev => prev.filter(n => n.id !== id)), [setQuickNotes]);

  const renderActiveTab = () => {
    switch(activeTab) {
      case 'dashboard': return <DashboardTab tasks={tasks} habits={habits} focusLog={focusLog} currentQuote={currentQuote} toggleTask={toggleTask} />;
      case 'tasks': return <TasksTab tasks={tasks} editingState={editingState} onAddTask={addTask} onDeleteTask={deleteTask} onToggleTask={toggleTask} onStartEdit={startEditing} onCancelEdit={cancelEditing} onSaveEdit={saveEdit} setEditingState={setEditingState} />;
      case 'goals': return <GoalsTab goals={goals} editingState={editingState} onAddGoal={addGoal} onDeleteGoal={deleteGoal} onUpdateProgress={updateGoalProgress} onStartEdit={startEditing} onCancelEdit={cancelEditing} onSaveEdit={saveEdit} setEditingState={setEditingState} />;
      case 'habits': return <HabitsTab habits={habits} editingState={editingState} onAddHabit={addHabit} onDeleteHabit={deleteHabit} onToggleHabit={toggleHabit} onStartEdit={startEditing} onCancelEdit={cancelEditing} onSaveEdit={saveEdit} setEditingState={setEditingState} />;
      case 'notes': return <NotesTab notes={quickNotes} editingState={editingState} onAddNote={addNote} onRemoveNote={removeNote} onStartEdit={startEditing} onCancelEdit={cancelEditing} onSaveEdit={saveEdit} setEditingState={setEditingState} />;
      case 'stats': return <StatsTab tasks={tasks} focusLog={focusLog} theme={theme} />;
      case 'achievements': return <AchievementsTab tasks={tasks} focusLog={focusLog} habits={habits} />;
      case 'timer': return <TimerTab setFocusLog={setFocusLog} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <Header 
          currentTime={currentTime}
          theme={theme}
          setTheme={setTheme}
          onExportData={handleExportData}
          onImportData={handleImportData}
        />
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
        <main>{renderActiveTab()}</main>
      </div>
    </div>
  );
}