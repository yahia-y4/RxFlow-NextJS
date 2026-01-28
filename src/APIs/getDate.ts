

export function getCurrentDateArabicIntl() {
  return new Date().toLocaleDateString("ar-EG", {
    weekday: "long",
    day: "numeric",
    month: "long"
  });
}