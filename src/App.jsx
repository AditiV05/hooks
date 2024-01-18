import React, { useReducer, useState } from "react";

const tasksReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_TASK":
      return state.map((task) =>
        task.id === action.payload ? { ...task, hidden: !task.hidden } : task
      );
    case "ADD_TASK":
      return [
        ...state,
        {
          id: state.length + 1,
          text: action.payload,
          hidden: false,
        },
      ];
    default:
      return state;
  }
};

const TaskList = () => {
  const initialState = [{ id: 1, text: "", hidden: false }];

  const [tasks, dispatch] = useReducer(tasksReducer, initialState);

  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    dispatch({ type: "ADD_TASK", payload: newTask });
    setNewTask("");
  };

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.hidden ? "Task is hidden" : task.text}
            <button
              onClick={() =>
                dispatch({ type: "TOGGLE_TASK", payload: task.id })
              }
            >
              Toggle
            </button>
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter your task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>
    </div>
  );
};

export default TaskList;
