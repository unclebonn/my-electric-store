import dayjs, { Dayjs } from "dayjs"

export const getDateTodayVN = () => {
    return dayjs.locale("vi")
}

export const formatDate = (rawString: string) => {
    const date = new Date(rawString)

    const day = date.getDay()
    const month = date.getMonth()
    const year = date.getFullYear()

    const hour = date.getHours()
    const minutes = date.getMinutes()

    return `${day}-${month}-${year} ${hour}:${minutes}`

}