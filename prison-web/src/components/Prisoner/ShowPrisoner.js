import Prisoner from "./Prisoner"
import { useLocation } from "react-router-dom";


const ShowPrisoner = () => {
    let data = useLocation();
    return (<Prisoner id={data.state.id} />);
}

export default ShowPrisoner;