
import React from 'react';
import { ProductivityDashboard } from './components/dashboard/ProductivityDashboard';

const App: React.FC = () => {
  return (
    <div className="antialiased text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900">
      <ProductivityDashboard />
    </div>
  );
};

export default App;
