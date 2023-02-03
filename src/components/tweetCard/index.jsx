import styles from './styles.module.css'

export const TweetCard = ({profilePic, username, text, id}) => {
  return(
    <div className={styles.card}>
      <img src={profilePic} />
      <div className={styles.tweet}>
        <header className={styles.header}>Username <span className={styles.user}>@{username}</span></header>
        <p className={styles.tweet__text}>{text}</p>
        <footer className={styles.footer}>
          <a 
            target='_blank'
            href={`https://twitter.com/user/status/${id}`} 
            className={styles.link__to__twitter}
          >
            Ver mais no Twitter
          </a>
        </footer>
      </div>
    </div>
  )
}