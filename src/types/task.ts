export type Status = "active" | "done" | "canceled";

export type Task = {
  id: number;
  title: string;
  status: Status;
  deadline: string;
};

export const statusMap: Record<Status, { label: string; color: string }> = {
  active: { label: "Активная задача", color: "#f7caca" },
  done: { label: "Задача выполнена", color: "#c8f2b8" },
  canceled: { label: "Задача отменена", color: "#f5e9b7" },
};
