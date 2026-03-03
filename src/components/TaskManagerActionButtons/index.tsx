import trashIcon from "../../assets/icons/trash.svg";
import editIcon from "../../assets/icons/edit.svg";
import { useTaskMangerStore } from "../../store/taskManagerStore";

interface TaskManagerActionButtonsProps {
  taskId: string;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

function TaskManagerActionButtons({
  taskId,
  setIsEditing,
}: TaskManagerActionButtonsProps) {
  const deleteTask = useTaskMangerStore((state) => state.deleteTask);

  return (
    <div className="flex flex-row gap-2">
      <button
        className="w-12 h-12 bg-gray-700 p-2 rounded-md hover:cursor-pointer hover:bg-gray-600"
        onClick={() => setIsEditing((state) => !state)}
      >
        <img src={editIcon} className="fill-current h-[32px] w-[32px]" />
      </button>
      <button
        className="w-12 h-12 bg-red-600/90 p-2 rounded-md hover:cursor-pointer hover:bg-red-500"
        onClick={() => deleteTask(taskId)}
      >
        <img src={trashIcon} className="fill-current" />
      </button>
    </div>
  );
}

export default TaskManagerActionButtons;
