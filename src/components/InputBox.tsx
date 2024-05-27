import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react"; 
import { useTodoContext } from "../context/TodoProvider";

type IProps = {
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
  todos: TodoType[];
};
const InputBox: React.FC<IProps> = ({ setTodos, todos }) => {
  const [todoInput, setTodoInput] = useState<string>("");
  const { postNewTodo } = useTodoContext();

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    console.log(todoInput);
    const todoRaw: TodoPostType = { name: todoInput, isDone: false };
    todoInput.trim() && postNewTodo(todoRaw);
    setTodoInput("");
  };

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      gap={1}
      alignSelf={"stretch"}
      component={"form"}
      onSubmit={handleSubmit}
    >
      <TextField
        autoFocus
        fullWidth
        placeholder="New Todo"
        value={todoInput}
        onChange={(e) => setTodoInput(e.target.value)}
      />
      <Button
        type="submit"
        variant="contained"
        color="secondary"
        disabled={!todoInput.trim() }
        sx={{ whiteSpace: "nowrap" }}
      >
        ADD TODO
      </Button>
    </Box>
  );
};

export default InputBox;
