import { useState } from "react";
import "./App.css";
import TaskListPage from "./pages/TaskListPage";
import AddTaskPage from "./pages/AddTaskPage";
import type { Task, Status } from "./types/task";

export default function App() {
  const [page, setPage] = useState<"list" | "add">("list");
  const [filter, setFilter] = useState<Status | "all">("all");
  const [tasks, setTasks] = useState<Task[]>([]);

  function addTask(task: Omit<Task, "id">) {
    setTasks([...tasks, { ...task, id: Date.now() }]);
    setPage("list");
  }

  return (
    <div className="wrapper">
      {page === "list" && (
        <TaskListPage
          tasks={tasks}
          filter={filter}
          setFilter={setFilter}
          setTasks={setTasks}
          onAddClick={() => setPage("add")}
        />
      )}

      {page === "add" && (
        <AddTaskPage
          onAdd={addTask}
          onClose={() => setPage("list")}
        />
      )}
    </div>
  );
}
