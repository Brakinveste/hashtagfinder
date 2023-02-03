import { render } from "react-dom"
import styles from "./styles.module.css"

export const FirstSection = ({children}) => {
  return(
    <section className={styles.first__class}>
      {children}
    </section>
  )
}


