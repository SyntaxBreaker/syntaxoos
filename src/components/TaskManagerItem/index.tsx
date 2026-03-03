import type { Task } from "../../types";
import { useState } from "react";
import TaskManagerTaskEditor from "../TaskManagerTaskEditor";
import TaskManagerTaskContent from "../TaskManagerTaskContent";
import TaskManagerActionButtons from "../TaskManagerActionButtons";

interface TaskManagerItemProps {
  task: Task;
}

function TaskManagerItem({ task }: TaskManagerItemProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <li className="flex flex-col gap-4 bg-gray-800 p-4 rounded-md shadow-sm">
      <div className="flex flex-row justify-between items-center">
        <TaskManagerTaskContent priority={task.priority} title={task.title} />
        <TaskManagerActionButtons
          taskId={task.id}
          setIsEditing={setIsEditing}
        />
      </div>
      {isEditing && (
        <TaskManagerTaskEditor
          task={task}
          onCancel={() => setIsEditing(false)}
        />
      )}
    </li>
  );
}

export default TaskManagerItem;
