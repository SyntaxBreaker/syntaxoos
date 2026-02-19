import { useState } from "react";
import type { Task } from "../../types";
import { useTaskMangerStore } from "../../store/taskManagerStore";

interface TaskManagerTaskEditorProps {
  task: Task;
  onCancel: () => void;
}

function TaskManagerTaskEditor({ task, onCancel }: TaskManagerTaskEditorProps) {
  const [title, setTitle] = useState(task.title);
  const [priority, setPriority] = useState(task.priority);
  const updateTask = useTaskMangerStore((state) => state.updateTask);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    updateTask(task.id, {
      title: title,
      priority: priority,
    });

    onCancel();
  };

  return (
    <form
      className="flex flex-col gap-2 bg-gray-700 p-2 rounded-md"
      onSubmit={handleSubmit}
    >
      <input
        className="bg-gray-800 text-gray-200 p-2 rounded-md"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <select
        className="bg-gray-800 text-gray-200 p-2 rounded-md"
        value={priority}
        onChange={(event) =>
          setPriority(event.target.value as Task["priority"])
        }
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <div className="flex flex-row gap-2 self-end">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-md border border-gray-400 text-gray-200 hover:bg-gray-600 cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-md bg-indigo-700 hover:bg-indigo-600 border border-transparent text-gray-200 cursor-pointer"
        >
          Save
        </button>
      </div>
    </form>
  );
}

export default TaskManagerTaskEditor;
