import InlineEdit from "../components/InlineEdit";
import type { Task, Status } from "../types/task";
import { statusMap } from "../types/task";

type Props = {
  tasks: Task[];
  filter: Status | "all";
  setFilter: (f: Status | "all") => void;
  setTasks: (tasks: Task[]) => void;
  onAddClick: () => void;
};

export default function TaskListPage({
  tasks,
  filter,
  setFilter,
  setTasks,
  onAddClick,
}: Props) {
  const filteredTasks = tasks.filter(
    t => filter === "all" || t.status === filter
  );

  return (
    <>
      <header>
        <span onClick={() => setFilter("all")}>Все задачи</span>
        <span onClick={() => setFilter("active")}>Активные задачи</span>
        <span onClick={() => setFilter("done")}>Выполненные задачи</span>
      </header>

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
              <td>
                <InlineEdit
                  value={task.title}
                  onSave={(val) =>
                    setTasks(
                      tasks.map(t =>
                        t.id === task.id ? { ...t, title: val } : t
                      )
                    )
                  }
                />
              </td>
              <td>
                <select
                  value={task.status}
                  className="select"
                  style={{ background: statusMap[task.status].color }}
                  onChange={e =>
                    setTasks(
                      tasks.map(t =>
                        t.id === task.id
                          ? { ...t, status: e.target.value as Status }
                          : t
                      )
                    )
                  }
                >
                  {Object.entries(statusMap).map(([k, v]) => (
                    <option key={k} value={k}>
                      {v.label}
                    </option>
                  ))}
                </select>
              </td>
              <td>{task.deadline}</td>
              <td>
                <button
                  className="delete"
                  onClick={() =>
                    setTasks(tasks.filter(t => t.id !== task.id))
                  }
                >
                  🗑
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="addBtn" onClick={onAddClick}>
        Добавить задачу
      </button>
    </>
  );
}
