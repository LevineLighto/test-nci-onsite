import { Barang } from "@/Barang/Types";
import { Customer } from "@/Customer/Types";

export interface ExtendedBarang extends Barang {
    qty : number
    date: string
}

export interface TransaksiFormData {
    no_transaksi?   : string
    customer?       : Customer
    items?          : ExtendedBarang[]
    total?          : number
    uang_bayar?     : number
    tgl_transaksi?  : string
}