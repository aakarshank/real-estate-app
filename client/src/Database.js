import { useState,useEffect } from "react"

export default function Database(){
    const [propertyData,setPropertyData] = useState([]);
    const fetchData = async () => {
        const response = await fetch('/query');

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
                return (
                <div className='property'>
                    <div className="propertyDescription">
                        <h1>${property.price}</h1>
                        <h1>{property.beds} Beds</h1> 
                        <h1>{property.baths} Baths</h1>
                        <h1>{property.status}</h1>
                    </div>
                <img src={property.image} />
                </div>
                )
            })}
            </div>
        </div>
    )
}