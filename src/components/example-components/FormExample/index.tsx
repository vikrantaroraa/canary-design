import React from "react";
import { Form, FormInputDataProps } from "src/components/Form";

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

function FormExample() {
  return <Form formHeading="From heading prop" formInputData={formDataArray} />;
}

export { FormExample };
