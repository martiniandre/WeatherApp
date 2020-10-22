import React,{useState,useEffect,ChangeEvent} from 'react';
import axios from 'axios'
import './styles.css'

interface IWeather{
  name: string,
  main:{
    temp:number,
    feels_like:number,
    humidity:number,
    pressure:number,
    temp_max:number,
    temp_min:number
  },
  weather:[{
    main:string,
    description:string,
    icon:string,
  }]
}

function Weather() {
  
 const [weather,setWeather] = useState<IWeather>({
   name:"",
   main:{
    temp:0,
    feels_like:0,
    humidity:0,
    pressure:0,
    temp_max:0,
    temp_min:0
  },
  weather:[{
    main:"",
    description:"",
    icon:"",
  }]
 });
 const [location,setLocation] = useState<String>('Jundiai');
 const [search, setSearch] = useState<String>('Jundiai,br');


 function Location(event:ChangeEvent<HTMLInputElement>){
      setLocation(event.target.value)
 }
 function getLocation(){
    setSearch(location)
}


 useEffect(()=>{
  axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=666b26dc14e7c7a589df1cfe9ad24fbb&units=metric`)
  .then(response => setWeather(response.data))
  },[search])
  return (
    <main>
      <section>
        <div className={'cards ' + weather.weather[0].main}>
        <div className='search'>
          <input type="text" onChange={Location} placeholder="Exemplo: Jundiai,br"/>
          <input type="submit" onClick={getLocation} value="Buscar"/>
        </div>
          <div className='main'>
            <div className="wrapper">
            <div className="information">
              <img src={"http://openweathermap.org/img/w/" + weather.weather[0].icon + ".png"} alt="weather-icon"/>
              <h1>{weather.name}</h1>
              {/* <div>{weather.weather[0].icon}</div> */}
              <h2>{weather.weather[0].main}</h2>
              <h3>{weather.weather[0].description}</h3>
              </div>
            <div className="temp">
              <div className="important-info">
                <div>
                  <h1>Max</h1>
                  <span>{(weather.main.temp_max).toFixed(0)} °C</span>
                </div>
                <div>
                  <h1>Temp</h1>
                  <span>{(weather.main.temp).toFixed(0)} °C</span>
                </div>
                <div>
                  <h1>Min</h1>
                  <span>{(weather.main.temp_min).toFixed(0)} °C</span>
                </div>
               </div>
              <div className="others-info">
                <div>
                  <h1>Feels</h1>
                  <span>{(weather.main.feels_like).toFixed(0)} °C</span>
                </div>
                <div>
                  <h1>Humidity</h1>
                  <span>{weather.main.humidity}%</span>
                </div>
                
               </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

  );
}

export default Weather;