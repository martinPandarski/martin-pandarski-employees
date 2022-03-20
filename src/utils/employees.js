import moment from "moment";
import { getDays } from "./days";
import { getEmployeeInfo } from "./employeeInfo";

export function pairWorkedLongest(parsedData = []) {
  let employeePairs = {};
  parsedData
    .sort(
      (firstEmployee, secondEmployee) =>
        Number(firstEmployee.projectId) - Number(secondEmployee.projectId)
    )
    .forEach((employee, i, arr) => {
      if (
        i === arr.length - 1 ||
        employee?.projectId !== arr[i + 1]?.projectId
      ) {
        return;
      }
      if (!getEmployeeInfo(employee, arr[i + 1])) {
        return;
      }
      employeePairs[employee.projectId] = {
        employees: [employee, arr[i + 1]],
        daysWorked: 0,
      };
    });
  if (Object.keys(employeePairs).length < 1) {
    return null;
  }
  const daysSpentWorkingTogether = Object.values(employeePairs).map(
    (employeePair) => {
      const { employees } = employeePair;
      const employee1 = employees[0];
      const employee2 = employees[1];

      let employee1day = moment(employee1.dateFrom).isSame(employee2.dateFrom)
        ? employee1.dateFrom
        : 0;
      let employee2day = moment(employee1.dateTo).isSame(employee2.dateTo)
        ? employee1.dateTo
        : 0;

      if (employee1.dateFrom < employee2.dateFrom) {
        employee1day = employee2.dateFrom;
      }
      if (employee1.dateFrom > employee2.dateFrom) {
        employee1day = employee1.dateFrom;
      }

      if (employee1.dateTo < employee2.dateTo) {
        employee2day = employee1.dateTo;
      }
      if (employee1.dateTo > employee2.dateTo) {
        employee2day = employee2.dateTo;
      }

      const daysWorked = getDays(employee1day, employee2day);

      return {
        daysWorked,
        employees,
      };
    }
  );

  let totalSum = 0;
  daysSpentWorkingTogether.forEach((employeePair) => {
    if (employeePair.daysWorked > totalSum) {
      totalSum = employeePair.daysWorked;
    }
  });
  const pairToDisplay = daysSpentWorkingTogether.find(
    (pair) => pair.daysWorked === totalSum
  );

  return pairToDisplay;
}
