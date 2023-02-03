import { useEffect } from 'react'
import styles from './styles.module.css'

export const ImageZoom = ({data, setShowImage, selectedImage}) => {
  const img = `https://avatars.mds.yandex.net/i?id=84dbd50839c3d640ebfc0de20994c30d-4473719-images-taas-consumers&n=27&h=480&w=480`
  useEffect(()=>{
    const dialog = document.querySelector('#dialog__wrapper')

    dialog.addEventListener('click', (e)=>{
      setShowImage(false)
    })
  },[])
  return(
    <div id='dialog__wrapper' className={styles.dialog__wrapper}>
      <dialog >
        <img src={selectedImage.imgUrl} />        
        <p className={styles.image__info}>Postado por:        
          <a 
            target='_blank'
            href={`https://twitter.com/jdrodrigues`} 
          >
            { ` @${selectedImage.username}` }
          </a></p>
        
      </dialog>
    </div>
  )
}