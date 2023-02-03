import { FirstSection } from "../../components/firstSection"
import styles from "./styles.module.css"
import searchIcon from "../../../public/images/icons/icon-search.svg"
import { useEffect, useState } from "react"
import { TweetCard } from "../../components/tweetCard"
import { ImageCard } from "../../components/imageCard"
import { fetchLastTweetsImages, recordSearches, searchValidation } from '../../services'
import { Helmet } from 'react-helmet'
import { ImageZoom } from "../../components/imageZoom"


export const Home = () => {

  const [resultTab, setResultTab] = useState('tweets')
  const [search, setSearch] = useState('Brasil')
  const [galeryMargin, setGaleryMargin] = useState(0)
  const [tweetResults, setTweetResults] = useState([])
  let [ tweetsQuant, setTweetsQuant ] = useState(2)
  const [tweetSlice, setTweetSlice] = useState()
  const [imageResults, setImageResults] = useState([])
  const [selectedImage, setSelectedImage] = useState()
  const [showImage, setShowImage] = useState(false) 
  
  
  const handleSearch = (e) => {
    setSearch(e.target.value.replace(/[^a-zA-Z0-9]/g, '')) 
  }
 
  const submitSearch = (e) => {
    e.preventDefault()
    document.querySelector('#search__term').innerHTML = ` "${search}"`
    if(searchValidation(search) === true){
      recordSearches(search)
      getResults(search)
      setGaleryMargin(0)   
    }

    document.querySelector('form').reset()   
    
  }

  const getResults = async (hashtag) => {
    const results = await fetchLastTweetsImages(hashtag)
    const tweets = []
    const images = []
    
    for(let r in results.data) {
      if (await results.includes.media[r].type === 'photo') {
        tweets.length < 10 && tweets.push(
          <li key={ results.data[r].id}>
            <TweetCard 
              profilePic = {  results.includes.users[r].profile_image_url}
              username = { results.includes.users[r].username}
              text = { results.data[r].text}
              id = { results.data[r].id}
            />
          </li>
        )

        images.length < 10 && images.push(
          <li key={ results.data[r].id}>
            <ImageCard 
              setShowImage = {setShowImage}
              image = { await results.includes.media[r].url} 
              username = { results.includes.users[r].username}
              setSelectedImage = {setSelectedImage}
              id = {results.data[r].id}
            />
          </li>
        )
      }
    }
    

    setTweetResults(tweets)
    setTweetSlice(tweets.slice(0,tweetsQuant))
    setImageResults(images)
  }

  
  const watchSize = () => {
    window.innerWidth > 899 ? setResultTab('both'): setResultTab('tweets')
  }

  
  
  useEffect(()=>{
    watchSize()

    window.addEventListener('resize', watchSize)   
    
    const observer = new IntersectionObserver((entries)=>{      
       setTweetsQuant(tweetsQuant ++)  
      //  scroll(tweetResults, tweetsQuant)       
     })
     
    observer.observe(document.querySelector('#end__list__tweets'))  
    
    getResults(search)
    document.querySelector('#search__term').innerHTML = ` "${search}"`
    
    return () => {
      window.removeEventListener('resize', watchSize)
    }    
    
  },[])


  useEffect(()=>{        
    setTweetSlice(tweetResults.slice(0,tweetsQuant))
    console.log(tweetsQuant)
  },[tweetsQuant])


  
  return(
    <div className={styles.main}>
      <Helmet>
                <meta charSet="utf-8" />
                <title>hashTagfinder | Home</title>
               <link rel="canonical" href="" />
               <meta name="description" content="Busque seus twitters preferidos" />
      </Helmet>
      { showImage && <ImageZoom setShowImage={setShowImage} selectedImage={selectedImage}/>} 
      <FirstSection>
        <div className={styles.search__section}>
          <div className={styles.search__section__text}>
            <h1 className={styles.title}>Encontre hashtags de maneira fácil</h1>
            <p className={styles.description}>Digite o que deseja no campo de buscas e confira os resultados do Twitter abaixo.</p>
          </div>
          <div className={styles.search__wrapper}>
            <img src={searchIcon} className={styles.search__icon} alt="" />
            <form className={styles.form__search} onSubmit={submitSearch} action="">
              <input className={styles.search} type="text" placeholder="Buscar..." onChange={handleSearch} />
            </form>
          </div>
        </div>
      </FirstSection>
      <section className={styles.search__result}>
        <p className={styles.result__subtitle}>
          Exibindo os 10 resultados mais recentes para 
          <span id = "search__term"> 
            
          </span>
        </p>  
        <div className={styles.result__tabs}>
          <div onClick={()=> setResultTab('tweets')} className={resultTab === 'tweets' ? styles.active__tab : styles.tab__tweets}>Tweets</div>
          <div onClick={()=> setResultTab('images')}  className={resultTab === 'images' ? styles.active__tab : styles.tab__images}>Imagens</div>
        </div>
        { 
          
          resultTab === 'tweets' 
          && 
            <ul className={styles.result__tweets}>
              {tweetSlice}  
            </ul>
        }

        {
         resultTab === 'images' &&
          <div className={styles.slide__image__wrapper}>            
            <div className={styles.image__slide__panel}>
              <div onClick={()=>setGaleryMargin(galeryMargin < 0 ? galeryMargin + 51 : 0)} className={`${styles.slide__button} ${styles.slide__button__left}`}></div>
              <div onClick={()=>setGaleryMargin(galeryMargin > -153 ? galeryMargin - 51 : -153)} className={`${styles.slide__button} ${styles.slide__button__right}`}></div>
            </div>
            <ul className={styles.result__images} style={{left: `${galeryMargin}%`}}>
              {imageResults} 
            </ul>
          </div>           
        }
          
        {
          resultTab === 'both' &&
          
          <div id="tweets__results" className={styles.result__wrapper}>
            <div className={styles.slide__image__wrapper}>
              <div className={styles.image__slide__panel}>
                <div onClick={()=>setGaleryMargin(galeryMargin < 0 ? galeryMargin + 51 : 0)} className={`${styles.slide__button} ${styles.slide__button__left}`}></div>
                <div onClick={()=>setGaleryMargin(galeryMargin > -153 ? galeryMargin - 51 : -153)} className={`${styles.slide__button} ${styles.slide__button__right}`}>
                </div>
              </div>
              <ul 
                className={styles.result__images} 
                style={{left: `${galeryMargin}%`}}
              >
               {imageResults} 
              </ul>
            </div>
            <ul className={styles.result__tweets}>
              {tweetSlice}   
               
            </ul>
            
          </div>
        }
        
      </section>
    </div>
  )
}