import { useState } from "react";
import type { Status, Task } from "../types/task";
import { statusMap } from "../types/task";

type Props = {
  onAdd: (t: Omit<Task, "id">) => void;
  onClose: () => void;
};

export default function AddTaskPage({ onAdd, onClose }: Props) {
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
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Введите описание"
        />

        <label>Статус</label>
        <select
          value={status}
          onChange={e => setStatus(e.target.value as Status)}
        >
          {Object.entries(statusMap).map(([k, v]) => (
            <option key={k} value={k}>
              {v.label}
            </option>
          ))}
        </select>

        <label>Дедлайн</label>
        <input
          type="date"
          value={deadline}
          onChange={e => setDeadline(e.target.value)}
        />

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
