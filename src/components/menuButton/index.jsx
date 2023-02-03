import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";


export const MenuButton = ({text, icon, link, color}) => {
  const navigate = useNavigate()

  return(
    <button onClick={() => navigate(link)} className={`${styles.home__button} ${color === 'contrast' && styles.contrast}`}><img className={styles.home__icon} src={icon} alt=""></img>{text}</button>
  )
}