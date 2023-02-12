import { useState, useEffect } from 'react'
// import reactLogo from ''
import imgsky from './assets/img-sky.jpg'
import axios from 'axios'
import './App.css'


function App() {
  
  const [sky, setSky] = useState({});
  const [isCelcius, setIsCelcius] = useState(true);
  
  useEffect(() => {
    

    function success(pos) {
      const crd = pos.coords;
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=96db1ea270fe1dcccfce430d964b31ee`)
       .then(res => setSky(res.data));
    
      console.log('Your current position is:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
    }
    
    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    
    navigator.geolocation.getCurrentPosition(success, error);



  }, [])

  // console.log(sky)

  const kelvin = sky.main?.temp;
  
  const celcius = kelvin- 273.15;
  
  const fahrenheit = (kelvin - 273.15) *1.8000 + 32.00;

  const changeTemp = () => {
    setIsCelcius(!isCelcius);
  }

  
  document.body.style = {background: "red"}

  // console.log(celcius);
  return (
    <div className="App">
      <h1>
         Weather App
        </h1>

        <h2>
         {sky.name}, {""}
         {sky.sys?.country}

        </h2>

      <div className='sky-conteiner'>
        

        <div className='sky-01'>
         <img src= {`http://openweathermap.org/img/wn/${sky.weather?.[0].icon}@2x.png`}alt="" />
          
         

          <p>
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M176 322.9l.0002-114.9c0-8.75-7.25-16-16-16s-15.1 7.25-15.1 16L144 322.9c-18.62 6.625-32 24.25-32 45.13c0 26.5 21.5 48 48 48s48-21.5 48-48C208 347.1 194.6 329.5 176 322.9zM272 278.5V112c0-61.87-50.12-112-111.1-112S48 50.13 48 112v166.5c-19.75 24.75-32 55.5-32 89.5c0 79.5 64.5 143.1 144 143.1S304 447.5 304 368C304 334 291.8 303.1 272 278.5zM160 448c-44.13 0-80-35.87-80-79.1c0-25.5 12.25-48.88 32-63.75v-192.3c0-26.5 21.5-48 48-48s48 21.5 48 48v192.3c19.75 14.75 32 38.25 32 63.75C240 412.1 204.1 448 160 448z"/></svg>{" "}
           {isCelcius ?  celcius.toFixed(0) : fahrenheit.toFixed(0)} {""}
           {isCelcius ? "°C" : "°F" }

          </p>
        </div>


        <div className='sky-02'>
          <h2>
           "scattered clouds"
          </h2>
          <h3>
           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-wind" viewBox="0 0 16 16"> <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5zm-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2zM0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5z"/> </svg>{" "}
           
           Wind speed: <p>{sky.wind?.speed} m/s</p>

          </h3>
          <h3>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-clouds" viewBox="0 0 16 16"> <path d="M16 7.5a2.5 2.5 0 0 1-1.456 2.272 3.513 3.513 0 0 0-.65-.824 1.5 1.5 0 0 0-.789-2.896.5.5 0 0 1-.627-.421 3 3 0 0 0-5.22-1.625 5.587 5.587 0 0 0-1.276.088 4.002 4.002 0 0 1 7.392.91A2.5 2.5 0 0 1 16 7.5z"/> <path d="M7 5a4.5 4.5 0 0 1 4.473 4h.027a2.5 2.5 0 0 1 0 5H3a3 3 0 0 1-.247-5.99A4.502 4.502 0 0 1 7 5zm3.5 4.5a3.5 3.5 0 0 0-6.89-.873.5.5 0 0 1-.51.375A2 2 0 1 0 3 13h8.5a1.5 1.5 0 1 0-.376-2.953.5.5 0 0 1-.624-.492V9.5z"/> </svg>{" "}


           Clouds: <p>{sky.clouds?.all}%</p>

          </h3>
          <h3>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-moisture" viewBox="0 0 16 16"> <path d="M13.5 0a.5.5 0 0 0 0 1H15v2.75h-.5a.5.5 0 0 0 0 1h.5V7.5h-1.5a.5.5 0 0 0 0 1H15v2.75h-.5a.5.5 0 0 0 0 1h.5V15h-1.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 .5-.5V.5a.5.5 0 0 0-.5-.5h-2zM7 1.5l.364-.343a.5.5 0 0 0-.728 0l-.002.002-.006.007-.022.023-.08.088a28.458 28.458 0 0 0-1.274 1.517c-.769.983-1.714 2.325-2.385 3.727C2.368 7.564 2 8.682 2 9.733 2 12.614 4.212 15 7 15s5-2.386 5-5.267c0-1.05-.368-2.169-.867-3.212-.671-1.402-1.616-2.744-2.385-3.727a28.458 28.458 0 0 0-1.354-1.605l-.022-.023-.006-.007-.002-.001L7 1.5zm0 0-.364-.343L7 1.5zm-.016.766L7 2.247l.016.019c.24.274.572.667.944 1.144.611.781 1.32 1.776 1.901 2.827H4.14c.58-1.051 1.29-2.046 1.9-2.827.373-.477.706-.87.945-1.144zM3 9.733c0-.755.244-1.612.638-2.496h6.724c.395.884.638 1.741.638 2.496C11 12.117 9.182 14 7 14s-4-1.883-4-4.267z"/> </svg>{" "}


            Humidity: <p>{sky.main?.humidity}%</p>

          </h3>

        </div>
      
      </div>



      <div className='sky-button'>
        <button className='button' onClick={changeTemp}>
          °C / °F
        </button>
      </div>
      

    </div>
  )
}

export default App
