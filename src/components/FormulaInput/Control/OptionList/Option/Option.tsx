import React from 'react'
import styles from './Option.module.scss'
import { useOptions } from '@/store/store';
import type { Option } from '@/types'

type Props = {
  option: Option,
  index: number;
  isSelected: boolean;
  inView: boolean;
  entry: IntersectionObserverEntry | undefined;
  onSelect: (option: Option) => void
}

const Option = React.forwardRef<HTMLLIElement, Props>(({option, index,inView, entry ,isSelected, onSelect},ref) => {

  const setSelectedValue = useOptions(state => state.setSelectedValue)

  React.useEffect(() => {
    if(isSelected && !inView){
      entry?.target.scrollIntoView()
    }
  },[isSelected, inView, entry])

  const preventBlur = (e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
    preventBlur(e)
    onSelect(option)
  }

  return (
    <li
      ref={ref}
      key={option.id}
      className={isSelected ? `${styles.option} ${styles.selected}` : styles.option}
      onClick={handleClick}
      onMouseDown={preventBlur}
      onMouseEnter={() => setSelectedValue(index)}
    >
      <span>{option.name}</span>
      <span>{option.category}</span>
    </li>
  )
})

Option.displayName = 'Option'

export default Option