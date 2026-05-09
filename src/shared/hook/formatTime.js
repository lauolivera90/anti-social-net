export const formatTime = (date) => {
  const now = new Date();
  const postDate = new Date(date);
  const differenceMilliseconds = now - postDate;
  const differenceSeconds = Math.floor(differenceMilliseconds / 1000);
  const differenceMinutes = Math.floor(differenceSeconds / 60);
  const differenceHours = Math.floor(differenceMinutes / 60);
  const differenceDays = Math.floor(differenceHours / 24);
  const differenceYears = now.getFullYear() - postDate.getFullYear();

  if (differenceSeconds < 60) return `${differenceSeconds}s`;
  if (differenceMinutes < 60) return `${differenceMinutes}m`;
  if (differenceHours < 24) return `${differenceHours}h`;
  if (differenceDays < 7) return `${differenceDays}d`;

  const options = differenceYears >= 1
    ? { day: "2-digit", month: "short", year: "numeric" } 
    : { day: "2-digit", month: "short" };

  return postDate.toLocaleDateString("en-US", options);
};