import app from "./src/app.js";

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(
    `The server is running on port ${port}. Look in the browser to see my Nodemon API.`,
  );
});
