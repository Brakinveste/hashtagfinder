import styles from './styles.module.css'
import git from '/public/images/icons/icon-github.svg'
import email from '/public/images/icons/icon-envelope.svg'
import linkedin from '/public/images/icons/icon-awesome-linkedin.svg'

export const CardMember = ({member}) => {
  return(
    <div className={styles.cards} >
        <img className={styles.card__pic} src = {member.Imagem[0].url}></img>
        <h2 className={styles.card__name} >{ member.Nome }</h2>
        <p className={styles.card__text} >
          { member.Descrição }
        </p>
        <div className={styles.icons__list}>
          <a href={member.Github} target='_blank' >
          <img src={git} className={styles.icons__git} ></img>
          </a>
          <a href={`mailto:${member.Email}`} target='_blank' >
          <img src={email} className={styles.icons__mail} ></img>
          
          </a>
          <a href={member.LinkedIn} target='_blank' >
          <img src={linkedin} className={styles.icons__linkedin}></img>
          </a>
        </div>
    </div>     
  )
}