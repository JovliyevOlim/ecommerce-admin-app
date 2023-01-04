const  baseUrl =
    location.hostname === "localhost"
        ? 'http://localhost:2000'
        :  'https://shopping-cart-rest-server.herokuapp.com/api'

export const api = baseUrl
export const generatePublicUrl =  (filename)=>{
    return `${baseUrl}/public/${filename}`
}
