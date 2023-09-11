import type { Meta, StoryObj } from "@storybook/react";
import { FormEvent } from "react";
import { Form } from "src/components/Form";
// import { FormInputDataProps } from "src/components/Form/index.interface";
import { formDataArray } from "src/components/example-components/FormExample";

/**
 * This is a Form component. It Includes layout, initial values, validation and submit.
 */
const meta = {
  title: "Example/Form",
  component: Form,
  tags: ["autodocs"],
  parameters: {},
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

const onFormSubmit = (event: FormEvent, value: unknown) => {
  event.preventDefault();
  console.log(value);
  alert(`Form submitted successfully. ${JSON.stringify(value)}`);
};

export const ExampleForm: Story = {
  args: {
    onSubmit: onFormSubmit,
    formHeading: "From heading prop",
    formInputData: formDataArray,
  },

  // The render function shows the exact code that wewant to display to the user, we will use this
  // commented code later while writing documentation.DO NOT DELETE this commented code.

  // render: () => {
  //   // Copy all the code inside render function
  //   const formDataArray: FormInputDataProps[] = [
  //     {
  //       label: "First Name",
  //       inputData: {
  //         autoFocus: true,
  //         required: true,
  //         type: "text",
  //         name: "firstName",
  //       },
  //     },
  //     {
  //       label: "Last Name",
  //       inputData: {
  //         autoFocus: false,
  //         required: true,
  //         type: "text",
  //         name: "lastName",
  //       },
  //     },
  //     {
  //       label: "Street",
  //       inputData: {
  //         autoFocus: false,
  //         required: true,
  //         type: "text",
  //         name: "street",
  //       },
  //     },
  //   ];

  //   const onFormSubmit = (event: FormEvent, value: unknown) => {
  //     event.preventDefault();
  //     console.log(value);
  //   };

  //   return (
  //     <Form
  //       onSubmit={onFormSubmit}
  //       formHeading="From heading prop"
  //       formInputData={formDataArray}
  //     />
  //   );
  // },
};
