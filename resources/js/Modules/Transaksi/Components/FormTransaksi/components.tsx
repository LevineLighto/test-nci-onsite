import { ExtendedBarang, TransaksiFormData } from "@/Transaksi/Types";
import { FC, useState } from "react";
import { generateNumber } from "./functions";
import { SearchCustomer } from "@/Customer/Components/SearchCustomer";
import dayjs from "dayjs";
import { TableTransaksi } from "../TableTransaksi";
import { Input } from "@/Components/Inputs/Input";
import { Button } from "@/Components/Button";
import { buttonContainerClasses, containerClasses } from "./classes";
import { usePage } from "@inertiajs/react";
import { PageProps } from "@/Types";
import { CurrentSite } from "@/Helpers/CurrentSite";
import { toast } from "react-toastify";

export const FormTransaksi : FC = () => {

    const { props : { csrf_token } } = usePage<PageProps>()

    const [sending, setSending] = useState(false)
    const [formData, setFormData] = useState<TransaksiFormData>({
        no_transaksi: generateNumber(),
        uang_bayar: 0,
        tgl_transaksi: dayjs().format('DD MMMM YYYY HH:mm'),
        items: [
            { qty: 0, date: ''}
        ]
    })

    const handleChangeCustomer = ({value}) => {
        setFormData((prevState) => ({
            ...prevState,
            customer: value
        }))
    }

    const handleChangeBarang = (value : ExtendedBarang[]) => {
        setFormData((prevState) => {
            const modified = { ...prevState }

            const total = value.reduce<number>((accumulator, item) => {
                return accumulator + (item.harga || 0) * (item.qty || 0)
            }, 0)

            modified.items = value
            modified.total = total
            
            return modified
        })
    }

    const handlePay = (value : number) => {
        setFormData((prevState) => ({
            ...prevState,
            uang_bayar: value
        }))
    }

    const handleNew = () => {
        setFormData({
            no_transaksi: generateNumber(),
            uang_bayar: 0,
            tgl_transaksi: dayjs().format('DD MMMM YYYY HH:mm'),
            items: [
                { qty: 0, date: ''}
            ]
        })
    }

    const submitTransaksi = () => {
        if (sending) {
            return
        }

        if (!formData.total || !formData.uang_bayar) {
            toast.error('Pembayaran belum diinputkan')
            return
        }

        if (formData.total > formData.uang_bayar) {
            toast.error('Pembayaran kurang')
            return
        }

        setSending(true)

        const prunedItems = formData.items?.filter((item) => item.qty)

        fetch(`${CurrentSite()}transaksi`, {
            method: 'post',
            body: JSON.stringify({
                ...formData,
                items: prunedItems,
                _token: csrf_token
            }),
            headers: {
                'Content-Type'  : 'application/json',
                'Accept'        : 'application/json',
            }
        })
        .then(async response => {
            if (!response) {
                return
            }

            const ok = response.ok
            const code = response.status
            const result = await response.json()

            if (!ok) {
                toast.error(result.message)
                console.error('Http code:', code)
            } else {
                toast.success(result.message)
                handleNew()
            }
        })
        .catch((error) => {
            console.error(error)
        })
        .finally(() => {
            setSending(false)
        })
    }

    

    return (
        <>
            <section 
                className={`${
                    buttonContainerClasses.background
                } ${
                    buttonContainerClasses.display
                } ${
                    buttonContainerClasses.flex
                } ${
                    buttonContainerClasses.gap
                } ${
                    buttonContainerClasses.padding
                } ${
                    buttonContainerClasses.position
                } ${
                    buttonContainerClasses.width
                } ${
                    buttonContainerClasses.zIndex
                }`}
            >
                <Button
                    disabled={sending} 
                    variant="outline"
                    onClick={handleNew}
                >
                    Baru
                </Button>
                <Button
                    onClick={submitTransaksi}
                    disabled={sending}
                >
                    Simpan
                </Button>
            </section>
            <section 
                className={`${
                    containerClasses.background
                } ${
                    containerClasses.display
                } ${
                    containerClasses.gap
                } ${
                    containerClasses.grid
                } ${
                    containerClasses.padding
                } ${
                    containerClasses.position
                } ${
                    containerClasses.zIndex
                }`}
            >
                <Input
                    name="no_transaksi"
                    label="No Transaksi"
                    value={formData.no_transaksi}
                    readOnly
                    required
                />
                <SearchCustomer
                    onChange={handleChangeCustomer}
                    value={formData.customer?.nama_customer}
                />
                <Input
                    name="tgl_transaksi"
                    label="Tgl Transaksi"
                    value={formData.tgl_transaksi}
                    readOnly
                    required
                />
                <Input
                    name="alamat"
                    label="Alamat"
                    value={formData.customer?.alamat || ''}
                    readOnly
                    required
                />
            </section>
            <TableTransaksi
                onChange={handleChangeBarang}
                items={formData.items}
                onPay={handlePay}
                payment={formData.uang_bayar}
                total={formData.total}
            />
        </>
    )
}