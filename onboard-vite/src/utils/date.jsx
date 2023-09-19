const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "full",
  timeStyle: "short",
  hour12: true,
});

export const formatDate = (date) => {
  return dateFormatter.format(new Date(date));
};
