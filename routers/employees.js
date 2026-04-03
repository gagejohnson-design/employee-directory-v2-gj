import { Router } from "express";
import employees from "#db/employees";

const router = Router();

router.get("/", (req, res) => {
  res.send(employees);
});

router.get("/random", (req, res) => {
  const randomIndex = Math.floor(Math.random() * employees.length);
  const randomEmployee = employees[randomIndex];
  res.send(randomEmployee);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const employee = employees.find((employee) => employee.id === id);

  if (!employee) {
    return res.status(404).send("Employee not found.");
  }

  res.send(employee);
});

router.post("/", (req, res) => {
  const { name } = req.body ?? {};

  if (typeof name !== "string" || !name.trim()) {
    return res.status(400).send("Name is required.");
  }

  const newEmployee = {
    id: employees.length + 1,
    name: name.trim(),
  };

  employees.push(newEmployee);

  res.status(201).send(newEmployee);
});

export default router;
