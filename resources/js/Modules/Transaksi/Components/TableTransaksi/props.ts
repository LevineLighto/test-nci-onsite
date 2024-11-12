import { ExtendedBarang } from "@/Transaksi/Types";

export interface TableTransaksiProps {
    items?      : ExtendedBarang[]
    onChange?   : (value: ExtendedBarang[]) => void
    onPay?      : (value: number) => void
    payment?    : number
    total?      : number
}