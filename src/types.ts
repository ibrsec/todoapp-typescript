export type TodoType = {
  id: number;
  name: string;
  isDone:boolean,
  createdAt?:Date
};

export type TodoPostType = {
  name: string;
  isDone:boolean;
}
