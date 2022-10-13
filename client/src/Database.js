import { useState,useEffect } from "react"
import {auth} from "./firebase-config";
export default function Database(){
    const [propertyData,setPropertyData] = useState([]);
    const fetchData = async () => {
        const response = await fetch(`/query/${auth.currentUser.email}`);

        setPropertyData(await response.json())
    }
    useEffect(()=>{
       fetchData()
    },[])
    return (
        <div className='db'>
            <h1>List of Properties</h1>
            <div className='property-grid'>
            {console.log(propertyData)}
            {propertyData.map((property)=>{
                {console.log(property)}
                return (
                <div className='property'>
                    <div className="propertyDescription">
                        <h1>${property.userProperties.price}</h1>
                        <h1>{property.userProperties.beds} Beds</h1> 
                        <h1>{property.userProperties.baths} Baths</h1>
                        <h1>{property.userProperties.status}</h1>
                    </div>
                <img src={property.userProperties.image} />
                </div>
                )
            })}
            </div>
        </div>
    )
}