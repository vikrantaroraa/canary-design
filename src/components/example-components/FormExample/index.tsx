import React, { FormEvent } from "react";
import { Form } from "src/components/Form";
import { FormInputDataProps } from "src/components/Form/index.interface";

const formDataArray: FormInputDataProps[] = [
  {
    label: "First Name",
    inputData: {
      autoFocus: true,
      required: true,
      type: "text",
      name: "firstName",
    },
  },
  {
    label: "Last Name",
    inputData: {
      autoFocus: false,
      required: true,
      type: "text",
      name: "lastName",
    },
  },
  {
    label: "Street",
    inputData: {
      autoFocus: false,
      required: true,
      type: "text",
      name: "street",
    },
  },
];

const onFormSubmit = (event: FormEvent, value: unknown) => {
  event.preventDefault();
  console.log(value);
};

function FormExample() {
  return (
    <Form
      onSubmit={onFormSubmit}
      formHeading="From heading prop"
      formInputData={formDataArray}
    />
  );
}

export { FormExample };
