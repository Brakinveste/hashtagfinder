import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import styles from './about.module.css'

import ilustration from '/public/images/icons/about-ilustration.svg'
//import email from '/public/images/icons/icon-envelope.svg'
//import linkedin from '/public/images/icons/icon-awesome-linkedin.svg'
import { initialStateMembers, listMembers, timeEquipe} from '../../services'
import { useEffect } from 'react'
import { CardMember } from '../../components/cardMember'



export const About =  () => {
  
  
  const [texto, setTexto] = useState("");
  const [members, setMembers] = useState(initialStateMembers);
  
  async function getUsers(){
    //console.log(await timeEquipe)
    
    const time = await listMembers()
    //console.log(time)
    
    
    
    //setMembers(await time)

    console.log(await time)
    return time
  }
  
  //listMembers().then(data=>setMembers(data)).then(console.log(members))

  useEffect(() => {
    //getUsers().then(console.log(members))
    getUsers().then(data => setMembers(data)).then(console.log(members))

    fetch(
      "https://api.airtable.com/v0/app6wQWfM6eJngkD4/Projeto?filterByFormula=" +
        encodeURI(`({Squad} = '08-22')`),
      {
        method: "GET",
        headers: {
          Authorization: 'Bearer keykXHtsEPprqdSBF',
        },
      }
    )
      .then((res) => res.json())
      .then((response) => {
        setTexto(response.records[0].fields.Sobre);
      })
      
      .catch((erro) => console.log(erro));
      
      
    }, []);

   

  return(
    
    
    <div>
      <Helmet>
                <meta charSet="utf-8" />
                <title>hashTagfinder | Sobre</title>
               <link rel="canonical" href="" />
               <meta name="description" content="Descrição do projeto e a equipe que o produziu" />
      </Helmet>
      <div className={styles.box__fist__section}>
        <div className={styles.fist__section} >
          <div className={styles.text__box} >
            <h1 className={styles.text__title} >Sobre o projeto</h1>
            <p className={styles.text__about} >
            
              {
                texto
              }

            </p>
          </div>
          
          <div className={styles.img__decor} > 
            <img className={styles.img__decor__frame} src={ilustration} alt="" />
          </div>  
        </div>
      </div>
      <div className={styles.second__section} > 
        <div className={styles.cards__container} >  
          <h1 className={styles.cards__tittle} > Quem somos </h1>  

            <ul className={styles.cards__list}> 

              {members.map(item => <CardMember member = {item} /> )}

               {/*  { members.map(item => {
                  return <CardMember member = {item} />
                }) } */} 
                       
              
            </ul> 
          

        </div>
        
      </div>

      
    </div>
  )
}




     
      