import { Search } from "@/Components/Inputs/Search";
import { FC, useEffect, useRef, useState } from "react";
import { Response } from "@/Types/response";
import { InputChangeHandler } from "@irimold/react-component";
import { Barang } from "@/Barang/Types";
import { CurrentSite } from "@/Helpers/CurrentSite";

interface Props {
    onChange?   : InputChangeHandler
    value?      : string
}

export const SearchBarang : FC<Props> = ({
    onChange,
    value
}) => {
    const [data, setData] = useState([])
    const [searched, setSearched] = useState('')

    const searchTimeoutRef = useRef<ReturnType<typeof setTimeout>>()

    const search = (value : string) => {
        fetch(`${CurrentSite()}barang?search=${value}`)
            .then(async response => {
                if (!response.ok) {
                    return
                }

                const result : Response = await response.json()
                setData(result.data)
            })
            .catch(error => {
                console.error(error)
            })
    }

    const handleSearch = (val: string) => {
        clearTimeout(searchTimeoutRef.current)
        setSearched(val)
        searchTimeoutRef.current = setTimeout(() => {
            search(val)
        }, 300)
    }

    const handleSelect : InputChangeHandler = (result) => {
        if (typeof onChange == 'function') {
            onChange(result)
        }

        setSearched('')
    }

    useEffect(() => {
        search('')
    }, [])

    return (
        <Search
            name="barang"
            placeholder="Cari nama atau kode barang"
            onSearch={handleSearch}
            onSelect={handleSelect}
            value={searched ? searched : value}
            options={data}
            renderOption={(value : Barang, onclick) => (
                <div 
                    onClick={onclick}
                    className="bg-white hover:bg-slate-100 cursor-pointer rounded p-2"
                >
                    <p className="font-bold text-lg">{ value.nama_barang }</p>
                    <p className="">Rp{ Number(value.harga).toLocaleString('id') }</p>
                    <p className="">Stock: { value.stok }</p>
                </div>
            )}
        />
    )
}