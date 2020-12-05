const filehelper = require('./file-helper')

extractErrors = error => {

    const errors = error.details.reduce((prev, curr) => {
        if (prev[curr.path[0]]) {
            prev[curr.path[0]].push(curr.type)
        } else {
            prev[curr.path[0]] = [curr.type]
        }
        return prev
    }, {})

    return {
        errors,
        fields: Object.keys(errors)
    }
}

const ValidationError = (message, errors) => {
    return { message, errors }
}

const validate = (obj, scheama) => {
    const validation = scheama.validate(obj, { abortEarly: false, stripUnknown: true })
    //console.log(validation.error)
    if (validation.error) {
        throw ValidationError('validation', extractErrors(validation.error))
    } else {
        return validation.value
    }
}

const validateImage =async image => {
    try {
        // Vamos mandar essa imagem para compressão antes de prosseguir
        // Ela vai retornar o a promise com o novo caminho como resultado, então continuamos com o then.
       const newPath = await filehelper.compressImage(image, 100)
        //console.log("Upload e compressão realizados com sucesso! O novo caminho é:" + newPath)
        return newPath
    } catch (err) {
        throw {
            //errors:  ['erro'],
            errors: { image: ['erro'] },
            fields: ['Houve erro no upload!']
        }
    }

}

module.exports = { validate, validateImage }