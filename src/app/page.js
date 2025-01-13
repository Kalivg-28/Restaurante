import { getPlatillos } from "../../lib/querys";
import Cards from "@/components/Cards/Cards";

export default function Home() {
    const platillos = getPlatillos();

    return (
        <div className="">
            <Cards platillos={platillos}></Cards>
        </div>
    );
}
