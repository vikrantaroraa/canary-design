import styles from "./index.module.css";

function Label(props: React.LabelHTMLAttributes<HTMLLabelElement>) {
  const { className, ...restProps } = props;
  return <label className={`${className} ${styles.label}`} {...restProps} />;
}

export { Label };
