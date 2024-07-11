export const calculateTimePassed = (then) => {
  const now = new Date();
  const diffInMs = now - then;

  const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffInMs % (1000 * 60)) / 1000);

  let timePassedString = "";
  if (days > 0) {
    timePassedString += `${days} day${days > 1 ? "s" : ""}`;
    if (hours > 0) {
      timePassedString += `, ${hours} hour${hours > 1 ? "s" : ""}`;
    }
  } else if (hours > 0) {
    timePassedString += `${hours} hour${hours > 1 ? "s" : ""}`;
    if (minutes > 0) {
      timePassedString += `, ${minutes} minute${minutes > 1 ? "s" : ""}`;
    }
  } else {
    timePassedString += `${minutes} minute${minutes > 1 ? "s" : ""}`;
    if (seconds > 0) {
      timePassedString += `, ${seconds} second${seconds > 1 ? "s" : ""}`;
    }
  }

  return timePassedString;
};

export function getTodayFormatted() {
  const today = new Date();

  const month = today.toLocaleDateString("en-US", { month: "long" }); // Get month name (e.g., January)
  const day = today.getDate().toString().padStart(2, "0"); // Get day with two-digit padding (e.g., 01)

  return `${month} ${day}`;
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
