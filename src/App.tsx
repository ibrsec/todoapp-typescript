import "./App.css";
import { TodoProvider } from "./context/TodoProvider";
import Home from "./pages/Home";
function App() {
  return (
    <div className="App">
      <TodoProvider>
        <Home />
      </TodoProvider>
    </div>
  );
}

export default App;
