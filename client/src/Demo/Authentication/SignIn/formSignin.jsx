import React, { useState } from "react";
import { login } from "../../../Services/loginService";
import Joi from "joi-browser";

function FormSignin({ history }) {
  const [accoun, setAccoun] = useState({ username: "", password: "" });
  const { username, password } = accoun;
  const [errors, setErrors] = useState({});

  const schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  const handleValidate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(accoun, schema, options);

    if (!error) return null;

    const newErrors = {};
    for (let item of error.details) newErrors[item.path[0]] = item.message;

    return newErrors;
  };

  const handleChange = (e) => {
    e.persist();

    setAccoun((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let result = handleValidate();
    if (result) return setErrors(result);

    try {
      await login(accoun.username, accoun.password);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) alert("Something wrong");

      if (ex.response && ex.response.status === 400) {
        const newError = { ...errors };
        newError.username = ex.response.data;
        console.log(errors);
        setErrors(newError);
        if (errors) return;
      }
    }

    history.push("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group d-flex-column">
        <input
          name="username"
          value={username}
          onChange={(e) => handleChange(e)}
          type="email"
          className="form-control"
          placeholder="Email"
        />
        {errors.username && <p className="text-danger">{errors.username}</p>}
      </div>
      <div className="form-group">
        <input
          name="password"
          value={password}
          onChange={(e) => handleChange(e)}
          type="password"
          className="form-control mt-3"
          placeholder="password"
        />
        {errors.password && <p className="text-danger">{errors.password}</p>}
      </div>
      <div className="text-center">
        <button className="btn btn-primary shadow-2 mb-4">Login</button>
      </div>
    </form>
  );
}

export default FormSignin;
