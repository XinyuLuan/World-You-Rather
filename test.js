const getTodo = () => {
  setTimeout(() => {
    return { text: "Complete Code Example" };
  }, 2000);
};

const todo = getTodo()
console.log(todo.text);
