import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid";
import { TodoType } from "../types";
import { useTodoContext } from "../context/TodoProvider";
import { ReactNode } from "react";
import { swalEdit } from "../helper/SwalMessages";
import BorderColorIcon from "@mui/icons-material/BorderColor";
type IProps = {
  todos: TodoType[];
};

const Todos: React.FC<IProps> = ({ todos }) => {
  const { deleteTodo, putTodo } = useTodoContext();

 
  const handleEdit = async(todo : TodoType) => {
    const newTaskName = await swalEdit(todo.name);
    newTaskName && putTodo(todo.id, {name:newTaskName, isDone:todo.isDone})
  };
  return (
    <Grid
      container
      spacing={2}
      justifyContent={"center"}
      alignItems={"start"}
      mt={4}
      alignSelf={"stretch"}
      gap={1}
    >
      <Grid item border={2} borderRadius={3} xs={9} md={5}>
        <Typography color={"blue"} align="center">
          Inprogress Todos
        </Typography>
        <List
          sx={{
            paddingRight: "1rem",
            paddingBottom: "1rem",
            minHeight: "10rem",
          }}
        >
          {todos.filter((todo) => !todo.isDone).length > 0 ? (
            todos
              .filter((todo) => !todo.isDone)
              .map(
                (todo, index): ReactNode => (
                  <ListItem
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingRight: "1.5rem",
                      borderRadius: "5px",
                      transiiton: ".5s all",
                      ":hover": {
                        backgroundColor: "bisque",
                      },
                    }}
                  >
                    <Box
                      flexGrow={1}
                      onClick={() =>
                        putTodo(todo.id, {
                          name: todo.name,
                          isDone: !todo.isDone,
                        })
                      }
                      sx={{ cursor: "pointer", textTransform: "capitalize" }}
                    >
                      {todo.name}
                    </Box>
                    <Box>
                      <BorderColorIcon
                        onClick={()=>handleEdit(todo)}
                        sx={{
                          color: "gray",
                          cursor: "pointer",
                          ":hover": { color: "purple" },
                          transition: ".5s all",
                          marginRight: "5px",
                        }}
                      />
                      <DeleteIcon
                        onClick={() => deleteTodo(todo.id)}
                        sx={{
                          color: "gray",
                          cursor: "pointer",
                          ":hover": { color: "purple" },
                          transition: ".5s all",
                        }}
                      />
                    </Box>
                  </ListItem>
                )
              )
          ) : (
            <Typography align="center" color={"red"} my={3}>
              There is no inprogress Task
            </Typography>
          )}
        </List>
      </Grid>
      <Grid item border={2} borderRadius={3} xs={9} md={5}>
        <Typography color="green" align="center">
          Completed Todos
        </Typography>
        <List
          sx={{
            paddingRight: "1rem",
            paddingBottom: "1rem",
            minHeight: "10rem",
          }}
        >
          {todos.filter((todo) => todo.isDone).length > 0 ? (
            todos
              .filter((todo) => todo.isDone)
              .map(
                (todo, index): ReactNode => (
                  <ListItem
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingRight: "1.5rem",
                      borderRadius: "5px",
                      transiiton: ".5s all",
                      ":hover": {
                        backgroundColor: "bisque",
                      },
                    }}
                  >
                    <Box
                      flexGrow={1}
                      onClick={() =>
                        putTodo(todo.id, {
                          name: todo.name,
                          isDone: !todo.isDone,
                        })
                      }
                      sx={{ cursor: "pointer", textTransform: "capitalize" }}
                    >
                      {todo.name}
                    </Box>
                    <Box>
                    <BorderColorIcon
                        onClick={()=>handleEdit(todo)}
                        sx={{
                          color: "gray",
                          cursor: "pointer",
                          ":hover": { color: "purple" },
                          transition: ".5s all",
                          marginRight: "5px",
                        }}
                      />
                      <DeleteIcon
                        onClick={() => deleteTodo(todo.id)}
                        sx={{
                          color: "gray",
                          cursor: "pointer",
                          ":hover": { color: "purple" },
                          transition: ".5s all",
                        }}
                      />
                    </Box>
                  </ListItem>
                )
              )
          ) : (
            <Typography align="center" color={"red"} my={3}>
              There is no completed Task
            </Typography>
          )}
        </List>
      </Grid>
    </Grid>
  );
};

export default Todos;
