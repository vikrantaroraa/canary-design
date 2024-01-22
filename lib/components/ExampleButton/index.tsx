import styles from "./index.module.css";

function ExampleButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { className, ...restProps } = props;
  return (
    <button className={`${className} ${styles.exampleButton}`} {...restProps} />
  );
}

export { ExampleButton };
