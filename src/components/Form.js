import { useState } from "react";
import { useDispatchTodos } from "../context/TodoContext";
import todoApi from "../api/todo"

const Form = () => {
  const [enteredTodo, setEnteredtodo] = useState("");
  const dispatch = useDispatchTodos();

  const addtodo = (e) => {
    e.preventDefault();

    const newtodo = {
      id: Math.floor(Math.random() * 1e5),
      content: enteredTodo,
      editing: false
    };

    // *********** note ********** //
    // async post(todo) {
    //   const result = await axios.post(ENDPOINT_URL, todo);
    //   return result.data;
    // },
    // ● "result.data" is returning with ".then"
    // ● with dispatch(), we use the reducer to modify states.
    // *********** note ********** //

    todoApi.post(newtodo).then(newtodo => {
      dispatch({ type: 'todo/add', todo: newtodo});
      setEnteredtodo("");
    })

  };
  return (
    <div className="list">
      <form onSubmit={addtodo} className="form">
        <input
          type="text"
          value={enteredTodo}
          onChange={(e) => setEnteredtodo(e.target.value)}
          className="form__input input__tasks"
        />
        <button className="form__button">Add</button>
      </form>
    </div>
  );
};

export default Form;
