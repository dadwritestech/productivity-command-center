import React from 'react';
import type { ActiveTab } from '../types';
import { NAV_ITEMS } from '../constants';

interface NavigationProps {
    activeTab: ActiveTab;
    setActiveTab: React.Dispatch<React.SetStateAction<ActiveTab>>;
}

export function Navigation({ activeTab, setActiveTab }: NavigationProps) {
    return (
        <nav className="bg-white dark:bg-gray-800 rounded-xl shadow-md mb-6 overflow-x-auto">
            <div className="flex border-b border-gray-200 dark:border-gray-700">
                {NAV_ITEMS.map(({ key, label, icon: Icon }) => (
                    <button 
                        key={key} 
                        onClick={() => setActiveTab(key)} 
                        className={`flex-shrink-0 flex items-center px-4 sm:px-6 py-3 font-medium transition-colors duration-200 whitespace-nowrap ${
                            activeTab === key 
                            ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-500 bg-indigo-50 dark:bg-gray-700' 
                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/[0.5]'
                        }`}
                    >
                        <Icon className="w-5 h-5 mr-2" /> 
                        <span>{label}</span>
                    </button>
                ))}
            </div>
        </nav>
    );
}