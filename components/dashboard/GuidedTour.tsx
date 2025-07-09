import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from '../icons'; // Assuming you have these icons
import { ActiveTabKey } from '../../types'; // Assuming ActiveTabKey is exported from types

interface TourStepData {
  title: string;
  content: string;
  highlightElementId?: string;
  targetTabKey?: ActiveTabKey;
}

interface GuidedTourProps {
  isOpen: boolean;
  onClose: () => void;
  currentStep: number;
  onNext: () => void;
  onPrev: () => void;
  onSkip: () => void;
  totalSteps: number;
  onStepChange: (stepIndex: number, targetTabKey?: ActiveTabKey, highlightElementId?: string) => void;
}

// Updated TOUR_STEPS with highlightElementId and targetTabKey
// Note: Specific IDs like 'dashboard-ai-planner', 'tasks-add-form', 'goals-list', etc.
// will need to be added to the respective elements in ProductivityDashboard.tsx
export const TOUR_STEPS: TourStepData[] = [
  {
    title: 'Welcome to Your Productivity Command Center!',
    content: "Let's take a quick tour to get you started. This dashboard is designed to help you manage your tasks, goals, habits, and focus, all in one place.",
    highlightElementId: 'dashboard-overview', // General overview area
    targetTabKey: ActiveTabKey.Dashboard,
  },
  {
    title: 'AI Daily Planner',
    content: 'The AI Daily Planner on the dashboard helps you schedule your day. Click "Generate Plan" to get started.',
    highlightElementId: 'ai-planner-section', // Specific ID for AI planner
    targetTabKey: ActiveTabKey.Dashboard,
  },
  {
    title: 'Tasks Tab',
    content: 'Navigate to the Tasks tab to manage all your to-dos. You can add new tasks, set priorities, due dates, and assign them to projects.',
    highlightElementId: 'nav-tasks', // Highlight the tab itself
    targetTabKey: ActiveTabKey.Tasks,
  },
  {
    title: 'Adding a Task',
    content: "Once in the Tasks tab, use this form to add new tasks. Don't forget to set a priority and due date!",
    highlightElementId: 'task-add-form-section', // ID for the task input form area
    targetTabKey: ActiveTabKey.Tasks,
  },
  {
    title: 'Goals Tab',
    content: 'Switch to the Goals tab to define and track your long-term objectives. Break them down into milestones.',
    highlightElementId: 'nav-goals',
    targetTabKey: ActiveTabKey.Goals,
  },
  {
    title: 'Tracking Goal Progress',
    content: 'Here you can see your goals and update their progress. Use the buttons to adjust completion.',
    highlightElementId: 'goals-list-section', // ID for the goals list area
    targetTabKey: ActiveTabKey.Goals,
  },
  {
    title: 'Habits Tab',
    content: 'Go to the Habits tab to build positive routines. Add daily or weekly habits and track your streaks.',
    highlightElementId: 'nav-habits',
    targetTabKey: ActiveTabKey.Habits,
  },
  {
    title: 'Focus Timer Tab',
    content: 'The Focus Timer tab helps you use the Pomodoro technique to boost concentration. Start a work session or a break.',
    highlightElementId: 'nav-timer',
    targetTabKey: ActiveTabKey.Timer,
  },
  {
    title: 'Quick Notes Tab',
    content: 'Use the Quick Notes tab to jot down ideas, reminders, or anything else that comes to mind.',
    highlightElementId: 'nav-notes',
    targetTabKey: ActiveTabKey.Notes,
  },
  {
    title: 'Achievements Tab',
    content: 'Visit the Achievements tab to see all the badges you can earn as you complete tasks and reach goals.',
    highlightElementId: 'nav-achievements',
    targetTabKey: ActiveTabKey.Achievements,
  },
  {
    title: 'Settings & More',
    content: 'Customize your experience by toggling dark mode (Moon/Sun icon). Access Productivity Analytics (Chart icon) and manage your data with Export/Import.',
    highlightElementId: 'header-controls', // Existing ID for header controls
    targetTabKey: ActiveTabKey.Dashboard, // Or keep on current tab, this one is general
  },
  {
    title: "You're All Set!",
    content: 'Explore the dashboard and start boosting your productivity. Good luck!',
    highlightElementId: 'dashboard-overview',
    targetTabKey: ActiveTabKey.Dashboard,
  }
];

export const GuidedTour: React.FC<GuidedTourProps> = ({
  isOpen,
  onClose,
  currentStep,
  onNext,
  onPrev,
  onSkip,
  totalSteps,
  onStepChange,
}) => {
  if (!isOpen) return null;

  const stepData = TOUR_STEPS[currentStep];

  // Effect to call onStepChange when currentStep changes or tour opens
  useEffect(() => {
    if (isOpen) {
      onStepChange(currentStep, stepData?.targetTabKey, stepData?.highlightElementId);
    }
  }, [currentStep, isOpen, onStepChange, stepData]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-[150] flex items-center justify-center p-4 transition-opacity duration-300"> {/* Changed z-50 to z-[150] */}
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
