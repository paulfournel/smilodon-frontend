import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import {NavbarComponent} from "./NavbarComponent";
import {SettingsLayout} from "./SettingsLayout";

export function Settings() {


    return (
        <div>
            <NavbarComponent/>
            <SettingsLayout/>
        </div>
    )
}
