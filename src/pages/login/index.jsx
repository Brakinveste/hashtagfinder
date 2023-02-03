import styles from './login.module.css';
import { FirstSection } from "../../components/firstSection"
import { useState } from 'react';
import { getLogin, validateLogin } from '../../services';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet'


export const Login = ({setLogged}) => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // Verifica se a senha e email estão corretos para poder navegar ou não.

  const auth = async (e) => {
    e.preventDefault()
    const email = document.getElementById('email').value;
    const senha = document.getElementById('password').value;
    if (await validateLogin(email, senha) === true) {
      setLogged(true)
      navigate('/buscas')
      
    } else {
      alert('Usuário e/ou senha inválidos! Verifique seus dados e tente novamente.')
      document.getElementById('email').value=''
      document.getElementById('password').value=''
    }
  }

  return(
    <FirstSection>
      <div className={styles.container}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>hashTagfinder | Login</title>
        <link rel="canonical" href="" />
        <meta name="description" content="Faça seu Login aqui" />
      </Helmet>
        <form 
        onSubmit={auth}
        className={styles.login__form}>
            <h1 className={styles.login__form__title}>Login</h1>
            <div className={styles.inputs__area}>
              <input 
                className={user !== "" ? styles.has__value : styles.input}
                type="text"
                value={user}
                onChange={e => setUser(e.target.value)}
                autocomplete="off"
                id='email'
              />
              <span className={styles.focus__input} data-placeholder="Usuário"></span>
            </div>
            <div className={styles.inputs__area}>
              <input
                className={password !== "" ? styles.has__value : styles.input}
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                autocomplete="off"
                id='password'
              />
              <span className={styles.focus__input} data-placeholder="Senha"></span>
            </div>
            <div className={styles.form__button}>
              <button className={styles.access__button}>ACESSAR</button>
            </div>
          </form>

      </div>
    </FirstSection>
  )
}