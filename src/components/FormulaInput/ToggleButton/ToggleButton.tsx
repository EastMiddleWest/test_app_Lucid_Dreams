
import styles from './ToggleButton.module.scss'

type Props = {
  isOpen: boolean;
  toggleOpen: () => void
}

const ToggleButton = ({isOpen, toggleOpen}: Props) => {
  return (
    <button
      className={isOpen ? styles['btn-open'] : styles['btn-closed']}
      onClick={toggleOpen}
    >
      <img src='/triangle.png' alt='toggle' width={12} height={12} />
    </button>
  )
}

export default ToggleButton