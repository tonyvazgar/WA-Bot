const {get, reply, getIA, getMensajeBDD} = require('../adapter')
const {saveExternalFile} = require('./handle')

const getMessages = async (message) => {
    const data = await get(message)
    return data
}

const getMessagesBDD = async (message) => {
    const data = await getMensajeBDD(message)
    return data
}

const responseMessages = async (step) => {
    const data = await reply(step)
    if(data && data.media){
        const file = await saveExternalFile(data.media)
        return {...data,...{media:file}}
    }
    return data
}

const bothResponse = async (message) => {
    const data = await getIA(message)
    if(data && data.media){
        const file = await saveExternalFile(data.media)
        return {...data,...{media:file}}
    }
    return data
}


module.exports = { getMessages, responseMessages, bothResponse, getMessagesBDD }