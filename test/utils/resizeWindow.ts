import { fireEvent } from "@testing-library/dom";

export const resize = (width: number, height?: number) =>{
  global.window.innerWidth = width;
  if (height) {
    global.window.innerHeight = height;
  }
  fireEvent(window, new Event('resize'))
  window.dispatchEvent(new Event('resize'));
}
