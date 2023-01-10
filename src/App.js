import Todo from "./components/Todo";
import './api/todo'

import './style/index.css';

function App() {
  return (
    <div className="app">
      <div className="right__part">
        <Todo />
      </div>
      <div>
        <h2>Reminder</h2>
        <div className="rule">
          <h4>1. You cannot delete the preset data</h4>
          <h4>2. You cannot edit the preset data</h4>
          <h4>3. You can edit the name of items by double clicking</h4>
          <h4>4. Your item is to be added at the bottom</h4>
          <h4>5. Enjoy your trip</h4>
        </div>
      </div>
    </div>
  );
}

export default App;
