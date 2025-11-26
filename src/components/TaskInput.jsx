import React, { useState, useCallback, useRef } from 'react';
import { useTaskContext } from '../context/TaskContext';
import './TaskInput.css';

function TaskInput() {
  const [inputValue, setInputValue] = useState('');
  const { addTask, error, clearError } = useTaskContext();
  const inputRef = useRef(null);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (inputValue.trim() === '') {
        clearError();
        return;
      }

      addTask(inputValue);
      setInputValue('');
      clearError();

      // Keep focus on input after submission
      if (inputRef.current) {
        inputRef.current.focus();
      }
    },
    [inputValue, addTask, clearError]
  );

  const handleChange = useCallback(
    (e) => {
      const value = e.target.value;
      setInputValue(value);

      // Clear error when user starts typing valid input
      if (error && value.trim() !== '') {
        clearError();
      }
    },
    [error, clearError]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        handleSubmit(e);
      }
    },
    [handleSubmit]
  );

  const isDisabled = inputValue.trim() === '';
  const hasError = error !== '';

  return (
    <div className="task-input-container">
      <form onSubmit={handleSubmit} className="task-input-form">
        <div className="input-wrapper">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="What needs to be done?"
            className={`task-input ${hasError ? 'error' : ''}`}
            maxLength={255}
            aria-label="Task input"
            aria-describedby={hasError ? 'error-message' : undefined}
            autoFocus
          />
          <button
            type="submit"
            disabled={isDisabled}
            className="add-button"
            aria-label="Add task"
          >
            Add
          </button>
        </div>
        {hasError && (
          <div id="error-message" className="error-message" role="alert">
            {error}
          </div>
        )}
      </form>
    </div>
  );
}

export default React.memo(TaskInput);