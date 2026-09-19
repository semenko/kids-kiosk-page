const dateElement = document.querySelector("#today");

if (dateElement) {
  dateElement.textContent = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date());
}
