import useLoadMedia from '../hooks/useLoadMedia';
import { toast } from 'react-toastify';

const WatchComponent = ({type}) => {
    const {mediaList, handleRemove, handleChange} = useLoadMedia(type);

    const toastChange = async (property, newValue, media) => {
        const msg = await handleChange(property, newValue, media);
        if (msg) toast.success(msg); 
    };

    const toastRemove = async (media) => {
        const msg = await handleRemove(media);
        if (msg) toast.success(msg); 
    }

    return (
            <div className="list-container">
            {mediaList.length === 0 && <p>Your media is either loading or there's nothing added yet...</p>}
            {mediaList && mediaList.map((media, i) => {
                const savedRating  = media?.rating || '';
                const savedStatus = media?.status || 'to-do';
                const savedProgress = media?.progress || '';
            
                return (
                    <div className="search-result" key={media._id}>
                        <img className="cover" loading="lazy" src={media.image_url} alt={media.name}/>
                        <div className="info">
                            <div className="title" title={media.name + " | Added " + media?.createdAt.slice(0,10)}><p>{media.name}</p></div>
                            <div className="more-info">
                                <form className="rating">
                                    <input 
                                    onChange={(e) => toastChange('rating', e.target.value, media)} type="radio" name="rating" 
                                    id={'star5_'+media.name+media.type} 
                                    value="5"
                                    checked={savedRating==='5'}
                                    />
                                    <label htmlFor={'star5_'+media.name+media.type} className="fa fa-star" ></label>

                                    <input 
                                    onChange={(e) => toastChange('rating', e.target.value, media)} type="radio" name="rating" 
                                    id={'star4_'+media.name+media.type} 
                                    value="4"
                                    checked={savedRating==='4'}
                                    />
                                    <label htmlFor={'star4_'+media.name+media.type} className="fa fa-star"></label>

                                    <input 
                                    onChange={(e) => toastChange('rating', e.target.value, media)} type="radio" name="rating" 
                                    id={'star3_'+media.name+media.type} 
                                    value="3" 
                                    checked={savedRating==='3'}
                                    />
                                    <label htmlFor={'star3_'+media.name+media.type} className="fa fa-star"></label>

                                    <input 
                                    onChange={(e) => toastChange('rating', e.target.value, media)} type="radio" name="rating" 
                                    id={'star2_'+media.name+media.type} 
                                    value="2"
                                    checked={savedRating==='2'} 
                                    />
                                    <label htmlFor={'star2_'+media.name+media.type} className="fa fa-star"></label>

                                    <input 
                                    onChange={(e) => toastChange('rating', e.target.value, media)} type="radio" name="rating" 
                                    id={'star1_'+media.name+media.type} 
                                    value="1"
                                    checked={savedRating==='1'}
                                    />
                                    <label htmlFor={'star1_'+media.name+media.type} className="fa fa-star"></label>
                                </form>
                                {['anime', 'book', 'manga', 'tv'].includes(type) && ['doing', 'on-hold'].includes(media.status) && <div className="episodes"><p>Progress: </p> <input type="number" onBlur={(e) => toastChange('progress', e.target.value, media)} defaultValue={savedProgress}/> </div>}
                                { ['anime','movie', 'tv'].includes(type) 
                                    ?
                                    <select name="status" className="status" defaultValue={savedStatus} onChange={(e) => toastChange('status', e.target.value, media)}>
                                        <option value="to-do">👁 Plan to Watch</option>
                                        <option value="doing">▶ Watching</option>
                                        <option value="done">✔ Watched</option>
                                        <option value="on-hold">❚❚ On Hold</option>
                                    </select>  
                                    : 
                                    <select name="status" className="status" defaultValue={savedStatus} onChange={(e) => toastChange('status', e.target.value, media)}>
                                        <option value="to-do">👁 Plan to Read</option>
                                        <option value="doing">▶ Reading</option>
                                        <option value="done">✔ Read</option>
                                        <option value="on-hold">❚❚ On Hold</option>
                                    </select>  
                                }
                            </div>
                            <button onClick={ () => toastRemove(media)}>Remove from List</button>
                        </div>
                    </div>
                );
            })}
            </div>
    );
}
 
export default WatchComponent;