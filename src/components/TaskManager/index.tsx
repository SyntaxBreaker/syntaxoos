import TaskManagerList from "../TaskManagerList";
import TaskManagerTaskCreator from "../TaskManagerTaskCreator";

function TaskManager() {
  return (
    <article className="max-w-full mx-auto p-4 flex flex-col gap-4">
      <TaskManagerTaskCreator />
      <TaskManagerList />
    </article>
  );
}

export default TaskManager;
