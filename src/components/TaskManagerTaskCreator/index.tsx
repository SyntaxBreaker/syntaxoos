import { useState } from "react";
import { useTaskMangerStore } from "../../store/taskManagerStore";

function TaskManagerTaskCreator() {
  const [input, setInput] = useState("");
  const addTask = useTaskMangerStore((state) => state.addTask);

  const handleAddTask = (event: React.FormEvent) => {
    event.preventDefault();
    addTask(input);
  };

  return (
    <form onSubmit={handleAddTask} className="flex gap-2">
      <input
        type="text"
        value={input}
        onChange={(event) => setInput(event.target.value)}
        placeholder="What needs to be done?"
        className="flex-1 p-2 border border-slate-600 rounded-md shadow-sm outline-none text-white"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-slate-800 text-white rounded-md hover:bg-slate-600"
      >
        Add
      </button>
    </form>
  );
}

export default TaskManagerTaskCreator;
