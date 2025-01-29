import {FC} from 'react';
import {Outlet} from "react-router-dom";
import {Header} from "../components/Header/Header";

interface IProps {

}

const MainLayout: FC<IProps> = () => {
    return (
        <div className={'bg-blue-100 min-h-[100vh]'}>
            <Header/>
            <main className={'wrapper'}>
                <Outlet/>
            </main>
        </div>
    );
};

export {MainLayout};