import WatchComponent from '../components/WatchComponent';

function Movie() {
    return (
        <div class="list-page">
            <div className="section-header">
                <img src="https://tritonvoice.co/wp-content/uploads/2019/03/GKKFYsUV3HipHYUtKTrUPeiz.png"  alt=""/>
                <h2>Movies</h2>
            </div>
            <div className="list-container-wrapper">
                <WatchComponent type='movie'/>
            </div>
        </div>
    );
}

export default Movie;
