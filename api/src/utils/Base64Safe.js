const ENC = {
    '+': '-',
    '/': '_',
    '=': '.'
}
const DEC = {
    '-': '+',
    _: '/',
    '.': '='
}

exports.encode = function (plaintext) {
    plaintext = Buffer.from(plaintext).toString('base64')
    return plaintext.replace(/[+/=]/g, (m) => ENC[m])
}

exports.decode = function (safe) {
    safe = Buffer.from(safe, 'base64').toString('ascii')
    return safe.replace(/[-_.]/g, (m) => DEC[m])
}

exports.trim = function (string){
    return string.replace(/[.=]{1,2}$/, '')
}

exports.validate = function (string) {
    return /^[A-Za-z0-9_-]*[.]{0,2}$/.test(string)
}
