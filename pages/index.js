import { useState, useEffect } from 'react'
import axios from 'axios'
import Cards from '../components/Cards'
export default function Home(data) {
  const [selectedValue, setValue]= useState('');
  const[newCity, setCity]=useState({});
  const[arrayOfCitys, setArrayCitys]=useState([]);
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
  useEffect(()=>{
    getDataFromSelect()
  },[selectedValue])
  useEffect(()=>{
    getDataCity();
  },[])

  const getDataFromSelect = ()=>{
    const url =`http://worldtimeapi.org/api/timezone/${selectedValue}`
    const response = fetch (url);
    response
    .then(datos => datos.json())
    .then(lectura =>{ setCity(lectura)})
    
  }
  const getDataCity = ()=>{
    const url ='http://worldtimeapi.org/api/timezone/Europe'
    const response = fetch (url);
    response
    .then(datos => datos.json())
    .then(lectura =>{ setArrayCitys((lectura))})
    
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
              <option>Search a zone</option>
             {
              arrayOfCitys.map((citys, index)=>
                  <option key={index} defaultValue={citys}>{citys}</option>
                )
              
             }
            </select>
      </form>
  </div>



        {
        data.data.map((country) => 
          <div>
          <Cards key={data} timezone={country.timezone} datatime={country.datetime}/>
          </div>
        )}
         <button style={{color:'white', marginLeft:'100px', backgroundColor:'red'}} onClick={()=>{console.log(data, arrayOfCitys)}}>Horas</button>
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

