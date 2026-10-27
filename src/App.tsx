import { For, createResource, createEffect } from "solid-js";
import Button from "./components/button";
import InputField from "./components/input-field";
import TaskRow from "./components/task-row";
import { createStore } from "solid-js/store";
import { createSignal } from "solid-js";

export interface ITask {
  id: number;
  name: string;
  isDone: boolean;
}

const fetchTasks = async () => { 
  const response = await fetch('http://localhost:3001/api/tasks'); 
  const data = await response.json(); 
  return data.tasks; 
};

function App() {
  const [tasks] = createResource(fetchTasks);
  
  const [allTasks, setAllTasks] = createStore<ITask[]>([]);
  
  const [taskId, setTaskId] = createSignal(0);
  const [newTask, setNewTask] = createSignal("");

  createEffect(() => {

    const taskList = tasks();
    if (taskList && taskList.length > 0) {
      
      if (allTasks.length === 0 && taskList) {
        setAllTasks((tasks) => [...tasks, ...taskList]);
      }
    }
  });

  const handleAddClick = () => {
    if (newTask()) {
      const id = taskId();
      setAllTasks((t) => [...t, { id, name: newTask(), isDone: false }]);
      setTaskId(prev => prev + 1);
      setNewTask("");
    }
  };

  const handleDeleteClick = (id: number) => {
    setAllTasks((t) => t.filter((item) => item.id !== id));
  };

  const handleIsDoneChanged = (id: number) => {
    setAllTasks(
      (todo) => todo.id === id,
      "isDone",
      (isDone) => !isDone
    );
  };

  return (
    <div class="container">
      <div class="d-flex flex-row justify-content-between align-items-center gap-3">
        <div class="flex-grow-1">
          <InputField
            value={newTask()}
            onChanged={(value: string) => setNewTask(value)}
          />
        </div>
        <div class="mt-3">
          <Button name="+ Добавить" onClick={handleAddClick} type="add" />
        </div>
      </div>

      <div class="mb-3 d-flex flex-column gap-3">
        <For each={allTasks}>
          {(item) => (
            <TaskRow
              task={item}
              onDeleteClick={handleDeleteClick}
              onIsDoneChanged={handleIsDoneChanged}
            />
          )}
        </For>
      </div>
    </div>
  );
}

export default App;