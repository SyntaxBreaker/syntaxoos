import type { Priority } from "../../types";

interface TaskManagerPriorityBadgeProps {
  priority: Priority;
}

const colors = {
  high: "text-red-300",
  medium: "text-amber-300",
  low: "text-emerald-300",
};

function TaskManagerPriorityBadge({ priority }: TaskManagerPriorityBadgeProps) {
  return (
    <span className={`text-xs uppercase font-mono ${colors[priority]}`}>
      {priority}
    </span>
  );
}

export default TaskManagerPriorityBadge;
