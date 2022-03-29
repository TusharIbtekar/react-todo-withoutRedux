const setTodos = (todos) => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

export default setTodos;
