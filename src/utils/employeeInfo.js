import moment from "moment";

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
