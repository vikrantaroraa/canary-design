import React, { FormEvent, useEffect, useState } from "react";
import styles from "src/components/Form/index.module.css";

interface FormInputProps {
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
}

function Form({ formHeading, formInputData }: FormProps) {
  const my_object = {};
  const [stateObject, setStateObject] = useState({});

  useEffect(() => {
    formInputData.map((dataObject: FormInputDataProps) => {
      my_object[dataObject.inputData.name] = "";
    });
    setStateObject(my_object);
    console.log(my_object);
    console.log(typeof my_object["lastName" as keyof typeof my_object]);
  }, []);

  const handleForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStateObject({
      ...stateObject,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(stateObject);
  };

  return (
    <form onSubmit={onSubmit} className={styles["form"]}>
      <div className={styles["heading"]}>{formHeading}</div>
      <div className={styles["label-and-input-wrapper"]}>
        {formInputData.map((inputDataObject) => {
          const { label, inputData } = inputDataObject;
          return (
            <>
              <FormLabel label={label} />
              <FormInput
                {...inputData}
                handleForm={handleForm}
                stateDataObject={stateObject}
              />
            </>
          );
        })}
      </div>
      <div className={styles["button-container"]}>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

const FormLabel = ({ label }: { label: string }) => {
  return <span>{label}</span>;
};

const FormInput = ({
  autoFocus,
  required,
  type,
  name,
  handleForm,
  stateDataObject,
}: FormInputProps) => {
  return (
    <input
      autoFocus={autoFocus}
      required={required}
      type={type}
      name={name}
      value={stateDataObject[name as keyof typeof stateDataObject]}
      onChange={(event) => handleForm(event)}
    />
  );
};

export { Form };
