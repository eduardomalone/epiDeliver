import './styles.css';
import React from 'react';
import { useHistory } from 'react-router-dom';
import Home from '../Home';

const Player = () => {
    //var srcVideo = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
    var srcVideo = '/videoEPI.mp4'
    let history = useHistory();
    function handleClick() {
        setTimeout(() => {
            history.push(`/home`);
        }, 500);
        return <Home />;
    }
    return (
        <>
            {/* opcoes de variaveis */}
            {/* <div onClick={handleClick}>
                <ReactPlayer
                url={srcVideo}
                playing={true}
                loop={true}
                width='100%'
                height='100%'
                //controls
                />
            </div> */}
            <div onClick={handleClick}>
                <video src={srcVideo} loop autoPlay muted={true} width='100%' height='100%' >
                </video>
            </div>
        </>
    )
}

export default Player;