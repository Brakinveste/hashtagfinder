// import needle from 'needle'

// process.env.BEARER_TOKEN = "AAAAAAAAAAAAAAAAAAAAAFlKHgEAAAAApBW4nRyRkiogluzAbXlS4KuHlMU%3DFcR7r8N19LRnMHLVmYlFsod6Be6zUvZD2rxATotl6mLPAh2UEX"

// const token = process.env.BEARER_TOKEN;

// const endpointUrl = "https://cors.eu.org/https://api.twitter.com/2/tweets/search/recent";

// export async function getRequest() {

//   // Edit query parameters below
//   // specify a search query, and any additional fields that are required
//   // by default, only the Tweet ID and text fields are returned
//   const params = {
//     'query': 'vida',
//     'max_results':100,
//     'tweet.fields': 'author_id',
//     'media.fields': 'url'
//   }
//   const res = await needle('get', endpointUrl, params, {
//       headers: {
//           "User-Agent": "v2RecentSearchJS",
//           "authorization": `Bearer ${token}`
//       }
//   })

//   if (res.body) {
//       return res.body;
//   } else {
//       throw new Error('Unsuccessful request');
//   }
// }



// console.log(await getRequest())



//Parâmetros para pegar imagem
// const endpointUrl = "https://cors.eu.org/https://api.twitter.com/2/tweets";
// const params = {
//   'ids': '1577063014498701312',
//   'expansions':'attachments.media_keys',
//   'media.fields': 'url'
// }

//Pegando posts por termo buscado

// const endpointUrl = "https://cors.eu.org/https://api.twitter.com/2/tweets/search/recent?query=gold&max_results=100&expansions=author_id"

// const params = {
//   'query': '#cow',
//   'max_results':100,
//   'tweet.fields': 'author_id',
//   'media.fields': 'url'
// }

//PEGANDO UM USUÁRIO

const getProducts = async (n)=> {	
  const data = await fetch('https://dummyjson.com/products')	
  const datajson = await data.json()	
  return datajson.products[n].title
}

const numbers = [1,2,3,4,5,6]

const extractor = async () => {  
  const names = numbers.map(async(num)=> {
    const item = await getProducts(num)
    return item
  })  
  return names
}

extractor().then(console.log)