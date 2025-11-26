import React, { createContext, useContext, useReducer, useMemo, useCallback } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

// Action types
const ADD_TASK = 'ADD_TASK';
const TOGGLE_TASK = 'TOGGLE_TASK';
const DELETE_TASK = 'DELETE_TASK';
const REORDER_TASKS = 'REORDER_TASKS';
const SET_FILTER = 'SET_FILTER';
const SET_THEME = 'SET_THEME';
const SET_ERROR = 'SET_ERROR';
const CLEAR_ERROR = 'CLEAR_ERROR';

// Initial state
const initialState = {
  tasks: [],
  filter: 'all',
  theme: 'light',
  error: '',
};

// Reducer function
function taskReducer(state, action) {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        tasks: [
          {
            id: Date.now().toString(),
            title: action.payload.title,
            isCompleted: false,
            createdAt: new Date().toISOString(),
            order: 0,
          },
          ...state.tasks.map((task, index) => ({
            ...task,
            order: index + 1,
          })),
        ],
        error: '',
      };

    case TOGGLE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, isCompleted: !task.isCompleted }
            : task
        ),
      };

    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks
          .filter((task) => task.id !== action.payload.id)
          .map((task, index) => ({
            ...task,
            order: index,
          })),
      };

    case REORDER_TASKS:
      const { startIndex, endIndex } = action.payload;
      const result = Array.from(state.tasks);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);

      // Update order values
      return {
        ...state,
        tasks: result.map((task, index) => ({
          ...task,
          order: index,
        })),
      };

    case SET_FILTER:
      return {
        ...state,
        filter: action.payload.filter,
      };

    case SET_THEME:
      return {
        ...state,
        theme: action.payload.theme,
      };

    case SET_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: '',
      };

    default:
      return state;
  }
}

// Create context
const TaskContext = createContext();

// Provider component
export function TaskProvider({ children }) {
  // Load initial state from localStorage
  const [savedState, setSavedState] = useLocalStorage('taskManagerState', initialState);
  const [state, dispatch] = useReducer(taskReducer, savedState);

  // Sync state with localStorage whenever it changes
  const updateState = useCallback((newState) => {
    setSavedState(newState);
  }, [setSavedState]);

  // Update localStorage whenever state changes
  React.useEffect(() => {
    updateState(state);
  }, [state, updateState]);

  // Memoize derived state
  const filteredTasks = useMemo(() => {
    switch (state.filter) {
      case 'completed':
        return state.tasks.filter((task) => task.isCompleted);
      case 'pending':
        return state.tasks.filter((task) => !task.isCompleted);
      default:
        return state.tasks;
    }
  }, [state.tasks, state.filter]);

  // Memoize context value
  const contextValue = useMemo(() => {
    const actions = {
      addTask: (title) => {
        if (!title || title.trim() === '') {
          dispatch({
            type: SET_ERROR,
            payload: { error: 'Task title cannot be empty' },
          });
          return;
        }
        if (title.length > 255) {
          dispatch({
            type: SET_ERROR,
            payload: { error: 'Task title is too long' },
          });
          return;
        }
        dispatch({
          type: ADD_TASK,
          payload: { title: title.trim() },
        });
      },

      toggleTask: (id) => {
        dispatch({ type: TOGGLE_TASK, payload: { id } });
      },

      deleteTask: (id) => {
        dispatch({ type: DELETE_TASK, payload: { id } });
      },

      reorderTasks: (startIndex, endIndex) => {
        dispatch({
          type: REORDER_TASKS,
          payload: { startIndex, endIndex },
        });
      },

      setFilter: (filter) => {
        dispatch({ type: SET_FILTER, payload: { filter } });
      },

      setTheme: (theme) => {
        dispatch({ type: SET_THEME, payload: { theme } });
      },

      clearError: () => {
        dispatch({ type: CLEAR_ERROR });
      },
    };

    return {
      ...state,
      filteredTasks,
      ...actions,
    };
  }, [state, filteredTasks]);

  return (
    <TaskContext.Provider value={contextValue}>
      {children}
    </TaskContext.Provider>
  );
}

// Hook to use the context
export function useTaskContext() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
}

export default TaskContext;