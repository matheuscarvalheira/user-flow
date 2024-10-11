import { render, screen } from "@testing-library/react";
import App from "./App";
import { beforeEach, expect } from "vitest";
import userEvent from "@testing-library/user-event";

import MockAdapter from "axios-mock-adapter";
import axios from "axios";

const mockAxios = new MockAdapter(axios);

describe("App", () => {

  beforeEach(() => {
    mockAxios.reset();
  })

  it("should render the component", () => {
    render(<App />);
    expect(screen.getByText("Cadastro")).toBeInTheDocument();
  });

  it("simulates invalid form submission", async () => {
    render(<App />);

    const nameInput = screen.getByLabelText("Nome");
    const submitButton = screen.getByRole("button", { name: /enviar/i });

    await userEvent.type(nameInput, "Luffy");
    await userEvent.click(submitButton);

    expect(
      screen.getByText("Por favor, informe o seu email")
    ).toBeInTheDocument();
  });

  it("validates invalid email field", async () => {
    render(<App />);

    const nameInput = screen.getByLabelText("Nome");
    const emailInput = screen.getByLabelText("E-mail");
    const submitButton = screen.getByRole("button", { name: /enviar/i });

    await userEvent.type(nameInput, "Luffy");
    await userEvent.type(emailInput, "gomo gomo no mi");
    await userEvent.click(submitButton);

    expect(
      screen.getByText("Por favor, informe um e-mail válido")
    ).toBeInTheDocument();
  });

  it("should submit the form", async () => {
    //AAA -> Arrange, Act, Assert
    //Arrange
    
    mockAxios.onPost("http://localhost:3000/users").reply(200);

    render(<App />);
    const nameInput = screen.getByLabelText("Nome");
    const emailInput = screen.getByLabelText("E-mail");
    const passwordInput = screen.getByLabelText("Senha");
    const confirmPasswordInput = screen.getByLabelText("Confirme sua senha");

    const submitButton = screen.getByRole("button", { name: /enviar/i });

    //Act
    await userEvent.type(nameInput, "Luffy");
    await userEvent.type(emailInput, "luffy@gmail.com");
    await userEvent.type(passwordInput, "12345678");
    await userEvent.type(confirmPasswordInput, "12345678");

    await userEvent.click(submitButton);

    //Assert
    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].url).toBe("http://localhost:3000/users");
  });
});
