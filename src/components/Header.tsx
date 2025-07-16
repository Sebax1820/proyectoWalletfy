import { Link } from "@tanstack/react-router";

export default function Header() {
    return (
        <header>
            <div className="text-2xl p-4 font-bold">
                <Link to="/">Wallet<span className="text-violet-500">fy</span> 2</Link>
                
            </div>
            
        </header>
    )
}