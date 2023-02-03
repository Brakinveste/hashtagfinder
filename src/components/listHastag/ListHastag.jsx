import React from "react";

// os estilos são importados pela styles
import styles from "./styles.module.css";

export const ListHastag = (props) => {
  return (
    <div data-item="true" className={`${styles.main} `}>
      <div className={styles.main__container}>
        <span title={props.hashtag} className={styles.container__hashtag}>
          {props.hashtag}
        </span>

        <div>
          <span>{props.date}</span>
          <span>{props.hour}</span>
        </div>
      </div>
    </div>
  );
};
