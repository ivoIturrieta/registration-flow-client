import "./App.css";
import { useState, useCallback, FC, Dispatch } from "react";
import { Input, FormType } from "./types";
import { validatePassword } from "./utils";
import axios from "axios";

const initialState: Input = {
  email: "",
  password: "",
  confirmPassword: "",
  name: ""
};

const Auth: FC<{ setIsAuth: Dispatch<React.SetStateAction<boolean>> }> = ({
  setIsAuth
}) => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState<Partial<Input>>();
  const [forType, setFormType] = useState<FormType>("login");
  const onSetFormType = useCallback(
    () => setFormType((prev) => (prev === "login" ? "register" : "login")),
    []
  );

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      if (validatePassword(form, setErrors, forType)) {
        axios
          .post(
            forType === "login"
              ? "http://localhost:3001/login"
              : "http://localhost:3001/auth",
            form
          )
          .then((res) => {
            localStorage.setItem("accessToken", res.data.accessToken);
            localStorage.setItem("name", res.data.name);
            setIsAuth(true);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    [form]
  );

  const handleChange = useCallback((event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  }, []);

  return (
    <div className="container">
      <div
        style={{
          transform: `translate(${forType === "login" ? 0 : 250}px, 0px)`
        }}
        className="form-div"
      >
        <form onSubmit={onSubmit}>
          <input
            onChange={handleChange}
            value={form.email}
            placeholder="Email"
            name="email"
            type="text"
          />
          {errors && <div className="text-danger">{errors.email}</div>}
          <input
            onChange={handleChange}
            value={form.password}
            placeholder="Password"
            name="password"
            type="password"
          />
          {errors && <div className="text-danger">{errors.password}</div>}
          {forType === "register" && (
            <>
              <input
                onChange={handleChange}
                value={form.confirmPassword}
                placeholder="Re-typed password"
                name="confirmPassword"
                type="password"
              />
              {errors && (
                <div className="text-danger">{errors.confirmPassword}</div>
              )}
              <input
                onChange={handleChange}
                value={form.name}
                name="name"
                placeholder="Name"
                type="text"
              />
              {errors && <div className="text-danger">{errors.name}</div>}
            </>
          )}

          <button className="button-primary">Submit</button>
        </form>
      </div>
      <div
        style={{
          transform: `translate(${forType === "login" ? 0 : -250}px, 0px)`
        }}
        className="button-div"
      >
        <p>
          {forType === "login"
            ? "Do not have an account?"
            : "Already a member?"}
        </p>
        <button onClick={onSetFormType}>
          {forType === "login" ? "Register" : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Auth;
