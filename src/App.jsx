// App.jsx
import { Routes, Route} from "react-router-dom";
import TodoList from "./pages/TodoList";

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<TodoList />} />
      </Routes>
    </div>
  );
}

export default App;
