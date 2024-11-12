import { FC, useMemo } from "react";
import { TableTransaksiProps } from "./props";
import { InputChangeHandler } from "@irimold/react-component";
import dayjs from "dayjs";
import { CellClasses, FooterClasses, HeadClasses, OrderClasses, PriceClasses, RowClasses, TableClasses } from "./classes";
import { SearchBarang } from "@/Barang/Components/SearchBarang";
import { Input } from "@/Components/Inputs/Input";

export const TableTransaksi : FC<TableTransaksiProps> = ({
    items = [],
    payment = 0,
    onChange,
    onPay,
    total = 0,
}) => {
    const handleSelectBarang = (index: number) : InputChangeHandler => {
        return ({value}) => {
            if (typeof onChange != 'function') {
                return
            }

            const modifiedItems = [ ...items ]
        
            let empty = false
            if (!modifiedItems[index].qty) {
                empty = true
            }

            modifiedItems[index] = {
                ...value,
                qty : 1,
                date: dayjs().format('DD MMMM YYYY HH:mm')
            }

            if (empty) {
                modifiedItems[index + 1] = {
                    qty : 0,
                    date: ''
                }
            }

            onChange(modifiedItems)
        }
    }

    const handleChangeQuantity = (index: number) : InputChangeHandler => {
        return ({value}) => {
            if (typeof onChange != 'function') {
                return
            }

            const modifiedItems = [ ...items ]
            
            modifiedItems[index] = {
                ...modifiedItems[index],
                qty: value
            }

            onChange(modifiedItems)
        }
    }

    const handlePay : InputChangeHandler = ({value}) => {
        if (typeof onPay == 'function') {
            onPay(value)
        }
    }

    const changes = payment - total

    return (
        <table 
            className={`${
                TableClasses.background
            } ${
                TableClasses.border
            } ${
                TableClasses.boxShadow
            } ${
                TableClasses.table
            } ${
                TableClasses.width
            }`}
        >
            <thead
                className={`${
                    HeadClasses.background
                } ${
                    HeadClasses.color
                } ${
                    HeadClasses.position
                } ${
                    HeadClasses.zIndex
                }`}
            >
                <tr>
                    <th 
                        className={`${
                            CellClasses.padding
                        }`}
                    >
                        No Urut
                    </th>
                    <th 
                        className={`${
                            CellClasses.padding
                        }`}
                    >
                        Tgl Trans
                    </th>
                    <th 
                        className={`${
                            CellClasses.padding
                        }`}
                    >
                        Kode BRG
                    </th>
                    <th 
                        className={`${
                            CellClasses.padding
                        }`}
                    >
                        Nama BRG
                    </th>
                    <th 
                        className={`${
                            CellClasses.padding
                        }`}
                    >
                        Qty
                    </th>
                    <th 
                        className={`${
                            CellClasses.padding
                        }`}
                    >
                        Harga
                    </th>
                    <th 
                        className={`${
                            CellClasses.padding
                        }`}
                    >
                        Sub Total
                    </th>
                </tr>
            </thead>
            <tbody>
                { items.map((item, index) => (
                    <tr 
                        className={`${
                            RowClasses.background
                        }`}
                        key={`item-${index}`}
                    >
                        { item.kode_barang ? (
                            <>
                                <td 
                                    className={`${
                                        CellClasses.padding
                                    } ${
                                        OrderClasses.align
                                    }`}
                                >
                                    { index + 1 }
                                </td>
                                <td 
                                    className={`${
                                        CellClasses.padding
                                    }`}
                                >
                                    { item.date }
                                </td>
                                <td 
                                    className={`${
                                        CellClasses.padding
                                    }`}
                                >
                                    { item.kode_barang || '' }
                                </td>
                                <td 
                                    className={`${
                                        CellClasses.padding
                                    }`}
                                >
                                    <SearchBarang
                                        value={item.nama_barang}
                                        onChange={handleSelectBarang(index)}
                                    />
                                </td>
                                <td 
                                    className={`${
                                        CellClasses.padding
                                    }`}
                                >
                                    { item.kode_barang ? (
                                        <Input
                                            name="qty"
                                            value={item.qty}
                                            onChange={handleChangeQuantity(index)}
                                        />
                                    ) : <></> }
                                </td>
                                <td 
                                    className={`${
                                        CellClasses.padding
                                    } ${
                                        PriceClasses.align
                                    }`}
                                >
                                    { item.harga ? (
                                        `Rp${Number(item.harga).toLocaleString('id')}`
                                    ) : '' }
                                </td>
                                <td 
                                    className={`${
                                        CellClasses.padding
                                    } ${
                                        PriceClasses.align
                                    }`}
                                >
                                    { item.kode_barang && item.harga ? (
                                        `Rp${(item.qty * Number(item.harga)).toLocaleString('id')}`
                                    ) : '' }
                                </td>
                            </>
                        ) : (
                            <td 
                                colSpan={7} 
                                className={`${
                                    CellClasses.padding
                                }`}
                            >
                                <SearchBarang
                                    value={item.nama_barang}
                                    onChange={handleSelectBarang(index)}
                                />
                            </td>
                        ) }
                    </tr>
                )) }
            </tbody>
            <tfoot
                className={`${
                    FooterClasses.border
                } ${
                    FooterClasses.position
                }`}
            >
                <tr 
                    className={`${
                        RowClasses.background
                    }`}
                >
                    <td colSpan={5}/>
                    <th 
                        className={`${
                            CellClasses.padding
                        }`}
                        colSpan={2}
                    >
                        <Input
                            name="total"
                            label="Total"
                            value={`Rp${total.toLocaleString('id')}`}
                            className={`${
                                PriceClasses.align
                            }`}
                            readOnly
                        />
                    </th>
                </tr>
                <tr 
                    className={`${
                        RowClasses.background
                    }`}
                >
                    <td colSpan={5}/>
                    <th 
                        className={`${
                            CellClasses.padding
                        }`}
                        colSpan={2}
                    >
                        <Input
                            name="bayar"
                            label="Bayar"
                            value={payment}
                            onChange={handlePay}
                            className={`${
                                PriceClasses.align
                            }`}
                        />
                    </th>
                </tr>
                <tr 
                    className={`${
                        RowClasses.background
                    }`}
                >
                    <td colSpan={5}/>
                    <th 
                        className={`${
                            CellClasses.padding
                        }`}
                        colSpan={2}
                    >
                        <Input
                            name="uang_kembali"
                            label="Uang Kembali"
                            value={`Rp${(changes).toLocaleString('id')}`}
                            className={`${
                                PriceClasses.align
                            } ${
                                changes < 0 ? PriceClasses.color.invalid : ''
                            }`}
                            readOnly
                        />
                    </th>
                </tr>
            </tfoot>
        </table>
    )
}