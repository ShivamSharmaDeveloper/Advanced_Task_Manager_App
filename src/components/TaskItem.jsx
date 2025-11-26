import React, { useCallback } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useTaskContext } from '../context/TaskContext';
import './TaskItem.css';

function TaskItem({ task, index }) {
  const { toggleTask, deleteTask } = useTaskContext();

  const handleToggle = useCallback(() => {
    toggleTask(task.id);
  }, [toggleTask, task.id]);

  const handleDelete = useCallback(() => {
    deleteTask(task.id);
  }, [deleteTask, task.id]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        handleDelete();
      }
    },
    [handleDelete]
  );

  return (
    <Draggable draggableId={task.id} index={index} type="TASK">
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`task-item ${task.isCompleted ? 'completed' : ''} ${
            snapshot.isDragging ? 'dragging' : ''
          }`}
          onKeyDown={handleKeyDown}
          role="listitem"
          aria-label={`Task: ${task.title} ${
            task.isCompleted ? '(completed)' : '(pending)'
          }`}
        >
          <div className="task-content">
            <button
              type="button"
              onClick={handleToggle}
              className={`checkbox ${task.isCompleted ? 'checked' : ''}`}
              aria-label={
                task.isCompleted
                  ? 'Mark task as pending'
                  : 'Mark task as completed'
              }
              aria-checked={task.isCompleted}
            >
              <span className="checkmark" aria-hidden="true" />
            </button>

            <span className="task-title">{task.title}</span>
          </div>

          <div className="task-actions">
            <button
              {...provided.dragHandleProps}
              type="button"
              className="drag-handle"
              aria-label="Drag to reorder task"
              title="Drag to reorder"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="5" r="1" />
                <circle cx="12" cy="12" r="1" />
                <circle cx="12" cy="19" r="1" />
                <circle cx="19" cy="5" r="1" />
                <circle cx="19" cy="12" r="1" />
                <circle cx="19" cy="19" r="1" />
                <circle cx="5" cy="5" r="1" />
                <circle cx="5" cy="12" r="1" />
                <circle cx="5" cy="19" r="1" />
              </svg>
            </button>

            <button
              type="button"
              onClick={handleDelete}
              className="delete-button"
              aria-label="Delete task"
              title="Delete task"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="3 6 5 6 21 6" />
                <path d="m19 6v14a2 2 0 0 1 -2 2H7a2 2 0 0 1 -2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default React.memo(TaskItem);