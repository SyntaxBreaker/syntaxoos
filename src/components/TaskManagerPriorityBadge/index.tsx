import type { Priority } from "../../types";

interface TaskManagerPriorityBadgeProps {
  priority: Priority;
}

const colors = {
  High: "text-red-300",
  Medium: "text-amber-300",
  Low: "text-emerald-300",
};

function TaskManagerPriorityBadge({ priority }: TaskManagerPriorityBadgeProps) {
  return (
    <span className={`text-xs uppercase font-mono ${colors[priority]}`}>
      {priority}
    </span>
  );
}

export default TaskManagerPriorityBadge;
