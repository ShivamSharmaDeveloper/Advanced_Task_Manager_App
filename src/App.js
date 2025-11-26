import React, { useEffect } from 'react';
import { TaskProvider, useTaskContext } from './context/TaskContext';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import FilterBar from './components/FilterBar';
import ThemeToggle from './components/ThemeToggle';
import './App.css';

function AppContent() {
  const { theme, filteredTasks } = useTaskContext();

  // Apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="app" data-theme={theme}>
      <div className="app-container">
        <header className="app-header">
          <div className="header-content">
            <h1 className="app-title">
              <span className="title-icon">✓</span>
              Task Manager
            </h1>
            <ThemeToggle />
          </div>
        </header>

        <main className="app-main">
          <div className="main-content">
            <TaskInput />

            {filteredTasks.length > 0 && (
              <>
                <FilterBar />
                <TaskList />
              </>
            )}
          </div>
        </main>

        <footer className="app-footer">
          <div className="footer-content">
            <p className="footer-text">
              Advanced Task Manager • Drag to reorder • All data saved locally
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

function App() {
  return (
    <TaskProvider>
      <AppContent />
    </TaskProvider>
  );
}

export default App;