import Cards from '../components/Cards'
export default function Home(horas) {
  const arrayOfCitys = [
    {Pais:'Argentina',
    Ciudad:'Buenos-Aires'},
    {Pais:'France',
    Ciudad:'Paris'},
    {Pais:'Spain',
    Ciudad:'Madrid'}
  ]
  const getHoras = ()=>{
    console.log(horas)
    console.log(horas.horas.datetime)
  }
  return (
    <>
      <div className='flex flex-row flex-wrap gap-96'>
        {
        arrayOfCitys.map((country) => 
        <div>
          <Cards timezone={horas.horas.timezone} datatime={horas.horas.datetime}/>
          <button style={{color:'white'}} onClick={getHoras}>Horas</button>
        </div>
         )}
    </div>
    </>
  )
}
export async function getStaticProps(){
  const response = await fetch ('http://worldtimeapi.org/api/timezone/America/Argentina/Salta')
  const horas= await response.json();

  return {props: {horas}}
}