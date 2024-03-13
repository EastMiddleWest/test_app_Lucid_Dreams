import React from "react";

import styles from "./Control.module.scss";
import OptionList from "./OptionList/OptionList";

import { useFormula, useOptions } from "@/store/store";
import { filterCharecters } from "@/utilities/filterCharacters";


const Control = () => {
  
  const { values, addEntry, addOption,removeEntry, removeCursor, replaceCursor} = useFormula();
  const {options, filter, selected, setFilter, setSelectedValue} = useOptions()

  const word = React.useRef("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const lastCharecter = e.target.value;
    if (lastCharecter !== " ") {
      const prevCharacters = filterCharecters(values);
      word.current = /[a-zA-Z0-9]/.test(lastCharecter)
        ? prevCharacters + lastCharecter
        : "";
      if (word.current.length > 1){
        setFilter(word.current)
      }
      addEntry(lastCharecter);
    }
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    if (key === "Backspace" || key === "Delete") {
      word.current = filterCharecters(values, -1);
      if (word.current.length > 1) setFilter(word.current);
      else setFilter("");
      removeEntry();
    }
    else if(key === 'ArrowLeft' || key === 'ArrowRight'){
      const direction = key === 'ArrowLeft' ? 'left' : 'right'
      replaceCursor(direction)
    }
    else if(key === 'ArrowUp'){
      setSelectedValue(selected.value-1)
    }
    else if(key == 'ArrowDown'){
      setSelectedValue(selected.value+1)
    }
    else if(key === 'Enter'){
      if(filter){
        addOption({...options[selected.value], type: 'record'}, filter.length)
        setFilter('')
      }
    }
  };

  return (
    <div className={styles.control}>
      <input
        className={styles.input}
        type="text"
        value=""
        autoFocus
        onChange={onChange}
        onBlur={removeCursor}
        onKeyDown={onKeyPress}
      />
      <div className={styles.cursor}> </div>
      {
        filter && <OptionList />
      }
    </div>
  );
};

export default Control;
