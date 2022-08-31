import { useState } from 'react'
import axios from 'axios'
import Cards from '../components/Cards'
export default function Home(data) {
  return (
    <>
      <div className='flex flex-row flex-wrap gap-52'>
        <p>Hola</p>
        {
        data.data.map((country) => 
          <div>
          <Cards key={country.length} timezone={country.timezone} datatime={country.datetime}/>
          </div>
        )}
         <button style={{color:'white', marginLeft:'100px', backgroundColor:'red'}} onClick={()=>{console.log(data)}}>Horas</button>
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
  const url = `http://worldtimeapi.org/api/timezone/${continent}/${area}`
  const response =await axios.get(url)
  const responseData= response.data;
  arrayOfData = [...arrayOfData, responseData]
  } 
return { props: { data: arrayOfData} };
}

