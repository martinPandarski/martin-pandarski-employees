export function getDays(day1, day2) {
  const time = Math.abs(day2 - day1);
  const daysWorkingTogether = Math.ceil(time / (1000 * 60 * 60 * 24));
  return daysWorkingTogether;
}
