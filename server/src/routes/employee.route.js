import { Router } from "express";
import { employeeController as controller } from "../controllers/employee.controller.js";

const router = Router();

router.get("/employee", controller.getAll);

router.get("/employee/:_id", controller.getOne);

router.post("/employee", controller.create);

router.delete("/employee/:_id", controller.delete);

router.patch("/employee/:_id", controller.update);

export default router;
