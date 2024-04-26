import dayjs, { Dayjs } from "dayjs"


export const formatDate = (rawString: string) => {
    return new Date(rawString).toLocaleString("vi-VN")

}