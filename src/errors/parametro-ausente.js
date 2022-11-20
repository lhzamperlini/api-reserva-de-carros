const parametroAusente = (res, campo)=>{
    return res.status(422).json({
        message: `O campo ${campo} é obrigatorio.`
    })
}

module.exports = parametroAusente