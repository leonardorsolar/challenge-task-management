import { Router } from "express";
import userRouter from "../../../../modules/user/presentation/routes/user.routes";
import authRoutes from "../../../../modules/auth/presentation/routes/authRoutes";

const v1Router = Router();

v1Router.get("/", (req, res) => {
  res.json("Api v1Router");
});

//Register routes
// api/v1/message
v1Router.use("/users", userRouter);
v1Router.use("/auth", authRoutes);

export default v1Router;
