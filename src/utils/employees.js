import moment from "moment";
import { getDays } from "./days";

export function getEmployeeInfo(employee1, employee2) {
  if (
    moment(employee1.DateFrom).isBetween(employee2.DateFrom, employee2.DateTo)
  )
    return true;

  if (
    moment(employee2.DateFrom).isBetween(employee1.DateFrom, employee1.DateTo)
  )
    return true;

  if (moment(employee1.DateFrom).isSame(employee2.DateFrom)) return true;

  return false;
}

export function pairWorkedLongest(parsedData = []) {
  let pairs = {};
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
      pairs[employee.projectId] = {
        employees: [employee, arr[i + 1]],
        daysWorked: 0,
      };
    });
  const pairsLength = Object.keys(pairs).length;
  if (pairsLength < 1) {
    return null;
  }
  const calcDaysWorkedTogether = Object.values(pairs).map((employeePair) => {
    const { employees } = employeePair;
    const emp1 = employees[0];
    const emp2 = employees[1];

    let employee1day = moment(emp1.dateFrom).isSame(emp2.dateFrom)
      ? emp1.dateFrom
      : 0;
    let employee2day = moment(emp1.dateTo).isSame(emp2.dateTo)
      ? emp1.dateTo
      : 0;

    if (emp1.dateFrom < emp2.dateFrom) {
      employee1day = emp2.dateFrom;
    }
    if (emp1.dateFrom > emp2.dateFrom) {
      employee1day = emp1.dateFrom;
    }

    if (emp1.dateTo < emp2.dateTo) {
      employee2day = emp1.dateTo;
    }
    if (emp1.dateTo > emp2.dateTo) {
      employee2day = emp2.dateTo;
    }

    const daysWorked = getDays(employee1day, employee2day);

    return {
      daysWorked,
      employees,
    };
  });

  let biggestSum = 0;
  calcDaysWorkedTogether.forEach((employeePair) => {
    if (employeePair.daysWorked > biggestSum) {
      biggestSum = employeePair.daysWorked;
    }
  });
  const pairToDisplay = calcDaysWorkedTogether.find(
    (pair) => pair.daysWorked === biggestSum
  );

  return pairToDisplay;
}
