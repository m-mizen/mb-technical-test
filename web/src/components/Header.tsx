/* 
I originally was going to make this header change on different screen sizes and theme (light/dark), but having checked it in the browser, I think it works well as is.
*/

import Image from "next/image";
export function Header() {
    return (
        <header className="w-full flex justify-center items-center py-4 bg-dark-green">
            <Image src="/moneybox-logo-dark.svg" alt="Moneybox Logo" width={240} height={40} />
        </header>
    );
}