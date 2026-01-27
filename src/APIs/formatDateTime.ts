export const formatDateTime = (dateString: string) => {
  return new Date(dateString).toLocaleString("EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};