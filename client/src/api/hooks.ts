import { useQuery } from "@tanstack/react-query";
import { getAllEmployeesApi, getEmployeeApi } from "./api-services";
import { KEYS } from "./keys";
import { EmployeeId } from "../types/employee.types";

export const useAllEmployee = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: [KEYS.ALL_EMPLOYEE],
    queryFn: getAllEmployeesApi,
  });

  return { data, isLoading, error };
};

export const useEmployee = (employeeId: EmployeeId) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [KEYS.EMPLOYEE, employeeId],
    queryFn: () => getEmployeeApi(employeeId),
    enabled: !!employeeId,
  });

  return { data, isLoading, error };
};
