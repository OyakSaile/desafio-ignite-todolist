import { Trash } from "phosphor-react";
import styles from "./Task.module.css";
import defaultIcon from "../../assets/check.svg";
import checkedImage from "../../assets/checkedImage.svg";

interface TaskProps {
  isCompleted?: boolean;
  text: string;
  id: number;
  handleRemoveTask: (id: number) => void;
  handleCompleteTask: (id: number) => void;
}
export function Task({
  isCompleted = false,
  text,
  handleRemoveTask,
  handleCompleteTask,
  id,
}: TaskProps) {
  return (
    <div className={styles.taskContainer}>
      <span onClick={() => handleCompleteTask(id)}>
        {isCompleted ? (
          <img src={checkedImage} alt="" />
        ) : (
          <img src={defaultIcon} />
        )}
        <p style={ isCompleted ? { textDecoration:'line-through', color: '#808080'} : {textDecoration : 'none'} }  >{text}</p>
      </span>

      <Trash size={24} onClick={() => handleRemoveTask(id)} />
    </div>
  );
}
