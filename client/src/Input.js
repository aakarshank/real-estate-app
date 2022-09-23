



/*



NOTE: Use event listener on button in App.js so that when it's clicked, it displays API Call.


*/
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from './Auth';
import Spinner from 'react-bootstrap/Spinner'
import Pagination from 'react-bootstrap/Pagination';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

export default function Input(){
    const navigate=useNavigate();
    const[spinner,setSpinner] = useState(false);
    const [componentShowTrue,setComponentShowTrue] = useState(false);
    const [totalPageCount,setTotalPageCount] = useState(null);
    //currentPage is changed whenever page is changed to render new data for that page
    const [currentPage,setCurrentPage] = useState(0);
    //data that will be shown on a particular page
    const[showedData,showData] = useState(null);
    //updates content to whatever page the user wants to see
    function updatePage(pageToBeUpdatedTo){
        const firstIndex = pageToBeUpdatedTo*9;
        const lastIndex=pageToBeUpdatedTo*9+9;
        setCurrentPage(pageToBeUpdatedTo);
        showData(componentShowTrue.slice(firstIndex,lastIndex))
    }
    function handleClick(){
          setSpinner(true);
          var state = document.getElementById('states').value;
          var city = document.getElementById('city').value.replace(/\s/g,'%20')
          const options = {
            method: 'GET',
            headers: {
              'X-RapidAPI-Key': '855bd2bf2cmshe2a54b2a1587f75p191d25jsn98051050cfc8',
              'X-RapidAPI-Host': 'real-estate12.p.rapidapi.com'
            }
          };
          fetch(`https://real-estate12.p.rapidapi.com/listings/sale?state=${state}&city=${city}&page=1&sort=relevant&type=single-family%2Cmulti-family`, options)
            .then(response => response.json())
            .then(response => {
            console.log(response)
            setSpinner(false);
            showData(response.properties.slice(0,9))
            setComponentShowTrue(response.properties);
            setTotalPageCount([...Array(Math.ceil(response.properties.length/9)).keys()])
            })
    }
    
    return (

    <div className='input'>
      <FormControl id='states' sx={{marginTop:5,border:'.1em solid black',width:'70vw'}} variant="filled">
          <InputLabel>Choose a State:</InputLabel>
          <Select>
            <MenuItem value="AL">Alabama</MenuItem>
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
          </Select>
      </FormControl><br /><br />
      <FormControl>
        <TextField label='Name of City' id='city' variant='filled' sx={{width:'70vw'}} />
        <Button variant="dark" id="submitButton" onClick={handleClick}>Submit</Button>
      </FormControl>
        <InputGroup>
          <Form.Control placeholder="Name of City" id='city'>
          </Form.Control>
        </InputGroup>
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
                  
                  <Button onClick={()=>{
                    fetch('/api',{
                      method:'POST',
                      mode:'cors',
                      headers:{'Content-Type':'application/json'},
                      body: JSON.stringify({
                        propertyPrice:(property.list_price).toLocaleString(),
                        propertyBeds:property.description.beds,
                        propertyBaths:property.description.baths,
                        propertyStatus:property.status.replaceAll("_"," "),
                        propertyImage:(property.home_photos?property.home_photos.collection[0].href:null)
                      })
                    })
                  }}>Add to Database!</Button>
              </div>
              <img src={property.home_photos? property.home_photos.collection[0].href:null} />
              </div>))}
          </div>
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
            <Spinner animation="border" />
         ):null}
        </div>
        </div>
    )
}