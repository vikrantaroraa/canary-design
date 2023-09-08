import React, { FormEvent, useState } from "react";
import styles from "src/components/Form/index.module.css";

function Form() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    state: "",
  });

  const { firstName, lastName, street, city, state } = formData;

  const handleForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className={styles["heading"]}> Example Form</div>
      <div className={styles["label-and-input-wrapper"]}>
        <label>First Name</label>
        <input
          autoFocus
          required
          type="text"
          name="firstName"
          value={firstName}
          onChange={(event) => handleForm(event)}
        />
        <label>Last Name</label>
        <input
          required
          type="text"
          name="lastName"
          value={lastName}
          onChange={(event) => handleForm(event)}
        />

        <label>Street</label>
        <input
          required
          type="text"
          name="street"
          value={street}
          onChange={(event) => handleForm(event)}
        />
        <label>City</label>
        <input
          required
          type="text"
          name="city"
          value={city}
          onChange={(event) => handleForm(event)}
        />
        <label>State</label>
        <input
          required
          type="text"
          name="state"
          value={state}
          onChange={(event) => handleForm(event)}
        />
      </div>
      <div className={styles["button-container"]}>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

export { Form };
