import React from 'react';
import { X, ChevronLeft, ChevronRight } from '../icons'; // Assuming you have these icons

interface GuidedTourProps {
  isOpen: boolean;
  onClose: () => void;
  currentStep: number;
  onNext: () => void;
  onPrev: () => void;
  onSkip: () => void;
  totalSteps: number;
}

const TOUR_STEPS = [
  {
    title: 'Welcome to Your Productivity Command Center!',
    content: "Let's take a quick tour to get you started. This dashboard is designed to help you manage your tasks, goals, habits, and focus, all in one place.",
    targetId: 'dashboard-overview', // Optional: for highlighting
  },
  {
    title: 'Dashboard Overview',
    content: 'The main dashboard gives you a snapshot of your day, including an AI Daily Planner to help you schedule, Smart Task Suggestions based on your energy, and progress trackers.',
    targetId: 'dashboard-main',
  },
  {
    title: 'Tasks Tab',
    content: 'Manage all your to-dos here. Add new tasks, set priorities, due dates, and assign them to projects. Filter and search to find exactly what you need.',
    targetId: 'nav-tasks',
  },
  {
    title: 'Goals Tab',
    content: 'Define your long-term objectives and track their progress. Break them down into milestones and stay motivated as you see your achievements grow.',
    targetId: 'nav-goals',
  },
  {
    title: 'Habits Tab',
    content: 'Build positive routines. Add daily or weekly habits, track your streaks, and watch them become second nature.',
    targetId: 'nav-habits',
  },
  {
    title: 'Focus Timer Tab',
    content: 'Use the Pomodoro timer to boost your concentration. Work in focused bursts and take regular breaks to stay fresh and productive.',
    targetId: 'nav-timer',
  },
  {
    title: 'Quick Notes Tab',
    content: 'Jot down ideas, reminders, or anything else that comes to mind. Keep your thoughts organized and accessible.',
    targetId: 'nav-notes',
  },
  {
    title: 'Achievements Tab',
    content: 'Unlock achievements as you complete tasks, maintain habits, and reach your goals. See all your accomplishments in one place!',
    targetId: 'nav-achievements',
  },
  {
    title: 'Settings & More',
    content: 'Customize your experience by toggling dark mode (Moon/Sun icon). Access Productivity Analytics (Chart icon) to see your trends. You can also Export your data (Download icon) or Import it (Upload icon).',
    targetId: 'header-controls',
  },
  {
    title: "You're All Set!",
    content: 'Explore the dashboard and start boosting your productivity. Good luck!',
    targetId: 'dashboard-overview',
  }
];

export const GuidedTour: React.FC<GuidedTourProps> = ({
  isOpen,
  onClose,
  currentStep,
  onNext,
  onPrev,
  onSkip,
  totalSteps
}) => {
  if (!isOpen) return null;

  const stepData = TOUR_STEPS[currentStep];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4 transition-opacity duration-300">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{stepData.title}</h3>
          <button
            onClick={onSkip}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            aria-label="Close tour"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="text-sm text-gray-700 dark:text-gray-300 mb-6 prose prose-sm dark:prose-invert max-w-none">
          <p>{stepData.content}</p>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Step {currentStep + 1} of {totalSteps}
          </div>
          <div className="flex space-x-2">
            {currentStep > 0 && (
              <button
                onClick={onPrev}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md flex items-center"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </button>
            )}
            {currentStep < totalSteps - 1 ? (
              <button
                onClick={onNext}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md flex items-center"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md"
              >
                Finish
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper to get total steps, will be used in ProductivityDashboard
export const getTotalTourSteps = () => TOUR_STEPS.length;
