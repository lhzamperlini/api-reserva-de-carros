const pegarToken = (req) =>{  
    const authHeader = req.headers.authorization
    //Como ele manda um Array no Headers a gente pega apenas a posição em que está o token
    const token = authHeader.split(" ")[1]
    return token
}

module.exports = pegarToken

