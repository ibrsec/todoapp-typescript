import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { TodoPostType, TodoType } from "../types";
import axios from "axios";
import { swalError, swalSuccess } from "../helper/SwalMessages";

// Varsayılan değer
const defaultTodos: TodoType[] = [];

type TodoContextType = {
  todos: TodoType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
  postNewTodo: (todoRaw: TodoPostType)=> Promise<void>;
  loading: boolean;
  error: boolean;
  deleteTodo: (id: number) => Promise<void>,
  putTodo: (id: number,todoRaw:TodoPostType) => Promise<void>,

};

// Bağlamı oluşturun ve varsayılan değerleri belirleyin
const TodoContext = createContext<TodoContextType>({
  todos: defaultTodos,
  setTodos: () => {},
  postNewTodo: async () => {},
  deleteTodo: async () => {},
  putTodo: async () => {},
  loading: false,
  error: false,
});

// TodoProvider bileşeni, children prop'unu alır
const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<TodoType[]>(defaultTodos);
  const [loading, setLoading] = useState<boolean>(false);
  // eslint-disable-next-line
  const [error, setError] = useState<boolean>(false);

  const getTodos = async () => {
    setLoading(true);
    try {
      const response = await axios.get(process.env.REACT_APP_BASE_URL!);

      console.log("getTodos response = ", response);
      setTodos(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      swalError("Getting todos is failed!!")

      console.log(error);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);
  console.log("todos =", todos);

  const postNewTodo = async (todoRaw: TodoPostType) => {
    setLoading(true);
    try {
      const response = await axios.post(
        process.env.REACT_APP_BASE_URL!,
        todoRaw
      );
      console.log("post new todo response = ", response);
      getTodos();
      setLoading(false);
      swalSuccess("A new Todo is added!")
    } catch (error) {
      setLoading(false);
      swalError("Post is failed!!")
      console.log(error);
    }
  };
  const deleteTodo = async (id: number) => {
    setLoading(true);
    try {
      const response = await axios.delete(
        process.env.REACT_APP_BASE_URL!+"/"+id );
      console.log("delete todo response = ", response);
      getTodos();
      setLoading(false);
      swalSuccess("Task is deleted!")
    } catch (error) {
      swalError("Delete is failed!!")
      setLoading(false);
      console.log(error);
    }
  };
  const putTodo = async (id: number,todoRaw:TodoPostType) => {
    setLoading(true);
    try {
      const response = await axios.put(
        process.env.REACT_APP_BASE_URL!+"/"+id , todoRaw);
      console.log("put todo response = ", response);
      getTodos();
      setLoading(false);

      swalSuccess(`Task status is changed to ${todoRaw.isDone ? "done" : "inprogress"}`)
    } catch (error) {
      swalError("Put is failed!!")
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <TodoContext.Provider value={{ todos, setTodos, postNewTodo,loading,error,deleteTodo,putTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

// useTodoContext adlı özel hook'u tanımlayın
export const useTodoContext = () => {
  return useContext<TodoContextType>(TodoContext);
};

export { TodoProvider };

// import React, {
//   createContext,
//   useState,
//   ReactNode,
//   useContext,
//   useEffect,
// } from "react";
// import { TodoPostType, TodoType } from "../types";
// import axios from "axios"; 

// // Varsayılan değer
// const defaultTodos: TodoType[] = [];

// type TodoContextType = {
//   todos: TodoType[];
//   setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
//   postNewTodo: (todoRaw: TodoPostType) => Promise<void>;
//   loading: boolean;
//   error: boolean;
// };

// // Bağlamı oluşturun ve varsayılan değerleri belirleyin
// const TodoContext = createContext<TodoContextType>({
//   todos: defaultTodos,
//   setTodos: () => {},
//   postNewTodo: async () => {},
//   loading: false,
//   error: false,
// });

// // TodoProvider bileşeni, children prop'unu alır
// const TodoProvider = ({ children }: { children: ReactNode }) => {
//   const [todos, setTodos] = useState<TodoType[]>(defaultTodos);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<boolean>(false);

//   const getTodos = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(process.env.REACT_APP_BASE_URL!);

//       console.log("getTodos response = ", response);
//       setTodos(response.data);
//       setLoading(false);
//     } catch (error) {
//       setLoading(false);
//       setError(true);
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getTodos();
//   }, []);
//   console.log("todos =", todos);

//   const postNewTodo = async (todoRaw: TodoPostType) => {
//     setLoading(true);
//     try {
//       const response = await axios.post(process.env.REACT_APP_BASE_URL!, todoRaw);
//       console.log('post new todo response = ', response);
//       await getTodos();
//       setLoading(false);
//     } catch (error) {
//       setLoading(false);
//       setError(true);
//       console.log(error);
//     }
//   };

//   return (
//     <TodoContext.Provider value={{ todos, setTodos, postNewTodo, loading, error }}>
//       {children}
//     </TodoContext.Provider>
//   );
// };

// // useTodoContext adlı özel hook'u tanımlayın
// export const useTodoContext = () => {
//   return useContext<TodoContextType>(TodoContext);
// };

// export { TodoProvider };
