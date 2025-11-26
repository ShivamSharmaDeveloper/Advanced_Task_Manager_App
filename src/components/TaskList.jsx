import React, { useCallback } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Droppable } from 'react-beautiful-dnd';
import TaskItem from './TaskItem';
import { useTaskContext } from '../context/TaskContext';
import './TaskList.css';

function TaskList() {
  const { filteredTasks, reorderTasks } = useTaskContext();

  const handleDragEnd = useCallback(
    (result) => {
      const { source, destination } = result;

      // If dropped outside the list or in the same position
      if (!destination) return;
      if (source.index === destination.index) return;

      // Reorder the tasks
      reorderTasks(source.index, destination.index);
    },
    [reorderTasks]
  );

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="task-list-container">
        {filteredTasks.length === 0 ? (
          <div className="empty-state" role="status" aria-live="polite">
            <div className="empty-state-icon">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
              </svg>
            </div>
            <p className="empty-state-text">
              {(() => {
                const context = useTaskContext();
                switch (context.filter) {
                  case 'completed':
                    return 'No completed tasks yet.';
                  case 'pending':
                    return 'No pending tasks.';
                  default:
                    return 'No tasks yet. Add one above!';
                }
              })()}
            </p>
          </div>
        ) : (
          <Droppable droppableId="task-list" type="TASK">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`task-list ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
                role="list"
                aria-label="Task list"
              >
                {filteredTasks.map((task, index) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    index={index}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        )}
      </div>
    </DragDropContext>
  );
}

export default React.memo(TaskList);