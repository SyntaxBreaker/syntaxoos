import { useTaskMangerStore } from "../../store/taskManagerStore";
import TaskManagerItem from "../TaskManagerItem";

function TaskManagerList() {
  const tasks = useTaskMangerStore((state) => state.tasks);

  return (
    <ul className="flex flex-col gap-2">
      {tasks.map((task) => (
        <TaskManagerItem task={task} key={task.id} />
      ))}
    </ul>
  );
}

export default TaskManagerList;
