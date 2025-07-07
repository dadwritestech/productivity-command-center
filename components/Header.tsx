import React, { useRef } from 'react';
import { Moon, Sun, Download, Upload } from 'lucide-react';
import type { Theme } from '../types';
import { formatTime, formatDate } from '../utils';

interface HeaderProps {
    currentTime: Date;
    theme: Theme;
    setTheme: React.Dispatch<React.SetStateAction<Theme>>;
    onExportData: () => void;
    onImportData: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Header({ currentTime, theme, setTheme, onExportData, onImportData }: HeaderProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <header className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Productivity Command Center</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">{formatDate(currentTime)}</p>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-4 mt-4 sm:mt-0">
                    <button onClick={toggleTheme} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                    </button>
                    <button onClick={onExportData} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <Download size={20} />
                    </button>
                    <input type="file" ref={fileInputRef} onChange={onImportData} className="hidden" accept=".json" />
                    <button onClick={() => fileInputRef.current?.click()} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <Upload size={20} />
                    </button>
                    <div className="text-left sm:text-right">
                        <div className="text-3xl font-mono text-indigo-600 dark:text-indigo-400">{formatTime(currentTime)}</div>
                    </div>
                </div>
            </div>
        </header>
    );
}