import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import uuid from "react-uuid";
import { addTodo, delTodo, doneTodo } from "../redux/modules/todos";

function Home() {
  // todos 선택
  const todos = useSelector((state) => state.todos);
  // console.log(todos);
  // dispatch 생성
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");

  const addBtnHandler = function (event) {
    event.preventDefault();
    if (title !== "" && detail !== "") {
      dispatch(
        addTodo({
          id: uuid(),
          title,
          detail,
          isDone: false,
        })
      );
      setTitle("");
      setDetail("");
    } else {
      alert("제목과 내용을 입력하세요.");
    }
  };

  return (
    <StLayout>
      <StHeader>
        <h1>헤더입니다.</h1>
      </StHeader>
      <main>
        <form onSubmit={addBtnHandler}>
          <label>제목</label>
          <input
            type="text"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          <label>내용</label>
          <input
            type="text"
            value={detail}
            onChange={(event) => {
              setDetail(event.target.value);
            }}
          />
          <button type="submit">추가하기</button>
        </form>
        <section>
          <h2>working</h2>
          {todos
            .filter((todo) => {
              return todo.isDone === false;
            })
            .map((todo) => {
              return (
                <StTodo key={todo.id}>
                  <Link to={`/detail/${todo.id}`}>상세보기</Link>
                  <h3>{todo.title}</h3>
                  <p>{todo.detail}</p>
                  <div>
                    <button
                      onClick={() => {
                        dispatch(delTodo(todo.id));
                      }}
                    >
                      삭제
                    </button>
                    <button
                      onClick={() => {
                        dispatch(doneTodo(todo.id));
                      }}
                    >
                      {todo.isDone ? "취소" : "완료"}
                    </button>
                  </div>
                </StTodo>
              );
            })}
          <h2>done</h2>
          {todos
            .filter((todo) => {
              return todo.isDone === true;
            })
            .map((todo) => {
              return (
                <StTodo key={todo.id}>
                  <Link to={`/detail/${todo.id}`} todo={todo}>
                    상세보기
                  </Link>
                  <h3>{todo.title}</h3>
                  <p>{todo.detail}</p>
                  <div>
                    <button
                      onClick={() => {
                        dispatch(delTodo(todo.id));
                      }}
                    >
                      삭제
                    </button>
                    <button
                      onClick={() => {
                        dispatch(doneTodo(todo.id));
                      }}
                    >
                      {todo.isDone ? "취소" : "완료"}
                    </button>
                  </div>
                </StTodo>
              );
            })}
          {/* <button onClick={dispatch(delTodo({ todos }))}>삭제</button> */}
        </section>
      </main>
      <StFooter>푸터입니다.</StFooter>
    </StLayout>
  );
}

const StLayout = styled.div`
  max-width: 1200px;
  min-width: 800px;
  margin: 0 auto;
`;

const StHeader = styled.header`
  background-color: gray;
  padding: 20px;
`;

const StFooter = styled.footer`
  background-color: gray;
  padding: 20px;
`;

const StTodo = styled.div`
  background-color: green;
  border-radius: 10px;
  margin: 10px;
  padding: 20px;
`;

export default Home;
