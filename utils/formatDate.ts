const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const formatDate = (date: Date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const monthName = month[d.getMonth()];
  const day = d.getDate();

  return { year, monthName, day };
};
