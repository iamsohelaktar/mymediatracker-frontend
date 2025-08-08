import WatchComponent from '../components/WatchComponent';

function Anime() {
    return (
        <div id="anime">
            <div className="section-header">
                <img src="https://dms.mydukaan.io/original/webp/media/2d463869-39a1-434e-bfe5-0d0fde49bd7a.jpeg" alt=""/>
                <h2>Anime</h2>
            </div>
            <WatchComponent type='anime'/>
        </div>
    );
}

export default Anime;
