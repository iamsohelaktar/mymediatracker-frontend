import WatchComponent from '../components/WatchComponent';

function Tv() {
    return (
        <div id="tv">
            <div className="section-header">
                <img src="https://www.davishighnews.com/wp-content/uploads/2018/10/tv-shows.jpg"  alt=""/>
                <h2>TV Shows</h2>
            </div>
            <WatchComponent type='tv'/>
        </div>
    );
}

export default Tv;
