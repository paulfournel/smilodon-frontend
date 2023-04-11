import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import {NavbarComponent} from "./NavbarComponent";
import {MainLayout} from "./MainLayout";

export function Home() {


    return (
        <div>
            <NavbarComponent/>
            <MainLayout />
        </div>
    )
}
