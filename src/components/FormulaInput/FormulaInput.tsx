import React from "react";
import styles from "./FormulaInput.module.scss";

import Entry from "./Entry/Entry";
import Control from "./Control/Control";

import { useFormula } from "@/store/store";
import type { FormulaValue } from "@/types";

const FormulaInput = () => {

  const { values, setCursor } = useFormula();

  const toggleEditable = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.target as HTMLElement;
    let index: string;
    if (!el.hasAttribute("data-index")) {
      const liEl = el.closest("li");
      index = liEl?.getAttribute("data-index") || "-1";
    } else {
      index = el.getAttribute("data-index") || "-1";
    }
    setCursor(Number(index) + 1);
  };

  const render = (el: FormulaValue): JSX.Element => {
    if (el.type === "character") return <span>{el.value}</span>;
    else if (el.type === "cursor") return <Control/>;
    else return <Entry {...el} />;
  };

  return (
    <div className={styles.wrapper}>
      <h3>Formula</h3>
      <div className={styles.input} onClick={(e) => toggleEditable(e)}>
        <ul className={styles.line} data-index={values.length - 1}>
          <li key="space"> </li>
          {values.map((el, i) => (
            <li key={el.id} data-index={i}>
              {render(el)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FormulaInput;
