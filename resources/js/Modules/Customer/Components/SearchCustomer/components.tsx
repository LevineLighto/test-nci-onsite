import { Search } from "@/Components/Inputs/Search";
import { FC, useEffect, useRef, useState } from "react";
import { Response } from "@/Types/response";
import { InputChangeHandler } from "@irimold/react-component";
import { Customer } from "@/Customer/Types";
import { CurrentSite } from "@/Helpers/CurrentSite";

interface Props {
    onChange?   : InputChangeHandler
    value?      : string
}

export const SearchCustomer : FC<Props> = ({
    value = '',
    onChange
}) => {
    const [data, setData] = useState([])
    const [searched, setSearched] = useState('')

    const searchTimeoutRef = useRef<ReturnType<typeof setTimeout>>()

    const search = (value : string) => {
        fetch(`${CurrentSite()}customer?search=${value}`)
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
            name="customer"
            label="Customer"
            onSearch={handleSearch}
            onSelect={handleSelect}
            value={searched ? searched : value}
            renderOption={(value : Customer, onclick) => (
                <div 
                    onClick={onclick}
                    className="bg-white hover:bg-slate-100 cursor-pointer rounded p-2"
                >
                    <p className="font-bold text-lg">{ value.nama_customer }</p>
                    <p>{ value.alamat }</p>
                </div>
            )}
            options={data}
        />
    )
}