import dayjs from "dayjs"

export const generateNumber = () : string => {
    const date = dayjs().format('YYMMDD')
    let random = [...Array(4)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')
    random = random.padStart(4, '0').toUpperCase()

    return `${date}${random}`
}