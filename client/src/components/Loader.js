import { useState } from "react";
import BounceLoader from "react-spinners/BounceLoader";

const override = {
        display: "block",
        
        borderColor: "red",
      };
       
const Loader = () => {
    let [loading, setLoading] = useState(true);
      let [color, setColor] = useState("#36D7B7");
      
    return ( 
    <div className="sweet-loading">
    <BounceLoader color={color} loading={loading} cssOverride='' size={80} />
  </div> );
}
 
export default Loader;