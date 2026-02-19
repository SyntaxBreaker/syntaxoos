import type { Task } from "../../types";
import { useTaskMangerStore } from "../../store/taskManagerStore";
import trashIcon from "../../assets/icons/trash.svg";
import editIcon from "../../assets/icons/edit.svg";
import { useState } from "react";
import TaskManagerTaskEditor from "../TaskManagerTaskEditor";

interface TaskManagerItemProps {
  task: Task;
}

function TaskManagerItem({ task }: TaskManagerItemProps) {
  const [isEditing, setIsEditing] = useState(false);

  const deleteTask = useTaskMangerStore((state) => state.deleteTask);

  return (
    <li className="flex flex-col gap-4 bg-gray-800 p-4 rounded-md shadow-sm">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col gap-2">
          <span className="text-xs text-gray-400">{task.priority}</span>
          <p className="text-gray-200">{task.title}</p>
        </div>
        <div className="flex flex-row gap-2">
          <button
            className="w-12 h-12 bg-gray-700 p-2 rounded-md hover:cursor-pointer hover:bg-gray-600"
            onClick={() => setIsEditing((state) => !state)}
          >
            <img src={editIcon} className="fill-current h-[32px] w-[32px]" />
          </button>
          <button
            className="w-12 h-12 bg-red-600/90 p-2 rounded-md hover:cursor-pointer hover:bg-red-500"
            onClick={() => deleteTask(task.id)}
          >
            <img src={trashIcon} className="fill-current" />
          </button>
        </div>
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
