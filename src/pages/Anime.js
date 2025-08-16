import WatchComponent from '../components/WatchComponent';
import {useEffect, useState} from 'react';

function Anime() {
    const [ banner, setBanner ] = useState();

    useEffect(() => {
        setBanner('https://i.redd.it/5n8hs34ztzk61.png');
    }, []);

    return (
        <div class="list-page">
            <div className="section-header">
                <img src={banner} alt=""/>
                <h2>Anime</h2>
            </div>
            <div className="list-container-wrapper">
                <WatchComponent type='anime'/>
            </div>
        </div>
    );
}

export default Anime;
