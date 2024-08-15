const decodeBase64 = (option) => {
    return Buffer.from(option, 'base64').toString('utf8') 
};

const encodeBase64 = (option) => {
    return Buffer.from(option, 'utf8').toString('base64') 
}
module.exports={decodeBase64, encodeBase64}