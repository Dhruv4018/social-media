import React, { useEffect, useRef, useState } from 'react'
import { FiVolume2, FiVolumeX } from 'react-icons/fi';
const VideoPlayer = ({ media }) => {
  const videotag = useRef();
  const [muted, setMuted] = useState(false);
  const [isplaying, setIsplaying] = useState(true);

  const handleClick = () => {
    if (isplaying) {
      videotag.current.pause();
      setIsplaying(false)
    } else {
      videotag.current.play();
      setIsplaying(true)
    }
    
  };

   useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
     
          const video =  videotag.current
          if (!video) return
  
          if (entry.isIntersecting) {
            video.play()
            setIsplaying(true)
          } else {
            video.pause()
            setIsplaying(false)
          }
        },
        { threshold: 0.6 }
      )
  
      if ( videotag.current) observer.observe( videotag.current)
  
      return () => {
        if ( videotag.current) observer.unobserve( videotag.current)
      }
    }, [])

  return (
    <div className="w-full max-h-[320px] relative rounded-2xl overflow-hidden bg-black">
      
      <video
        ref={videotag}
        src={media}
        autoPlay
        loop
        muted={muted}
        onClick={handleClick}
        className="w-full max-h-[320px] object-cover cursor-pointer"
      />

      <button
        onClick={(e) => {
          e.stopPropagation(); 
          setMuted(prev => !prev);
        }}
        className="absolute bottom-3 right-3 bg-black/60 p-2 rounded-full"
      >
        {!muted ? (
          <FiVolume2 className="w-5 h-5 text-white cursor-pointer" />
        ) : (
          <FiVolumeX className="w-5 h-5 text-white cursor-pointer" />
        )}
      </button>

    </div>
  );
};

export default VideoPlayer