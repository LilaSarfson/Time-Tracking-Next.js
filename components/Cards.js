import Image from 'next/image';
import playPic from '../public/icon-play.svg'

export default function Card (props){
    return(
        <>
        <div style={{backgroundColor: 'hsl(195, 74%, 62%)'}} className=' absolute w-1/4'>
            <Image 
            src={playPic}
            alt='aun n se'
            width={100}
            height={100}
            />
            <div style={{backgroundColor: 'hsl(264, 64%, 52%)'}} className='relative bottom-10'>
                <h2>{props.timezone}</h2>
                <p>{props.datatime}</p>
                <p>Otras regiones</p>
            </div>
        </div>
        </>
    )
}

    