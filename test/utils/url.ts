import { BASE_PATH } from "./constants";

export const buildUrl = (segment: string) => {
  console.log('BUG_ID=', process.env.BUG_ID)
  if (process.env.BUG_ID) {
    return `${BASE_PATH}/${segment}?bug_id=${process.env.BUG_ID}`;
  }

  return `${BASE_PATH}/${segment}`;
}
