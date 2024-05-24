 
import Container from "@mui/material/Container"; 
import Stack from "@mui/material/Stack";
import Header from "../components/Header";
import InputBox from "../components/InputBox";
import Todos from "../components/Todos"; 
import { useTodoContext } from "../context/TodoProvider";


const Home :React.FC = () => { 
 
 
  const {todos,setTodos} = useTodoContext();
 
    
  console.log(todos);

 

  
  return (
    <Container maxWidth="xl" sx={{ margin: "1rem auto", }}>
      <Stack
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        direction={"column"}
        gap={2}
      >
        <Header />
        <InputBox   setTodos={setTodos} todos={todos} />
       <Todos todos={todos}   />
      </Stack>
    </Container>
  );
};

export default Home;
