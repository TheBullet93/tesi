import { useState, useRef } from "react";
import {FaPauseCircle, FaPlayCircle } from "react-icons/fa";


export default function ButtonAudio(props) {

    const [playing, setPlaying] = useState(false);

  //let audio = new Audio(props.audio);
  const audioRef = useRef(new Audio(props.audio));

  const play = () => {
    setPlaying(true);
    audioRef.current.play();
  };

  const pause = () => {
    setPlaying(false);
    audioRef.current.pause();
  };

  return (
    <button className='statistiche' onClick={playing ? pause : play}>
       {playing ? <FaPauseCircle /> : <FaPlayCircle />}
    </button>
  );
}