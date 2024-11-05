import React from "react";
import classNames from "classnames";
import  { ReactComponent as Logo } from "./Lumetry.svg"   

import "./Header.scss";

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const Header = ({ className }: HeaderProps) => {
    return (
        <header
            className={classNames(
                className,
                "header p-4 shadow-md fixed top-0 z-[1000] w-full backdrop-blur-md bg-neutral-950/30"
            )}
        >
                <Logo style={{ width: "150px", margin: "auto" }}/>
        </header>
    );
};

export default Header;
