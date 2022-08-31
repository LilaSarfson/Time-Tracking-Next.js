import { useState } from 'react'
import axios from 'axios'
import Cards from '../components/Cards'
export default function Home(data) {
  const [selectedValue, setValue]= useState('');
  const[newCity, setCity]=useState({});
  const setValueTo = (e) =>{
    setValue(e.target.value)
  }
  // En esta función utilizo el fetch normal para llamar a la API
  async function getDataFormSelect (){
    const url =`http://worldtimeapi.org/api/timezone/Europe/${selectedValue}`
    
    const fetchPromise = await fetch (url).then((response)=>{ response.json()})
   setCity(fetchPromise);
    // const goodResponse = await response.json().then
    // setCity(goodResponse)
    // data.data.push(newCity);
  }
  return (
    <>
      <div className='flex flex-row flex-wrap gap-52'>
        <div className="flex justify-center">
          <form className="mb-3 xl:w-96">
            <label>Do you miss any place?</label>
            <select onChange={setValueTo} className="form-select form-select-sm
            appearance-none
            block
            w-full
            px-2
            py-1
            text-sm
            font-normal
            text-gray-700
            bg-white bg-clip-padding bg-no-repeat
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label=".form-select-sm example">
              {/* Que las opciones entren por el fetch */}
              <option>Search a zone</option>
              <option defaultValue='Amsterdam'>Amsterdam</option>
              <option defaultValue='Ulyanovsk'>Ulyanovsk</option>
              <option defaultValue='Stockholm'>Stockholm</option>
            </select>
      </form>
  </div>



        {
        data.data.map((country) => 
          <div>
          <Cards key={data} timezone={country.timezone} datatime={country.datetime}/>
          </div>
        )}
         <button style={{color:'white', marginLeft:'100px', backgroundColor:'red'}} onClick={()=>{console.log(data, selectedValue, newCity)}}>Horas</button>
    </div>
    </>
  )
}
export async function getStaticProps() {
  let arrayOfData=[];
  let arrayOfCitys = [
    {continent: 'Europe',
   ciudad:'Oslo'},
   {continent: 'Europe',
   ciudad:'Paris'},
   {continent: 'Europe',
   ciudad:'Istanbul'}
    ]; 
    for (let index = 0; index < arrayOfCitys.length; index++) {
         
         const element = arrayOfCitys[index];
         let continent = element.continent;
         let area = element.ciudad;
   // En esta función utilizo axios para llamar a API
  const url = `http://worldtimeapi.org/api/timezone/${continent}/${area}`
  const response =await axios.get(url)
  const responseData= response.data;
  arrayOfData = [...arrayOfData, responseData]
  } 
return { props: { data: arrayOfData} };
}

