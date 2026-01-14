import axios from "./axios";

import { EmployeeBaseData, EmployeeId } from "../types/employee.types";

export const getAllEmployeesApi = async () => {
  const response = await axios.get(`/employee`);
  return response.data;
};

export const createEmployeeApi = async (data: EmployeeBaseData) => {
  const response = await axios.post(`/employee`, data, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

export const getEmployeeApi = async (employeeId: EmployeeId) => {
  const response = await axios.get(`/employee/${employeeId}`);
  return response.data;
};

export const deleteEmployeeApi = async (employeeId: EmployeeId) => {
  const response = await axios.delete(`/employee/${employeeId}`);
  return response.data;
};

export const updateEmployeeApi = async (
  employeeId: EmployeeId,
  newData: EmployeeBaseData
) => {
  const response = await axios.patch(`/employee/${employeeId}`, newData, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};
