import { getPlatillos } from "../../../lib/querys";
import Cards from "@/components/Cards/Cards";

export default function Mesero(){
    const platillos = getPlatillos();

    return (
        <div>
            <Cards platillos={platillos}></Cards>
        </div>
    );
}