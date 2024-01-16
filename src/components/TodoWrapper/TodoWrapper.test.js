import { render, screen } from "@testing-library/react";
import TodoWrapper from "./TodoWrapper";

test("Renders Todo Wrapper", () => {
  render(<TodoWrapper />);
  const title = screen.getByText("Get Things Done !");
  expect(title).toBeInTheDocument();
});
