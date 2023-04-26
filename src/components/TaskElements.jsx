function TaskElements({ task, onClick, taskList }) {
  return (
    <ul style={{ listStyleType: "none" }}>
      <li className="myLi d-flex justify-content-between">
        {task}
        {task !== "Add your task" && (
          <i onClick={onClick} className="bi bi-trash"></i>
        )}
      </li>
    </ul>
  );
}

export default TaskElements;
