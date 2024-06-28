import styles from "./Container.module.css";
import React from "react";

const Container = (props) => {
  //console.log(`Custom class: ${props.customClass}`);
  return (
    <div className={`${styles.container} ${styles[props.customClass]}`}>
      {props.children}
    </div>
  );
};

export default Container;