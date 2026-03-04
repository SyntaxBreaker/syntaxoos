import type { Priority } from "../../types";
import TaskManagerPriorityBadge from "../TaskManagerPriorityBadge";

interface TaskManagerTaskContentProps {
  priority: Priority;
  title: string;
}

function TaskManagerTaskContent({
  priority,
  title,
}: TaskManagerTaskContentProps) {
  return (
    <div className="flex flex-col gap-2">
      <TaskManagerPriorityBadge priority={priority} />
      <h3 className="text-gray-200">{title}</h3>
    </div>
  );
}

export default TaskManagerTaskContent;
