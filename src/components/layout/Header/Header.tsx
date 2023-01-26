import { AccountInfo } from "./AccountInfo";
import { Logo } from "./Logo";
import { Navigation } from "./Navigation";

export const Header = () => {
    return (
        <header className="header">
            <Logo />
            <Navigation />
            <AccountInfo />
        </header>
    );
};