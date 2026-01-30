import { useState } from "react";
import './App.css'

type Status = "active" | "done" | "canceled";

type Task = {
  id: number;
  title: string;
  status: Status;
  deadline: string;
};

const statusMap: Record<Status, { label: string; color: string }> = {
  active: { label: "Активная задача", color: "#f7caca" },
  done: { label: "Задача выполнена", color: "#c8f2b8" },
  canceled: { label: "Задача отменена", color: "#f5e9b7" },
};

export default function App() {
  const [page, setPage] = useState<"list" | "add">("list");
  const [filter, setFilter] = useState<Status | "all">("all");

  const [tasks, setTasks] = useState<Task[]>([ ]);

  const filteredTasks = tasks.filter(t => filter === "all" || t.status === filter);

  function addTask(task: Omit<Task, "id">) {
    setTasks([...tasks, { ...task, id: Date.now() }]);
    setPage("list");
  }

  return (
    <div className="wrapper">
      <header>
        <span onClick={() => setFilter("all")}>Все задачи</span>
        <span onClick={() => setFilter("active")}>Активные задачи</span>
        <span onClick={() => setFilter("done")}>Выполненные задачи</span>
      </header>

      {page === "list" && (
        <>
          <table>
            <thead>
              <tr>
                <th>Описание</th>
                <th>Статус</th>
                <th>Дедлайн</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map(task => (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td>
                    <select
                      value={task.status}
                      className="select"
                      style={{
                        background: statusMap[task.status].color,
                      }}
                      onChange={e =>
                        setTasks(tasks.map(t =>
                          t.id === task.id ? { ...t, status: e.target.value as Status } : t
                        ))
                      }
                    >
                      {Object.entries(statusMap).map(([k, v]) => (
                        <option key={k} value={k}>{v.label}</option>
                      ))}
                    </select>
                  </td>
                  <td>{task.deadline}</td>
                  <td>
                    <button
                      className="delete"
                      onClick={() => setTasks(tasks.filter(t => t.id !== task.id))}
                    >🗑</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button className="addBtn" onClick={() => setPage("add")}>
            Добавить задачу
          </button>
        </>
      )}

      {page === "add" && <AddTask onAdd={addTask} onClose={() => setPage("list")} />}
    </div>
  );
}

function AddTask({ onAdd, onClose }: { onAdd: (t: Omit<Task, "id">) => void; onClose: () => void }) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<Status>("active");
  const [deadline, setDeadline] = useState("");

  return (
    <div className="modal">
      <div className="card">
        <div className="modalHeader">
          <h3>Добавить новую задачу</h3>
          <span className="close" onClick={onClose}>×</span>
        </div>

        <label>Описание</label>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Введите описание" />

        <label>Статус</label>
        <select value={status} onChange={e => setStatus(e.target.value as Status)}>
          {Object.entries(statusMap).map(([k, v]) => (
            <option key={k} value={k}>{v.label}</option>
          ))}
        </select>

        <label>Дедлайн</label>
        <input value={deadline} onChange={e => setDeadline(e.target.value)} placeholder="Укажите дедлайн" />

        <button
          className="addBtn"
          onClick={() => onAdd({ title, status, deadline })}
        >
          Добавить задачу
        </button>
      </div>
    </div>
  );
}