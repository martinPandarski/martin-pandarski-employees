import moment from "moment";

export function getDays(day1, day2) {
  const time = moment(day2).diff(moment(day1));
  const daysWorkingTogether = Math.floor(time / (1000 * 60 * 60 * 24));
  return daysWorkingTogether;
}
