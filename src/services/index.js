import Airtable from "airtable"

// const token = 'Bearer AAAAAAAAAAAAAAAAAAAAAHP0jQEAAAAA54TVPY6HCRhs24q4dN8j0OQ%2FtXg%3DRiUs0TmxSw99xcNkeGWxoO3xpfV1V1KlvTubUDhqndcGZyHeJT'

const token = 'Bearer AAAAAAAAAAAAAAAAAAAAAFlKHgEAAAAApBW4nRyRkiogluzAbXlS4KuHlMU%3DFcR7r8N19LRnMHLVmYlFsod6Be6zUvZD2rxATotl6mLPAh2UEX'
const date = new Date()
const today = date.getTime()
const base = new Airtable({apiKey: 'keyz8BAZKCTGY5dB1'}).base('app6wQWfM6eJngkD4');


// Valida o campo de busca
export const searchValidation = (search) => {
  if(search.length < 2)  {
    console.log('validação')
    alert('Digite uma hashtag!')
    return false
  }
  if(search.length > 100) {
    alert('Sua hashtag ultrapasou o limite de 100 caracteres!!')
    return false
  }
  console.log(search.length)

  return true
}


//Valida os campos do login
export const validateLogin = async (email, senha) => {
  const login = await getLogin() 
  const user = login.filter(user => user.Email === email && user.Senha === senha);
  if (user.length > 0) {
    return true;
  } else {
    return false;
  }
}


// Obtém lista de usuários cadastrados
export const getLogin = () => {
  return new Promise ((resolve, reject) => {
    let logins = []

    base('Login').select({
      maxRecords: 3,
      view: "Squad 8"
    }).eachPage(function page(records, fetchNextPage) {
      records.forEach(function(record) {
          logins.push(record.fields);
      });
      fetchNextPage();
    
    }, function done(err) {
      if (err) { console.error(err); return; }
      else {
        resolve(logins)
      }
    });
  })
}

//Registra as buscas em uma tabela do Airtable
export const recordSearches = async (hashtag) => {
  base('Buscas').create([
    {
      "fields": {
        "Squad":"08-22",
        "Hashtag":`${hashtag}`,
        "Data":today
      }
    }
  ], function(err, records) {
    if (err) {
      console.error(err);
      return;
    }
    records.forEach(function (record) {
      console.log(record.getId());
    });
  });
}

// Retorna um array de objetos contendo os membros da equipe.
export const listMembers = ()=> {
  return new Promise((resolve, reject) => {
    let time = []
    base('Equipe').select({
      filterByFormula: "({Squad} = '08-22')",
      maxRecords: 4,
      view: "Grid s8"
      
    }).eachPage(function page(records, fetchNextPage) {  
      records.forEach(function(record) {
          time.push(record.fields);      
      });
      fetchNextPage();
  
  }, function done(err) {
      if (err) {
         console.error(err); 
         return; 
      } else {
        resolve(time)
      }
  });
  })
}



// Recebe uma hastag e retorna os últimos tweets marcados com ela e contendo imagens. O array das imagens pode ser obtida acessando res.includes.media.
export const fetchLastTweetsImages = async (hashtag) => {
  const encodedHashtag = encodeURI(hashtag)
  const endpointUrl = `https://cors.eu.org/https://api.twitter.com/2/tweets/search/recent?query=has%3Amedia%20${hashtag}%20-is%3Aretweet&max_results=20&expansions=author_id,attachments.media_keys&user.fields=id,name,username,profile_image_url&media.fields=url`; 
  
  const res = await fetch(endpointUrl, {
    method: 'GET',
    headers: {
      "User-Agent": "v2RecentSearchJS",
      "authorization": `${token}`,
      "Content-Type": "application/json",
    }    
  })

  if (res.body) {
      return res.json();
  } else {
      throw new Error('Unsuccessful request');
  }

}

export const initialStateMembers = [{Squad: '', Nome: '', Descrição: '', Github: '', Email: '', Imagem: [{url:''}]},{Squad: '', Nome: '', Descrição: '', Github: '', Email: '', Imagem: [{url:''}]},{Squad: '', Nome: '', Descrição: '', Github: '', Email: '', Imagem: [{url:''}]},{Squad: '', Nome: '', Descrição: '', Github: '', Email: '', Imagem: [{url:''}]}]


// fetchLastTweetsImages('carro').then(data=>console.log(data.data))

// selectTweetCardInfo('dsadsd').then(data=>console.log(data))

// getTweetInfo('1593647734237569027').then(data=>console.log(data))
// getUserInfo('326915887').then(data=>console.log(data))

// export const time = await listMembers()

