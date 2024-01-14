/**
 *
 * @param ts UNIX timestamp in seconds
 */
export const toDateObj = (ts: number) => {
  return new Date(ts * 1000);
};

/**
 *
 * @param ts UNIX timestamp in seconds
 */
export const toDateStr = (ts: number) => {
  let d = toDateObj(ts);
  return d.toISOString().split("T")[0];
};

export const toDateTimeStr = (ts: number) => {
  let d = toDateObj(ts);

  // Extracting individual components
  let day = d.getUTCDate().toString().padStart(2, "0");
  let month = d.toLocaleString("en-us", { month: "short" });
  let year = d.getUTCFullYear().toString().slice(-2);
  let hours = d.getUTCHours().toString().padStart(2, "0");
  let minutes = d.getUTCMinutes().toString().padStart(2, "0");

  // Constructing the formatted string
  return `${day} ${month} '${year}, ${hours}:${minutes} GMT`;
};
