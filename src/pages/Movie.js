import WatchComponent from '../components/WatchComponent';

function Movie() {
    return (
        <div id="movie">
            <div className="section-header">
                <img src="https://tritonvoice.co/wp-content/uploads/2019/03/GKKFYsUV3HipHYUtKTrUPeiz.png"  alt=""/>
                <h2>Movies</h2>
            </div>
            <WatchComponent type='movie'/>
        </div>
    );
}

export default Movie;
