import React from "react";
import styles from "./Entry.module.scss";
import type { Record } from "@/types";

const Entry = ({ name }: Record) => {
  const [isEditable, setIsEditable] = React.useState(false);
  const [value, setValue] = React.useState("x");

  const openInput = () => {
    setIsEditable(true);
  };

  const preventBuble = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className={styles.wrapper} onClick={preventBuble}>
      <span>{name}</span>
      <div className={styles.delimiter}></div>
      <div className={styles.editable}>
        {isEditable ? (
          <input
            type="text"
            value={value}
            autoFocus
            onChange={(e) => setValue(e.target.value)}
            onBlur={() => setIsEditable(false)}
          />
        ) : (
          <p onClick={openInput}>&#91; X &#93;</p>
        )}
      </div>
    </div>
  );
};

export default Entry;
