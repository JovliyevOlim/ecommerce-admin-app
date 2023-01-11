// const  baseUrl = 'https://shopping-cart-rest-server.herokuapp.com/api'
const baseUrl = 'http://localhost:2000/api'
export const api = baseUrl
export const generatePublicUrl =  (filename)=>{
    return `${baseUrl}/public/${filename}`
}
