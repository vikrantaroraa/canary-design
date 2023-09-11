import React, { useEffect, useState } from "react";
import {
  FormInputDataProps,
  FormInputProps,
  FormProps,
} from "src/components/Form/index.interface";
import styles from "src/components/Form/index.module.css";

function Form({ formHeading, formInputData, onSubmit }: FormProps) {
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

  return (
    <form onSubmit={(e) => onSubmit(e, stateObject)} className={styles["form"]}>
      <div className={styles["heading"]}>{formHeading}</div>
      <div>
        {formInputData.map((inputDataObject, index) => {
          const { label, inputData } = inputDataObject;
          return (
            <div key={index} className={styles["label-and-input-wrapper"]}>
              <FormLabel label={label} />
              <FormInput
                {...inputData}
                handleForm={handleForm}
                stateDataObject={stateObject}
              />
            </div>
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
