import WatchComponent from '../components/WatchComponent';

function Tv() {
    return (
        <div class="list-page">
            <div className="section-header">
                <img src="https://www.davishighnews.com/wp-content/uploads/2018/10/tv-shows.jpg"  alt=""/>
                <h2>TV Shows</h2>
            </div>
            <div className="list-container-wrapper">
                <WatchComponent type='tv'/>
            </div>
        </div>
    );
}

export default Tv;
