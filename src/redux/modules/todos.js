// Action value
const ADD_TODO = "ADD_TODO";
const DEL_TODO = "DEL_TODO";
const DONE_TODO = "DONE_TODO";

// Action Creator
export const addTodo = (payload) => {
  return { type: ADD_TODO, payload };
};

export const delTodo = (payload) => {
  return { type: DEL_TODO, payload };
};

export const doneTodo = (payload) => {
  return { type: DONE_TODO, payload };
};

const initialState = [
  {
    id: 1,
    title: "리액트 강의보기",
    detail: "챕터 1부터 챕터 12까지 학습",
    isDone: false,
  },
  {
    id: 2,
    title: "점심 먹기",
    detail: "점심 뭐먹지..?",
    isDone: true,
  },
];

// Reducer
const todos = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return [...state, action.payload];
    case DEL_TODO:
      const deletTodo = state.filter((todo) => todo.id !== action.payload);
      return [...deletTodo];
    case DONE_TODO:
      const isDoneTodo = state.map((todo) => {
        if (todo.id === action.payload) {
          return { ...todo, isDone: !todo.isDone };
        } else {
          return todo;
        }
      });
      return [...isDoneTodo];
    default:
      return state;
  }
};

export default todos;
