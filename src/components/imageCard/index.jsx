import { useEffect } from 'react'
import styles from './styles.module.css'

export const ImageCard = ({image, username, id, setShowImage, setSelectedImage}) => {
  
  
  useEffect(()=> {
    
    document.querySelectorAll('.image__card').forEach(image=> image.addEventListener('click', ()=> {
      const imageData = {
        imgUrl: image.querySelector('img').src,
        username: image.querySelector('a').innerText,
      }
      setSelectedImage(imageData)
      setShowImage(true)
    }))
  },[])

  return(
    <div className={`${styles.card} image__card`}>
      <img src={image}></img>
      <p className={styles.post__info}>Postado por:</p>
      <p className={`${styles.username} ${styles.post__info}`}>
        <a 
          target='_blank'
          href={`https://twitter.com/${username}`} 
        >
          {username}
        </a>
      </p>
    </div>
  )
}

