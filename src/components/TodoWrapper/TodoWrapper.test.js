import { render, screen } from "@testing-library/react";
import TodoWrapper from "./TodoWrapper";
import React from "react";
import userEvent from "@testing-library/user-event";

test("Renders Todo Wrapper", () => {
  render(<TodoWrapper />);
  const title = screen.getByText("Get Things Done !");
  expect(title).toBeInTheDocument();
});

test("Renders Todo Mock Add Data", async () => {
  const mockData = [
    {
      id: Math.floor(Math.random() * 100),
      task: "Title 1",
      completed: false,
      isEditing: false,
    },
    {
      id: Math.floor(Math.random() * 100),
      task: "Title 2",
      completed: false,
      isEditing: false,
    },
  ];

  const setState = jest.fn();
  jest
    .spyOn(React, "useState")
    .mockImplementationOnce(() => [mockData, setState]);

  render(<TodoWrapper />);
  for (let data of mockData) {
    expect(screen.getByText(data.task)).toBeInTheDocument();
  }

  const buttonSubmit = screen.getByRole("button", { name: /add task/i });
  const inputEvent = screen.getByRole("textbox");

  await userEvent.type(inputEvent, "abcde");
  await userEvent.click(buttonSubmit);

  expect(setState).toHaveBeenCalledWith([
    ...mockData,
    {
      id: expect.any(Number),
      task: "abcde",
      completed: false,
      isEditing: false,
    },
  ]);
});

test("Renders Todo Mock Complete Data", async () => {
  const mockData = [
    {
      id: Math.floor(Math.random() * 100),
      task: "Title 1",
      completed: false,
      isEditing: false,
    },
    {
      id: Math.floor(Math.random() * 100),
      task: "Title 2",
      completed: false,
      isEditing: false,
    },
  ];

  const setState = jest.fn();
  jest
    .spyOn(React, "useState")
    .mockImplementationOnce(() => [mockData, setState]);

  render(<TodoWrapper />);
  for (let data of mockData) {
    expect(screen.getByText(data.task)).toBeInTheDocument();
  }

  const buttonToggle = screen.getByText(mockData[0].task);

  await userEvent.click(buttonToggle);

  expect(setState).toHaveBeenCalledWith([
    { ...mockData[0], completed: true },
    { ...mockData[1] },
  ]);
});

test("Renders Todo Mock Delete Data", async () => {
  const mockData = [
    {
      id: Math.floor(Math.random() * 100),
      task: "Title 1",
      completed: false,
      isEditing: false,
    },
    {
      id: Math.floor(Math.random() * 100),
      task: "Title 2",
      completed: false,
      isEditing: false,
    },
  ];

  const setState = jest.fn();
  jest
    .spyOn(React, "useState")
    .mockImplementationOnce(() => [mockData, setState]);

  render(<TodoWrapper />);
  for (let data of mockData) {
    expect(screen.getByText(data.task)).toBeInTheDocument();
  }

  const buttonDelete = screen.getAllByTestId("delete-icon");

  await userEvent.click(buttonDelete[0]);

  expect(setState).toHaveBeenCalledWith([
    {
      id: expect.any(Number),
      task: "Title 2",
      completed: false,
      isEditing: false,
    },
  ]);
});

test("Renders Todo Mock Toggle Edit Data", async () => {
  const mockData = [
    {
      id: Math.floor(Math.random() * 100),
      task: "Title 1",
      completed: false,
      isEditing: false,
    },
    {
      id: Math.floor(Math.random() * 100),
      task: "Title 2",
      completed: false,
      isEditing: false,
    },
  ];

  const setState = jest.fn();
  jest
    .spyOn(React, "useState")
    .mockImplementationOnce(() => [mockData, setState]);

  render(<TodoWrapper />);
  for (let data of mockData) {
    expect(screen.getByText(data.task)).toBeInTheDocument();
  }

  const buttonEdit = screen.getAllByTestId("edit-icon");

  await userEvent.click(buttonEdit[0]);

  expect(setState).toHaveBeenCalledWith([
    { ...mockData[0], isEditing: true },
    { ...mockData[1] },
  ]);
});

test("Renders Todo Mock Edit Data", async () => {
  const mockData = [
    {
      id: Math.floor(Math.random() * 100),
      task: "Title 1",
      completed: false,
      isEditing: true,
    },
    {
      id: Math.floor(Math.random() * 100),
      task: "Title 2",
      completed: false,
      isEditing: false,
    },
  ];

  const setState = jest.fn();
  jest
    .spyOn(React, "useState")
    .mockImplementationOnce(() => [mockData, setState]);

  render(<TodoWrapper />);

  const inputEdit = screen.getAllByTestId("edit-form-input");
  const buttonSubmit = screen.getAllByTestId("edit-form-submit");

  await userEvent.type(inputEdit[0], " testing");
  await userEvent.click(buttonSubmit[0]);

  expect(setState).toHaveBeenCalledWith([
    { ...mockData[0], isEditing: false, task: "Title 1 testing" },
    { ...mockData[1] },
  ]);
});
