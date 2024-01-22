import styles from "./index.module.css";

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const { className, ...restProps } = props;
  return <input className={`${className} ${styles.input}`} {...restProps} />;
}

export { Input };
