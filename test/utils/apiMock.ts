import {ProductShortInfo} from "../../src/common/types";

export const generateProducts = (count: number): ProductShortInfo[] => {
  return new Array(count).fill(undefined).map((item, index) => ({
    id: index,
    price: index,
    name: `Name of Product ${index}`
  }))
}
