
interface TodoPostType  {
  name: string;
  isDone:boolean;
}

interface TodoType extends TodoPostType {
 id: number; 
 createdAt?:Date
};


type GetTodosFn =  ()=> Promise<void>;