import styles from "./Tasks.module.css";
import { PlusCircle, Clipboard, ClipboardText } from "phosphor-react";
import { Task } from "../Task";
import {
  ChangeEvent,
  FormEvent,
  InputHTMLAttributes,
  InvalidEvent,
  useState,
} from "react";

interface TasksProps {
  isCompleted: boolean;
  title: string;
  id: number;
}
export function Tasks() {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState<TasksProps[]>([]);

  function handleChangeNewTask(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");
    setNewTask(event.target.value);
  }

  function handleAddNewTask(event: FormEvent) {
    event.preventDefault();
    const lastsTasks = [...tasks];
    setTasks([
      ...lastsTasks,
      { title: newTask, id: tasks.length + 1, isCompleted: false },
    ]);
    setNewTask("");
  }

  function handleDeleteTask(id: number) {
    const lastTasks = [...tasks];
    const filteredTasks = lastTasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  }

  function handleCompleteTask(id: number) {
    const newTasks = tasks.map((task) =>
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    );
    setTasks(newTasks);
    console.log(newTasks);
  }

  function handleInvalidTask(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity("Este Campo é Obrigatório");
  }

  const completedTasks = tasks.filter((task) => task.isCompleted === true);

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleAddNewTask}>
        <input
          type="text"
          placeholder="Adicione uma nova tarefa"
          onChange={handleChangeNewTask}
          value={newTask}
          onInvalid={handleInvalidTask}
          required
        />
        <button>
          Criar <PlusCircle size={15} />
        </button>
      </form>

      <div className={styles.tasksInfo}>
        <p className={styles.taskCreated}>
          Tarefas Criadas <span>{tasks.length}</span>
        </p>

        <p className={styles.Done}>
          Concluídas{" "}
          <span>
            {completedTasks.length} de {tasks.length}
          </span>
        </p>
      </div>
      {tasks.length === 0 && (
        <div className={styles.withoutTask}>
          <svg
            width="38"
            height="55"
            viewBox="0 0 38 55"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M10.1306 0.60576C8.93061 1.2436 7.905 3.296 7.905 5.06C7.905 5.68496 8.57565 6.9332 9.39573 7.83368L10.8865 9.47056H18.5365C25.9529 9.47056 26.2329 9.428 27.7022 8.07056C29.5989 6.31776 30.3919 6.31496 32.2759 8.05544C34.8345 10.4198 35.19 13.0506 35.19 29.6306C35.19 50.0941 34.8488 50.9654 26.3797 52.1224C21.0972 52.8442 9.52017 52.3979 6.62847 51.3614C4.94955 50.7594 4.3656 50.1366 3.31857 47.8306C2.09661 45.1398 2.04 44.5394 1.86762 32.4306C1.6779 19.1166 2.13384 13.1526 3.60162 9.75672C4.34724 8.0308 4.37988 7.60688 3.79542 7.2104C2.79939 6.53448 1.9839 7.4652 0.91953 10.4948C0.10812 12.8026 0 15.0543 0 29.6306C0 46.1321 0.00153001 46.1539 1.275 48.9506C2.295 51.1906 3.06 52.0306 5.1 53.1506C7.58268 54.5136 7.93917 54.5506 18.615 54.5506C29.2908 54.5506 29.6473 54.5136 32.13 53.1506C34.17 52.0306 34.935 51.1906 35.955 48.9506C37.2285 46.1539 37.23 46.1321 37.23 29.6306C37.23 11.6165 37.0683 10.3414 34.3495 6.9416C33.5259 5.91176 32.1494 4.89984 31.29 4.69264C30.3297 4.4608 29.4066 3.70144 28.8946 2.722C28.4366 1.8456 27.5318 0.86336 26.8841 0.53968C25.373 -0.216879 11.575 -0.16256 10.1306 0.60576ZM26.467 3.39736C27.0208 4.26536 27.0953 4.89312 26.7327 5.63736C26.2777 6.57088 25.4944 6.67056 18.615 6.67056C11.7356 6.67056 10.9522 6.57088 10.4973 5.63736C10.1347 4.89312 10.2092 4.26536 10.763 3.39736C11.4883 2.26 11.9416 2.19056 18.615 2.19056C25.2883 2.19056 25.7417 2.26 26.467 3.39736ZM9.67011 21.2664C8.8893 22.653 10.5937 22.933 18.9083 22.7846C26.1788 22.6546 27.54 22.4978 27.54 21.7906C27.54 21.0822 26.1645 20.9265 18.7797 20.7977C12.7699 20.6924 9.90981 20.8397 9.67011 21.2664ZM9.67011 28.5464C8.8893 29.933 10.5937 30.213 18.9083 30.0646C26.1788 29.9346 27.54 29.7778 27.54 29.0706C27.54 28.3622 26.1645 28.2065 18.7797 28.0777C12.7699 27.9724 9.90981 28.1197 9.67011 28.5464ZM9.70173 36.3304C8.976 37.619 10.2245 38.0306 14.8573 38.0306C19.2035 38.0306 19.6921 37.9286 19.5391 37.0506C19.3938 36.2167 18.6716 36.0465 14.6982 35.9104C11.8662 35.813 9.89961 35.9782 9.70173 36.3304Z"
              fill="#3D3D3D"
            />
          </svg>

          <div>
            <h2>Você ainda não tem tarefas cadastradas</h2>
            <p>Crie tarefas e organize seus itens a fazer</p>
          </div>
        </div>
      )}
      {tasks.map(({ id, title, isCompleted }) => (
        <Task
          key={id}
          text={title}
          isCompleted={isCompleted}
          id={id}
          handleRemoveTask={handleDeleteTask}
          handleCompleteTask={handleCompleteTask}
        />
      ))}
    </div>
  );
}
