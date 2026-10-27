import type { ITask } from "../../App";
import Button from "../button";
import Task from "../task";

type Props = {
  task: ITask;
  onDeleteClick: (id: number) => void;
  onIsDoneChanged: (id: number) => void;
  onChangeClick: (id: number, title: string) => void;
};

export default function TaskRow(props: Props) {
  const handleDeleteClick = () => {
    props.onDeleteClick(props.task.id);
  };

  const handleEditClick=() => {
    const newTask = prompt("Введите новое название задачи", props.task.name);
    if (newTask) {
      props.onChangeClick(props.task.id, newTask)
    }
  }

  const handleIsDoneChanged = () => {
    props.onIsDoneChanged(props.task.id);
  };

  return (
    <div class="d-flex flex-row justify-content-between align-items-center gap-3">
      <div class="flex-grow-1">
        <Task
          name={props.task.name}
          isDone={props.task.isDone}
          onIsDoneChanged={handleIsDoneChanged}
        />
      </div>
      <Button name="Редактировать" onClick={handleEditClick} type="add" />
      <Button name="Удалить" onClick={handleDeleteClick} type="delete" />
    </div>
  );
}