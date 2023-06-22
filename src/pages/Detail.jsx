import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

function Detail() {
  const param = useParams();
  const navigate = useNavigate();
  const todos = useSelector((state) => state.todos);
  console.log(todos);
  console.log(param);
  const todo = todos.find((t) => {
    return t.id == param.id;
  });
  console.log(todo);

  return (
    <StLayout>
      <p>ID:{param.id}</p>
      <h3>{todo.title}</h3>
      <p>{todo.detail}</p>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        이전으로
      </button>
    </StLayout>
  );
}

const StLayout = styled.div`
  max-width: 1200px;
  min-width: 800px;
  margin: 0 auto;
`;

export default Detail;
