import { useState } from "react";
import { useDispatchTodos } from "../context/TodoContext";
import todoApi from "../api/todo";

const Item = ({ todo }) => {
  const [editingContent, setEditingContent] = useState(todo.content);
  const dispatch = useDispatchTodos();

  const changeContent = (e) => setEditingContent(e.target.value);

  // *********** note ********** //
  // ● Add if statement for users not to be able to edit the preset data
  // *********** note ********** //

  let message = "";
  const toggleEditMode = () => {
    if(todo.id < 40){
      message = "You are not allowed to edit these data"
    }else{
      const newTodo = { ...todo, editing: !todo.editing };
      todoApi.patch(newTodo).then((newTodo) => {
        dispatch({ type: "todo/update", todo: newTodo });
      });
    }
  };

  // *********** note ********** //
  // ● Updating contents
  // *********** note ********** //

  const confirmContent = (e) => {
    e.preventDefault();
    const newTodo = {
      ...todo,
      editing: !todo.editing,
      content: editingContent,
    };
    todoApi.patch(newTodo).then((newTodo) => {
      dispatch({ type: "todo/update", todo: newTodo });
    });
  };

  // *********** note ********** //
  // async delete(todo) {
  //   const result = await axios.delete(ENDPOINT_URL + '/' + todo.id);
  //   return result.data;
  // },
  // ● With "todo.id", we send delete request. Inside of "result.data", we get an empty data.
  // ● todo the dispatch() comes from "complete = (todo)"
  // *********** note ********** //

  const complete = (todo) => {
    if(todo.id < 40){
      message = "You are not allowed to edit these data";
    }else{
      todoApi.delete(todo).then(() => {
      dispatch({ type: "todo/delete", todo});
    });
    }
  };

  // *********** note ********** //
  // ● When clicked on the checkbox, checked state will be true
  // *********** note ********** //

  const changeChecked = (todo) => {
    const newTodo = { ...todo, checked: !todo.checked };
    todoApi.patch(newTodo).then((newTodo) => {
      dispatch({ type: "todo/update", todo: newTodo });
    })
  }

  return (
    <div key={todo.id} className="each__content">
      {/* ********** note **********
      preset data with id less than 40 is not editable
      ********** note ********** */}
      {todo.id < 40 ? (
        <button onClick={() => complete(todo)} className="delete__button">List</button>
      ) : (
        <button onClick={() => complete(todo)} className="delete__button">Delete</button>
      )}
      <form onSubmit={confirmContent} style={{ display: "inline" }}>
      {/* ********** note **********
      Ternary operator which looks at if the contents are being edited or not
      ********** note ********** */}
        {todo.editing ? (
          <>
            <label className="checkbox" id="checkbox">
              <input type="checkbox" checked={todo.checked} onChange={() => changeChecked(todo)}/>
            </label>
            <input type="text" value={editingContent} onChange={changeContent} />
          </>
        ) : (
          <>
            <label className="checkbox" id="checkbox">
              <input type="checkbox" checked={todo.checked} onChange={() => changeChecked(todo)}/>
            </label>
            <span onDoubleClick={toggleEditMode}>{todo.content}</span>
          </>
        )}
      </form>
    </div>
  );
};

export default Item;
