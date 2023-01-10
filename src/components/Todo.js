import List from "./List"
import Form from "./Form"
import { TodoProvider } from "../context/TodoContext"

const todo = () => {
  return (
    <TodoProvider>
      <div className="list">
        <Form />
        <List />
      </div>
    </TodoProvider>
  )
};
export default todo;
