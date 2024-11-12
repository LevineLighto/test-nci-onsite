import { FormTransaksi } from "@/Transaksi/Components/FormTransaksi";
import { FC } from "react";
import { ToastContainer } from "react-toastify";


const App : FC = () => {
    return (
        <>
            <main className="px-5 pb-5">
                <FormTransaksi/>
            </main>
            <ToastContainer/>
        </>
    )
}

export default App