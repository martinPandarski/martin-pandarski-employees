import moment from "moment";
import { getDays } from "./days";

export function getEmployeeInfo(parsedData) {
  let res = [];
  for (let i = 0; i < parsedData.length; i++) {
    let currentEmployee = parsedData[i];
    for (let j = i + 1; j < parsedData.length; j++) {
      let nextEmployee = parsedData[j];
      if (currentEmployee.projectId === nextEmployee.projectId) {
        let currentEmployeeStartDay = moment(
          currentEmployee.dateFrom
        ).valueOf();
        let currentEmployeeEndDay = moment(currentEmployee.dateTo).valueOf();
        let nextEmployeeStartDay = moment(nextEmployee.dateFrom).valueOf();
        let nextEmployeeEndDay = moment(nextEmployee.dateTo).valueOf();
        if (
          currentEmployeeStartDay > nextEmployeeStartDay &&
          currentEmployeeEndDay < nextEmployeeEndDay &&
          nextEmployeeStartDay < currentEmployeeEndDay
        ) {
          const daysWorked = getDays(
            currentEmployeeStartDay,
            currentEmployeeEndDay
          );
          res.push({
            "empId #1": currentEmployee.empId,
            "empId #2": nextEmployee.empId,
            projectId: currentEmployee.projectId,
            daysWork: daysWorked,
          });
        }
        if (
          currentEmployeeStartDay < nextEmployeeStartDay &&
          currentEmployeeEndDay < nextEmployeeEndDay &&
          currentEmployeeEndDay > nextEmployeeStartDay
        ) {
          const daysWorked = getDays(
            nextEmployeeStartDay,
            currentEmployeeEndDay
          );
          res.push({
            "empId #1": currentEmployee.empId,
            "empId #2": nextEmployee.empId,
            projectId: nextEmployee.projectId,
            daysWork: daysWorked,
          });
        }
        if (
          currentEmployeeStartDay > nextEmployeeStartDay &&
          currentEmployeeEndDay > nextEmployeeEndDay
        ) {
          const daysWorked = getDays(
            currentEmployeeStartDay,
            nextEmployeeEndDay
          );
          res.push({
            "empId #1": currentEmployee.empId,
            "empId #2": nextEmployee.empId,
            projectId: nextEmployee.projectId,
            daysWork: daysWorked,
          });
        }
        if (
          currentEmployeeStartDay === nextEmployeeStartDay &&
          currentEmployeeEndDay > nextEmployeeEndDay
        ) {
          const daysWorked = getDays(nextEmployeeEndDay, nextEmployeeStartDay);
          res.push({
            "empId #1": currentEmployee.empId,
            "empId #2": nextEmployee.empId,
            projectId: nextEmployee.projectId,
            daysWork: daysWorked,
          });
        }
        if (
          currentEmployeeStartDay === nextEmployeeStartDay &&
          currentEmployeeEndDay < nextEmployeeEndDay
        ) {
          const daysWorked = getDays(
            currentEmployeeEndDay,
            nextEmployeeStartDay
          );
          res.push({
            "empId #1": currentEmployee.empId,
            "empId #2": nextEmployee.empId,
            projectId: nextEmployee.projectId,
            daysWork: daysWorked,
          });
        }
        if (
          currentEmployeeStartDay > nextEmployeeStartDay &&
          currentEmployeeEndDay === nextEmployeeEndDay
        ) {
          const daysWorked = getDays(
            currentEmployeeStartDay,
            currentEmployeeEndDay
          );
          res.push({
            "empId #1": currentEmployee.empId,
            "empId #2": nextEmployee.empId,
            projectId: nextEmployee.projectId,
            daysWork: daysWorked,
          });
        }
        if (
          currentEmployeeStartDay < nextEmployeeStartDay &&
          currentEmployeeEndDay === nextEmployeeEndDay
        ) {
          const daysWorked = getDays(
            nextEmployeeStartDay,
            currentEmployeeEndDay
          );
          res.push({
            "empId #1": currentEmployee.empId,
            "empId #2": nextEmployee.empId,
            projectId: nextEmployee.projectId,
            daysWork: daysWorked,
          });
        }
        if (
          currentEmployeeStartDay === nextEmployeeStartDay &&
          currentEmployeeEndDay === nextEmployeeEndDay
        ) {
          const daysWorked = getDays(
            nextEmployeeStartDay,
            currentEmployeeEndDay
          );
          res.push({
            "empId #1": currentEmployee.empId,
            "empId #2": nextEmployee.empId,
            projectId: nextEmployee.projectId,
            daysWork: daysWorked,
          });
        }
      }
    }
  }
  return res.sort(
    (firstEmployee, secondEmployee) =>
      secondEmployee.daysWork - firstEmployee.daysWork
  );
}
