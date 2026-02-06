import TaskManagerList from "../TaskManagerList";
import TaskManagerTaskCreator from "../TaskManagerTaskCreator";

function TaskManager() {
  return (
    <div className="max-w-full mx-auto p-4 flex flex-col gap-4">
      <TaskManagerTaskCreator />
      <TaskManagerList />
    </div>
  );
}

export default TaskManager;
