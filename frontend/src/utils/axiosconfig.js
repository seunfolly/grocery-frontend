const getTokenFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

export const config = {
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NWZjYjY0N2E0NjAwZmY3ODdkMzVlYSIsImlhdCI6MTY4NjA0NDI0OSwiZXhwIjoxNjg2MTMwNjQ5fQ.RwpMI0F-0UnJ5Ml5tlPrK_rGf09yAZKILlTiAAc6VFU`,
    Accept: "application/json",
  },
};
