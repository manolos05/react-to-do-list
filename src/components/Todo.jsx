import { useEffect, useState } from "react";
import TaskElements from "./TaskElements";
import "../App.css";

export const Todo = () => {
  const [text, setText] = useState("");
  const [list, setList] = useState([]);

  useEffect(() => {
    try {
      const getTaskList = async () => {
        const res = await fetch(
          "https://assets.breatheco.de/apis/fake/todos/user/manuelsalazar"
        );
        const data = await res.json();
        setList(data);
      };
      getTaskList();
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  const handleInput = (event) => {
    setText(event.target.value);
    console.log(handleInput);
  };

  const handleClick = () => {
    const newList = [...list];
    newList.push({ label: text, done: false });
    setList(newList);
    requestUpdateTaskList(newList);
    setText("");
  };

  const requestUpdateTaskList = async (updateList) => {
    try {
      await fetch(
        "https://assets.breatheco.de/apis/fake/todos/user/manuelsalazar",
        {
          method: "PUT",
          body: JSON.stringify(updateList),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleDelete = (i) => {
    const filterList = list.filter((eList, index) => i !== index);
    setList(filterList);
    requestUpdateTaskList(filterList);
  };

  const requestDeleteList = async () => {
    try {
      await fetch(
        "https://assets.breatheco.de/apis/fake/todos/user/manuelsalazar",
        {
          method: "PUT",
          body: JSON.stringify([{ label: "Add your task", done: false }]),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setList([{ label: "Add your task", done: false }]);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="container">
      <h1>TODO</h1>

      <form>
        <input
          type="text"
          placeholder="Whats need to be done?"
          onChange={(e) => {
            handleInput(e);
          }}
          value={text}
        />
        <button onClick={handleClick} disabled={!text}>
          <strong>+</strong>
        </button>

        {list.map((eList, index) => (
          <TaskElements
            taskList={list}
            key={index}
            task={eList.label}
            onClick={() => handleDelete(index)}
          />
        ))}
        <p>{list.length} item left </p>
      </form>

      <button onClick={requestDeleteList}>Delete all task</button>
    </div>
  );
};
