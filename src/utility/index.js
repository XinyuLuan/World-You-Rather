export { formatQuestion, formatUser } from "../data/data.js";

export function formatDate(timestamp) {
  const date = new Date(timestamp);
  const time = date.toLocaleTimeString("en-US");
  return `${time.substr(0, 5) + time.slice(-2)} | ${date.toLocaleDateString()}`;
}

export function getPercentage(decimal) {
  return Math.round(decimal * 100);
}
