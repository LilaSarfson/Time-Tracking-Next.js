import Image from 'next/image';
import playPic from '../public/wall-clock.png'

export default function Card (props){
    return(
        <>
        <div style={{backgroundColor: 'white'}} className='w-4/4 justify-items-center p-3 border-solid border-black rounded relative '>
            <Image 
            objectFit="cover"
            src={playPic}
            alt='aun n se'
            width={100}
            height={100}
            />
            <div style={{backgroundColor: 'hsl(145, 58%, 55%)'}} className='w-4/4 h-full text-white p-4 rounded text-center'>
                <h2 className='font-bold text-lg'>{props.timezone}</h2>
                <p className='break-words'>{props.datatime}</p>
            </div>
        </div>
        </>
    )
}

    