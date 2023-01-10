import { createContext, useContext, useReducer, useState, useLayoutEffect } from "react";
import todoApi from '../api/todo'

// ********** note ********** //
// ● With "createContext" and "useContext", we have access to the state of reducer and dispatch method in the child files.
// ********** note ********** //

const todoContext = createContext();
const todoDispatchContext = createContext()

// ********** note ********** //
// ● todos is an array of todo items and action is an object
// ● e.g. action.type can be "odo/add"
// **********//
// when init, the whole object is returned once
// ********** notes ********** //

const todoReducer = (todos, action) => {
  switch (action.type) {
    case "todo/init":
      return [...action.todos];
    case "todo/add":
      return [...todos, action.todo];
    case "todo/delete":
      return todos.filter((todo) => {
        return todo.id !== action.todo.id;
      });
    case "todo/update":
      return todos.map((_todo) => {
        return _todo.id === action.todo.id
          ? { ..._todo, ...action.todo }
          : { ..._todo };
      });
    default:
      return todos;
  }
};

const TodoProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [loading, setLoading] = useState(true);

  // ********** note ********** //
  // ● Side effects(like http request) are dealt inside of useEffect.
  // ● Second empty argument means it renders only onece
  // ********** //
  // ● Call back of .then comes back with "result.data".
  // async getAll() {
  //   const result = await axios.get(ENDPOINT_URL);
  //   return result.data;
  // },
  // ********** note ********** //

  useLayoutEffect(() => {
    todoApi.getAll()
    .then((todos) => {
      dispatch({type: 'todo/init', todos: todos})
      setLoading(false);
    })
  }, [])

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <todoContext.Provider value={todos}>
      <todoDispatchContext.Provider value={dispatch}>
        {children}
      </todoDispatchContext.Provider>
    </todoContext.Provider>
  );
};

const useTodos = () => useContext(todoContext);
const useDispatchTodos = () => useContext(todoDispatchContext);

export { useTodos, useDispatchTodos, TodoProvider };
