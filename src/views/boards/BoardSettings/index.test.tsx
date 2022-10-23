import { screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { render } from "#utils/testing/render"
import { testUsers } from "#utils/testing/test-users"
import { App } from "#views/index"

describe("Budget categories", () => {
  test("A category is edited correctly.", async () => {
    await render(<App />, { iAm: testUsers.jessicaStark.id, initialUrl: "/boards/2/settings" })

    expect(await screen.findByText("salary")).toBeInTheDocument()
    await waitFor(() => userEvent.click(screen.getByTestId("salary-income-category-edit-button")))
    expect(screen.getByRole("dialog")).toBeInTheDocument()
    expect(screen.getByLabelText("Name")).toHaveValue("salary")
    expect(await screen.findByLabelText("income")).toBeChecked()
    await waitFor(() => userEvent.clear(screen.getByLabelText("Name")))
    await waitFor(() => userEvent.type(screen.getByLabelText("Name"), "casino"))
    await waitFor(() => userEvent.click(screen.getByLabelText("expense")))
    userEvent.click(screen.getByText("Submit"))
    await waitForElementToBeRemoved(() => screen.getByRole("dialog"))
    expect(await screen.findByText("casino")).toBeInTheDocument()
    expect(screen.getByTestId("casino-expense-category-edit-button")).toBeInTheDocument()
    expect(screen.queryByText("salary")).not.toBeInTheDocument()
  })

  test("case: user tries to create a category that already exists and then fixes input values.", async () => {
    await render(<App />, { iAm: testUsers.johnDoe.id, initialUrl: "/boards/1/settings" })

    expect(await screen.findByText("education")).toBeInTheDocument()
    await waitFor(() => userEvent.click(screen.getByTestId("education-expense-category-edit-button")))
    expect(screen.getByRole("dialog")).toBeInTheDocument()
    expect(screen.getByLabelText("Name")).toHaveValue("education")
    expect(await screen.findByLabelText("expense")).toBeChecked()
    await waitFor(() => userEvent.clear(screen.getByLabelText("Name")))
    await waitFor(() => userEvent.type(screen.getByLabelText("Name"), "clothes"))
    userEvent.click(screen.getByText("Submit"))
    expect(await screen.findAllByText('"clothes" expense category already exists in this board.')).toHaveLength(2)
    await waitFor(() => userEvent.clear(screen.getByLabelText("Name")))
    await waitFor(() => userEvent.type(screen.getByLabelText("Name"), "shoes"))
    expect(await screen.findAllByText('"clothes" expense category already exists in this board.')).toHaveLength(1)
    userEvent.click(screen.getByText("Submit"))
    await waitForElementToBeRemoved(() => screen.getByRole("dialog"))
    expect(await screen.findByText("shoes")).toBeInTheDocument()
  })
})
