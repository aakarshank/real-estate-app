



/*



NOTE: Use event listener on button in App.js so that when it's clicked, it displays API Call.


*/
import React from 'react'
import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner'
import Pagination from 'react-bootstrap/Pagination';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import {auth} from "./firebase-config";
const currentUser = auth.currentUser;
export default function Input(){
    const navigate=useNavigate();
    const[spinner,setSpinner] = useState(false);
    const [componentShowTrue,setComponentShowTrue] = useState(false);
    const [totalPageCount,setTotalPageCount] = useState(null);
    const [state,setState] = useState('');
    //currentPage is changed whenever page is changed to render new data for that page
    const [currentPage,setCurrentPage] = useState(0);
    //data that will be shown on a particular page
    const[showedData,showData] = useState(null);

    const [pageLoaded,setPageLoaded] = useState(false);
    //updates content to whatever page the user wants to see
    function updatePage(pageToBeUpdatedTo){
        const firstIndex = pageToBeUpdatedTo*9;
        const lastIndex=pageToBeUpdatedTo*9+9;
        setCurrentPage(pageToBeUpdatedTo);
        showData(componentShowTrue.slice(firstIndex,lastIndex))
    }

    const handleClose = (event,reason) => {
      if (reason=='clickaway') {
        return;
      }

      setPageLoaded(false);
    }
    function handleClick(){
          setSpinner(true);
          
          var city = document.getElementById('city').value.replace(/\s/g,'%20')
          const options = {
            method: 'GET',
            headers: {
              'X-RapidAPI-Key': '51629d3c9amshf0dd1ca49eeff31p107219jsne677d28bb921',
              'X-RapidAPI-Host': 'real-estate12.p.rapidapi.com'
            }
          };
          fetch(`https://real-estate12.p.rapidapi.com/listings/sale?state=${state}&city=${city}&page=1&sort=relevant&type=single-family%2Cmulti-family`, options)
            .then(response => response.json())
            .then(response => {   
            setSpinner(false);
            showData(response.properties.slice(0,9))
            setComponentShowTrue(response.properties);
            setTotalPageCount([...Array(Math.ceil(response.properties.length/9)).keys()])
            })
    }
    
    return (
      <div>
        {showedData ? (
          <div>
          <div className='property-grid'>
            {showedData.map((property)=>(
                <div className='property'>
                <div className='propertyDescription'>
                  <h1 style={{color:'black',fontSize:'2.1em'}}>${(property.list_price).toLocaleString()}</h1>
                  <h2>{property.description.beds} Beds</h2>
                  <h2>{property.description.baths} Baths</h2>
                  <h2>{property.status.replaceAll("_"," ")}</h2>
                  {console.log(auth.currentUser)} 
                  <button onClick={()=>{
                    fetch('/api',{
                      method:'POST',
                      mode:'cors',
                      headers:{'Content-Type':'application/json'},
                      body: JSON.stringify({
                        propertyPrice:(property.list_price).toLocaleString(),
                        propertyBeds:property.description.beds,
                        propertyBaths:property.description.baths,
                        propertyStatus:property.status.replaceAll("_"," "),
                        propertyImage:(property.home_photos?property.home_photos.collection[0].href:null),
                        currentUser:auth.currentUser.email
                      })
                    }).then((response) => response.json())
                    .then((data) => {
                      console.log('data sent to server')
                      setPageLoaded(true);

                    })
                    .catch((error) => {
                      console.error('Error:', error);
                    });
                  }}>Add Property</button>
              </div>
              <img src={property.home_photos? property.home_photos.collection[0].href:null} />
              </div>))}
          </div>
          <Snackbar
            open={pageLoaded}
            autoHideDuration={2000}
            onClose={handleClose}
            message="Property Added"
          ></Snackbar>
          <div>
          <Pagination>
          {totalPageCount.map((item,page)=>{
            return (
              <Pagination.Item active={page==currentPage} onClick={()=>{updatePage(page)}}>{page+1}</Pagination.Item>
            )
          })}
          </Pagination>
          </div>
          </div>
        )
         : spinner==true ? (
            <Spinner animation="border" variant="info" />
         ):(
    <div className='input'>
      <div className='title' id='title'>
                <h1>Find homes on AK State</h1>
                <h3>Select a state and city and find the home for you!</h3>
      </div>
      <FormControl sx={{marginTop:5,width:'70vw'}} variant="filled" >
          <InputLabel style={{color:'grey'}}>Name of State</InputLabel>
          <Select value={state} id='states' style={{width:'70vw',backgroundColor:'white','&:hover':{backgroundColor:'#EAECE9'}}} onChange={(event)=>setState(event.target.value)}>
            <MenuItem value={'AL'}>Alabama</MenuItem>
            <MenuItem value="AK">Alaska</MenuItem>
            <MenuItem value="AZ">Arizona</MenuItem>
            <MenuItem value="AR">Arkansas</MenuItem>
            <MenuItem value="CA">California</MenuItem>
            <MenuItem value="CO">Colorado</MenuItem>
            <MenuItem value="CT">Connecticut</MenuItem>
            <MenuItem value="DE">Delaware</MenuItem>
            <MenuItem value="DC">District Of Columbia</MenuItem>
            <MenuItem value="FL">Florida</MenuItem>
            <MenuItem value="GA">Georgia</MenuItem>
            <MenuItem value="HI">Hawaii</MenuItem>
            <MenuItem value="ID">Idaho</MenuItem>
            <MenuItem value="IL">Illinois</MenuItem>
            <MenuItem value="IN">Indiana</MenuItem>
            <MenuItem value="IA">Iowa</MenuItem>
            <MenuItem value="KS">Kansas</MenuItem>
            <MenuItem value="KY">Kentucky</MenuItem>
            <MenuItem value="LA">Louisiana</MenuItem>
            <MenuItem value="ME">Maine</MenuItem>
            <MenuItem value="MD">Maryland</MenuItem>
            <MenuItem value="MA">Massachusetts</MenuItem>
            <MenuItem value="MI">Michigan</MenuItem>
            <MenuItem value="MN">Minnesota</MenuItem>
            <MenuItem value="MS">Mississippi</MenuItem>
            <MenuItem value="MO">Missouri</MenuItem>
            <MenuItem value="MT">Montana</MenuItem>
            <MenuItem value="NE">Nebraska</MenuItem>
            <MenuItem value="NV">Nevada</MenuItem>
            <MenuItem value="NH">New Hampshire</MenuItem>
            <MenuItem value="NJ">New Jersey</MenuItem>
            <MenuItem value="NM">New Mexico</MenuItem>
            <MenuItem value="NY">New York</MenuItem>
            <MenuItem value="NC">North Carolina</MenuItem>
            <MenuItem value="ND">North Dakota</MenuItem>
            <MenuItem value="OH">Ohio</MenuItem>
            <MenuItem value="OK">Oklahoma</MenuItem>
            <MenuItem value="OR">Oregon</MenuItem>
            <MenuItem value="PA">Pennsylvania</MenuItem>
            <MenuItem value="RI">Rhode Island</MenuItem>
            <MenuItem value="SC">South Carolina</MenuItem>
            <MenuItem value="SD">South Dakota</MenuItem>
            <MenuItem value="TN">Tennessee</MenuItem>
            <MenuItem value="TX">Texas</MenuItem>
            <MenuItem value="UT">Utah</MenuItem>
            <MenuItem value="VT">Vermont</MenuItem>
            <MenuItem value="VA">Virginia</MenuItem>
            <MenuItem value="WA">Washington</MenuItem>
            <MenuItem value="WV">West Virginia</MenuItem>
            <MenuItem value="WI">Wisconsin</MenuItem>
            <MenuItem value="WY">Wyoming</MenuItem>
          </Select><br /><br /><br />
          <TextField sx={{width:'70vw',backgroundColor:'white'}} label="Name of City" id='city' variant='filled'/><br /><br /><br />
          <Button variant="dark" id="submitButton" onClick={handleClick} sx={{height:'6vh',backgroundColor:'lightBlue',fontColor:'black','&:hover':{backgroundColor:'#95CDF1'}}}>Find properties</Button>
      </FormControl>
    </div>
    )}
    </div>
    )
}