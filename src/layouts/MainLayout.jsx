import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";


export function MainLayout(){
    return(
        <div className="flex">
            <Sidebar />
                <div className="flex-1 bg-gray-50 min-h-screen">
                <Header />

                <Outlet/>
        </div>
    </div>
    )
}