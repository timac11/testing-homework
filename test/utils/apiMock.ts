import {Product, ProductShortInfo} from "../../src/common/types";

export const generateProductList = (count: number): ProductShortInfo[] => {
  return new Array(count).fill(undefined).map((item, index) => ({
    id: index,
    price: index,
    name: `Name of Product ${index}`
  }))
}

export const generateProduct = (partial: Partial<Product> & { id: number, price: number }): Product => {
  return Object.assign(partial, {
    id: partial.id,
    price: partial.price,
    name: `Name of Product ${partial.id}`,
    description: `Description of Product ${partial.id}`,
    material: `Material of Product ${partial.id}`,
    color: `Color of Product ${partial.id}`
  })
}
