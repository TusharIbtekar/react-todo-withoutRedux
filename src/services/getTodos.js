const getTodos = () => {
  const todos = JSON.parse(localStorage.getItem('todos'));
  return todos;
};

export default getTodos;
