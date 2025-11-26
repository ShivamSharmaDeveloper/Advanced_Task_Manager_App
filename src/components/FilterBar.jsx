import React, { useCallback } from 'react';
import { useTaskContext } from '../context/TaskContext';
import './FilterBar.css';

const FILTER_OPTIONS = [
  { value: 'all', label: 'All', countKey: 'all' },
  { value: 'pending', label: 'Pending', countKey: 'pending' },
  { value: 'completed', label: 'Completed', countKey: 'completed' },
];

function FilterBar() {
  const { filter, setFilter, tasks } = useTaskContext();

  const getTaskCounts = useCallback(() => {
    const all = tasks.length;
    const completed = tasks.filter(task => task.isCompleted).length;
    const pending = tasks.filter(task => !task.isCompleted).length;

    return { all, completed, pending };
  }, [tasks]);

  const handleFilterChange = useCallback(
    (newFilter) => {
      if (newFilter !== filter) {
        setFilter(newFilter);
      }
    },
    [filter, setFilter]
  );

  const taskCounts = getTaskCounts();

  return (
    <div className="filter-bar" role="tablist" aria-label="Task filters">
      <div className="filter-container">
        {FILTER_OPTIONS.map((option) => {
          const count = taskCounts[option.countKey];
          const isActive = filter === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => handleFilterChange(option.value)}
              className={`filter-button ${isActive ? 'active' : ''}`}
              role="tab"
              aria-selected={isActive}
              aria-controls="task-list"
              aria-label={`Show ${option.label.toLowerCase()} tasks (${count})`}
            >
              <span className="filter-label">{option.label}</span>
              <span className="filter-count" aria-hidden="true">
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="filter-summary" aria-live="polite" aria-atomic="true">
        {taskCounts.all > 0 && (
          <span className="summary-text">
            Showing{' '}
            <span className="summary-current">
              {filter === 'all'
                ? taskCounts.all
                : filter === 'completed'
                  ? taskCounts.completed
                  : taskCounts.pending}
            </span>{' '}
            of{' '}
            <span className="summary-total">{taskCounts.all}</span> tasks
          </span>
        )}
      </div>
    </div>
  );
}

export default React.memo(FilterBar);