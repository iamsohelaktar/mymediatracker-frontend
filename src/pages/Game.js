import WatchComponent from '../components/WatchComponent';
import {useEffect, useState} from 'react';

function Game() {
    const [ banner, setBanner ] = useState();

    useEffect(() => {
        setBanner('https://live.staticflickr.com/8372/8553676198_4d1f4ef2a3_b.jpg');
    }, []);

    return (
        <div class="list-page">
            <div className="section-header">
                <img src={banner} alt=""/>
                <h2>Video Games</h2>
            </div>
            <div className="list-container-wrapper">
                <WatchComponent type='game'/>
            </div>
        </div>
    );
}

export default Game;
