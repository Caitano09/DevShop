extractErrors = error =>{

    const errors = error.details.reduce((prev, curr)=>{
        if(prev[curr.path[0]]){
            prev[curr.path[0]].push(curr.type)
        }else{
            prev[curr.path[0]] = [curr.type]
        }
        return prev
    }, {})

    return{
        errors,
        fields: Object.keys(errors)
    }
}

const ValidationError = (message, errors) => {
    return {message, errors}
}

const validate = (obj, scheama) =>{
    const validation = scheama.validate(obj, {abortEarly: false, stripUnknown: true})
    //console.log(validation.error)
    if(validation.error){
        throw ValidationError( 'validation', extractErrors(validation.error))
    }else{
        return validation.value
    }
}

module.exports = {validate}