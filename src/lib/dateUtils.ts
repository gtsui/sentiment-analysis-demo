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
  return d.toUTCString();
};
