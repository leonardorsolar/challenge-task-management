import { Router } from "express";
import taskRouter from "../../../../modules/task/presentation/routes/task.routes";

const v1Router = Router();

v1Router.get("/", (req, res) => {
  res.json("Api v1Router");
});

//Register routes
// api/v1/message
v1Router.use("/task", taskRouter);

export default v1Router;
