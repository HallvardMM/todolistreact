export function save(state) {
  window.localStorage.setItem("ToDoList-storage", JSON.stringify(state));
}

export function load() {
  let result = window.localStorage.getItem("ToDoList-storage");
  if (result !== null) {
    return JSON.parse(result);
  }
  return { user: "", loggedIn: false, admin: false };
}
