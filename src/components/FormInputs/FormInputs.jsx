/*
 * based on tutorial from:
 * https://www.section.io/engineering-education/how-to-create-a-reusable-react-form/
 */

import React, { useEffect, useState } from "react";
import { Eye, EyeSlash } from "../../assets/icons";

// const inputReducer = (state, action) => {
//   switch (action.type) {
//     case "CHANGE":
//       return { ...state, value: action.val };
//     default:
//       return state;
//   }
// };

export const FormInputs = (props) => {
  // const [inputState, dispatch] = useReducer(inputReducer, { value: "" });

  const [passwordShown, setPasswordShown] = useState(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const { id } = props;
  // const { value } = inputState;

  useEffect(() => {
    onInput(id, value);
  }, [id, value]);

  const changeHandler = (event) => {
    dispatch({ type: "CHANGE", val: event.target.value });
  };

  const element =
  // --- Generic form input type ---
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        value={props.value}
        placeholder={props.placeholder}
        className="form__field"
      />
    ) :

    // --- Password form input type ---
    props.element === "password" ? (
      <>
        <input
          id={props.id}
          type={passwordShown ? "text" : "password"}
          placeholder={props.placeholder}
          value={props.value}
          className="form__field"
        />
        <span className="password-reveal" onClick={togglePassword}>
          {passwordShown ? (
            <EyeSlash className="icon-eye-closed" />
          ) : (
            <Eye className="icon-eye-open" />
          )}
        </span>
      </>
    ) : (

    // --- Textarea form input type ---
      <textarea
        id={props.id}
        rows={props.rows || 2}
        value={props.value}
        placeholder={props.placeholder}
        className="form__field"
      />
    );


  return (
    <div className="form__group">
      {element}
      <label className="form__label" htmlFor={props.id}>
        {" "}
        {props.label}{" "}
      </label>
    </div>
  );
};
