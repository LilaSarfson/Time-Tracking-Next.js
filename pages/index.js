import { useState, useEffect } from 'react'
import axios from 'axios'
import Cards from '../components/Cards'
import SearchBar from '../components/SearchBar';

export default function Home(data) {

  const [selectedValue, setValue]= useState('');
  const[newCity, setCity]=useState({});
  const[arrayOfCitys, setArrayCitys]=useState([]);
  const [inputValue, setInputValue]=useState('');
  const [filteredData, setFilteredData]=useState([]);
  const [searchActive, setSearchActive]=useState(false)

  /*Esta función:
  captura el valor del option del select
  mira si ya existe entre el array renderizado y si no lo está, lo añade al array para ser renderizado. 
  Si ya está dentro del mismo, salta una alerta.
  */
  const setValueTo = (e) =>{
    setValue(e.target.value);
    const isRepeat = data.data.some((city) => city.timezone==newCity.timezone)
    if(newCity.length!== 46 && !isRepeat){
      data.data.push(newCity)
    }
    else if (isRepeat){
      alert(`City selected is already consulted ${selectedValue}`)
    }
  }

  /*Para que se renderice las distintas opciones del select con los datos de la API */ 
  useEffect(()=>{
    getDataCity();
  },[])

  /*Para que la llamada a la API solo se ejecute cuando se haya seleccionado un valor dentro del select */  
  useEffect(()=>{
    getDataFormSelect()
  },[selectedValue])


/*Llamada a la api para traer los datos impuestos en el select */
  const getDataFormSelect = ()=>{
    const url =`http://worldtimeapi.org/api/timezone/${selectedValue}`
    const response = fetch (url);
    response
    .then(datos => datos.json())
    .then(lectura =>{ setCity(lectura)})
    
  }
  /*Llamada a la api para traer todos los datos de Europe y renderizarlos en el select como options */
  const getDataCity = ()=>{
    const url ='http://worldtimeapi.org/api/timezone/Europe'
    const response = fetch (url);
    response
    .then(datos => datos.json())
    .then(lectura =>{ setArrayCitys((lectura))})
    
  }
  /*Función para hacer el filtrado de ciudades
  capturo del valor del input
  Establezco que la app está en modo "search"
  filtro el array de ciudades para que me devuelva las coincidencias con el valor del input
  Seteo el array resultante en el useState de dataFiltered
  */
  const searchOnCityArray = (e)=> {
    setInputValue(e.target.value)
    setSearchActive(true)
    let dataFiltered = data.data.filter((city)=> city.timezone.includes('Europe/'+capitalize(inputValue)));
    setFilteredData(dataFiltered);
    console.log(inputValue)
  }

  /*Función para capitalizar la primera letra del input.value, para que así haga match con lo que se busca. También, en el futuro, se deberían contemplar otro
  tipos de inputs erróneos por parte del usurio.
  */
  const capitalize = (s) =>
    {
      if(s!=='')
    return s[0].toUpperCase() + s.slice(1);
    }

  return (
    <>
      <div className=' flex flex-col gap-32'>
        <h1 className='text-5xl font-mono	font-medium	tracking-tighter text-center	'>Europe Time Tracking</h1>
            <form className="flex flex-col gap-5 mb-3 xl:w-96 self-center	">
              <p className='text-center text-lg font-bold	uppercase	'>Do you miss any place?</p>
              <select onChange={setValueTo} className="form-select form-select-sm
              appearance-none
              block
              w-full
              px-2
              py-1
              text-base
              font-normal
              text-gray-700
              bg-white bg-clip-padding bg-no-repeat
              border border-solid border-gray-300
              rounded
              transition
              ease-in-out
              m-0
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label=".form-select-sm example">
               {
                arrayOfCitys.map((citys, index)=>
                    <option key={index} defaultValue={citys}>{citys}</option>
                  )
        
               }
              </select>
        </form>
        <SearchBar
        searchOnCityArray={searchOnCityArray}
        inputValue={inputValue}
        setInputValue={setInputValue}
        />
        <div className='flex flex-row flex-wrap justify-center gap-10'>
          
          {
            inputValue==''?
            data.data.map((country, index) =>
            <div>
            <Cards key={index} timezone={country.timezone} datatime={country.datetime}/>
            </div>)
            :
            searchActive ? 
            filteredData.map((country, index)=>  
            <div>
            <Cards key={index} timezone={country.timezone} datatime={country.datetime}/>
            </div>)
            :
            data.data.map((country, index) =>
            <div>
            <Cards key={index} timezone={country.timezone} datatime={country.datetime}/>
            </div>)
          }
        </div>
      </div>
    </>
  )
}

// En esta función utilizo axios para llamar a API

export async function getStaticProps() {
  let arrayOfData=[];
  let arrayOfCitys = [
    {continent: 'Europe',
   ciudad:'Oslo'},
   {continent: 'Europe',
   ciudad:'Paris'},
   {continent: 'Europe',
   ciudad:'Prague'},
   {continent: 'Europe',
   ciudad:'Istanbul'}
    ]; 
    for (let index = 0; index < arrayOfCitys.length; index++) {
         
         const element = arrayOfCitys[index];
         let continent = element.continent;
         let area = element.ciudad;
  const url = `http://worldtimeapi.org/api/timezone/${continent}/${area}`
  const response =await axios.get(url)
  const responseData= response.data;
  arrayOfData = [...arrayOfData, responseData]
  } 
return { props: { data: arrayOfData} };
}

