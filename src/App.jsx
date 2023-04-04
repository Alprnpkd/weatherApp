import { useEffect, useState } from 'react'
import axios from 'axios';

import './App.css'
import City from './City';
import Loading from './Loading';


function App() {

  const api_key ="f97b989e2ce38a07303324a4f9c04606" ;
  const [search, setSearch] = useState("");
  const [city, setCity] = useState();
  const [empty, setEmpty] = useState(true);
  const [loading, setLoading] = useState(false);
  


  const handleSearch = (e) => {
    e.preventDefault();
    setEmpty(false);
    async function getApi() {
      setLoading(true) ;
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${search}&lang=tr&appid=${api_key}&units=metric`
        );
        console.log(response);
        setCity(response.data);
        setLoading(false) ;
      } catch (error) {
        setLoading(false) ;
        setCity(null) ;
        console.error(error);
      }
    }
    getApi();
  }
  
   
  
  return (
    <div className='container'>  
    <div className="App"> 
      {loading ? (
        <Loading />
      ) : (
        <div>
          {empty ? (
            <form onSubmit={handleSearch}>
              <input
                onChange={(e) => setSearch(e.target.value.trim())}
                type="text"
                placeholder="Bir Şehir Giriniz..."
                className=" "
              />
              <button type="submit">Ara</button>
              
              <h3 className='enterCity' >Bir Şehir Giriniz...</h3>
             
              
            </form>
          ) : (
            <div>
              <form onSubmit={handleSearch}>
                <input 
                  onChange={(e) => setSearch(e.target.value.trim())}
                  type="text"
                  placeholder="Bir Şehir Giriniz..."
                  className=" "
                />
                <button type="submit">Ara</button>
              </form>
              {city ? (
              <City city={city} />
            ) : (
              <p>Şehir bulunamadı.</p>
            )}
              
            </div>
          )}
        </div>
      )}
    </div>
    </div>
  );
          }
export default App;
