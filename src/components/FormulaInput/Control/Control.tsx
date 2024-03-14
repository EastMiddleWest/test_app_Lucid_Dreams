import React from "react";

import styles from "./Control.module.scss";
import OptionList from "./OptionList/OptionList";

import { useFormula, useOptions } from "@/store/store";
import { filterCharecters } from "@/utilities/filterCharacters";


const Control = () => {

  const { values, addEntry, addOption,removeEntry, removeCursor, replaceCursor, calculeteResult} = useFormula();
  const {options, filter, selected, setFilter, setSelectedValue} = useOptions()

  const word = React.useRef("");

  React.useEffect(() =>{
    return () => setFilter('')
  },[setFilter])

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
    switch (key) {
      case "Delete":
      case "Backspace": {
        word.current = filterCharecters(values, -1);
        if (word.current.length > 1) setFilter(word.current);
        else setFilter("");
        removeEntry();
        return
      }
      case "ArrowRight":
      case "ArrowLeft":{
        const direction = key === 'ArrowLeft' ? 'left' : 'right'
        replaceCursor(direction)
        setFilter('')
        return
      }
      case 'ArrowUp':{
        setSelectedValue(selected.value-1)
        return
      }
      case 'ArrowDown':{
        setSelectedValue(selected.value+1)
        return
      }
      case 'Enter':{
        if(filter){
          if(options.length > 0){
            addOption({...options[selected.value], type: 'record'}, filter.length)
            setFilter('')
          }
        }
        else{
          calculeteResult()
        }
        return
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

