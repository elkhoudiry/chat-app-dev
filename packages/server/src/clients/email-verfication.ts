export type EmailCode = {
    email: string;
    code: string;
    verified: boolean;
}

const codesList: Array<EmailCode> = []

const generateCode = (length: number) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

const addCode = (email: string) => {
    const code = generateCode(10)
    codesList.push({ email, code, verified: false })

    return code
}

const findCode = (email: string) => codesList.find((emailCode) => emailCode.email === email)

const verifyCode = (email: string, code: string) => {
    const emailCode = codesList.find((emailCode) => emailCode.email === email)

    if (!emailCode) return false
    if (emailCode.code !== code) return false

    emailCode.verified = true
    return true
}

export {
    addCode,
    findCode,
    verifyCode
}
