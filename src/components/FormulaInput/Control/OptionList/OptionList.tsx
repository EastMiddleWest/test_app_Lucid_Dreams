import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchOptions } from "@/services/options";

import styles from "./OptionList.module.scss";
import OptionComponent from "./Option/Option";

import { InView } from 'react-intersection-observer';
import { useFormula, useOptions } from "@/store/store";

import type { Record, Option } from "@/types";

const OptionList = () => {

  const addOption = useFormula((state) => state.addOption);
  const {filter,  setOptions, selected, setFilter, setSelectedValue,setMaxValue} = useOptions()

  const rootRef = React.useRef(null)

  const { data, status ,error } = useQuery({
    queryFn: async () => {
      const data = await fetchOptions(filter)
      setOptions(data)
      setMaxValue(data.length-1)
      return data
    },
    queryKey: ["options", filter],
    retry: false
  });

  React.useEffect(() => {
    return () =>{
      setOptions([])
      setSelectedValue(0)
    }
  },[setOptions, setSelectedValue])


  const onSelect = (option: Option) => {
    const record: Record = { type: "record", ...option };
    addOption(record, filter.length);
    setFilter('');
  };


  return (
    <ul ref={rootRef} className={styles.options}>
      {
      status === 'pending' ?
        <span>loading</span>
      : status === 'error' ?
        <span className={styles.error}>{error.message}</span>
      :
        data.map((option, i) => (
          <InView key={option.id} threshold={1} root={rootRef.current}>
            {({ref, inView, entry}) => (
              <OptionComponent
                ref={ref}
                inView={inView}
                entry={entry}
                key={option.id}
                option={option}
                index={i}
                isSelected={i === selected.value}
                onSelect={onSelect}
              />
            )}
          </InView>
        ))
      }
    </ul>
  );
};

export default OptionList;
