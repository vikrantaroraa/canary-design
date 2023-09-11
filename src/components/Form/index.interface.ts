import { FormEvent } from "react";

export interface FormInputProps {
  autoFocus?: boolean;
  required?: boolean;
  type: string;
  name: string;
  handleForm?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  stateDataObject?: object;
}

export interface FormInputDataProps {
  label: string;
  inputData: FormInputProps;
}

export interface FormProps {
  formHeading?: string;
  formInputData: FormInputDataProps[];
  onSubmit: (event: FormEvent, value: unknown) => void;
}
