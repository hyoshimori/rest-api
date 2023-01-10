import { useTodos } from "../context/TodoContext";
import Item from "./Item";

const List = () => {
  const todos = useTodos();
  return (
    <div className="list__of__contents">
      {todos.map((todo) => (
        <Item todo={todo} key={todo.id} />
      ))}
    </div>
  );
};

export default List;
