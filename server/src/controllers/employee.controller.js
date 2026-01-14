import { EmployeeModel } from "../model/employee.model.js";

const getEmployees = async (_, res) => {
  try {
    const data = await EmployeeModel.find();
    return res.json(data);
  } catch (error) {
    console.error(`Error while fetching employee from server ${error}`);
    throw error;
  }
};

const getEmployee = async (req, res) => {
  const { _id } = req.params;

  try {
    const data = await EmployeeModel.findOne({ _id });

    if (!data) {
      throw new Error(
        `Employee doesn't exist with the following employeeId: ${_id}`
      );
    }

    return res.json(data);
  } catch (error) {
    console.error("Error while fetching employeeId", error);
    throw error;
  }
};

const createEmployee = async (req, res) => {
  const { avatarUrl, name, role, experience, gender, location } = req.body;

  try {
    if ([name, avatarUrl, role, gender, location, experience].includes("")) {
      res.send("All fields are required!");
      throw new Error("All fields are required!");
    }

    if (!avatarUrl.includes("https")) {
      res.send("Please enter a valid url");
      throw new Error("Please enter a valid url");
    }

    const newEmployee = new EmployeeModel({
      avatarUrl,
      name,
      role,
      gender,
      experience,
      location,
    });

    await newEmployee.save();

    return res.json({
      status: 201,
      message: "employee created!",
      data: newEmployee,
    });
  } catch (error) {
    console.error(`Error while creating an employee: ${error}`);
    throw error;
  }
};

const deleteEmployee = async (req, res) => {
  const { _id } = req.params;

  try {
    const employee = await EmployeeModel.findOne({ _id });

    if (!employee) {
      throw new Error("Employee doesn't exist!");
    }

    const response = await EmployeeModel.findOneAndDelete({ _id });

    return res.json({ status: 200, data: response });
  } catch (error) {
    throw error;
  }
};

const updateEmployee = async (req, res) => {
  const { _id } = req.params;
  const updatedData = req.body;

  try {
    const employee = await EmployeeModel.findOne({ _id });

    if (!employee) {
      throw new Error(
        `Employee doesn't exist with the following empId: ${_id}`
      );
    }

    const response = await EmployeeModel.findOneAndUpdate(
      { _id },
      { $set: updatedData },
      { new: true }
    );

    return res.json({
      message: "employee information updated",
      data: response,
    });
  } catch (error) {
    console.error(`Error while updating employee information ${error}`);
    throw error;
  }
};

export const employeeController = {
  getOne: getEmployee,
  getAll: getEmployees,
  create: createEmployee,
  delete: deleteEmployee,
  update: updateEmployee,
};
