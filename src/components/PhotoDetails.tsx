import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { photoObject } from '../dataTypes/types/photoGallery';
import style2 from '../css/style2.module.css';

// ___________________________________________________________

const PhotoDetails = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [photo, setPhoto] = useState<photoObject | null>(null);
    const [error, setError] = useState<null | string>(null);

    useEffect(() => {
        axios.get(`http://localhost:3060/photos`)
            .then(response => setPhoto(response.data.find((p: photoObject) => p.id == Number(params.id))))
            .catch(error => setError(error))

    }, [])

    const getWidthAndHeight = (): [number, number] => {
        const width = photo?.width.split('px')[0];
        const height = photo?.height.split('px')[0];

        return [Number(width), Number(height)]
    };

    // -----------------------------------------------------------
    if (error) {
        return <h2 className='error-message'>سرور با خطا مواجه شد</h2>
    }

    const [width, height] = getWidthAndHeight();
    return (
        <>
            {height > width ? (
                <div className={style2['photo-container']}>
                    <img src={photo?.url} alt={photo?.artWork} />
                    <div className={style2['photo-details']}>
                        <h3>PHOTO DETAILS</h3>
                        <div>
                            <span>Art Work: </span><strong>{photo?.artWork}</strong>
                        </div>
                        <div>
                            <span>Photographer: </span><strong>{photo?.photographer}</strong>
                        </div>
                        <div>
                            <span>File Extension: </span><strong>{photo?.File_extension}</strong>
                        </div>
                        <div>
                            <span>Size: </span><strong>{photo?.size}</strong>
                        </div>
                        <div>
                            <span>Width: </span><strong>{photo?.width}</strong>
                        </div>
                        <div>
                            <span>Height: </span><strong>{photo?.height}</strong>
                        </div>
                        <div>
                            <button type="button" className={style2['btn-return']} onClick={() => navigate(-1)}>Go Back</button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={style2['photo-harizental']}>
                    <img src={photo?.url} alt={photo?.artWork} />
                    <div className={style2['photo-details']}>
                        <h3>PHOTO DETAILS</h3>
                        <div>
                            <span>Art Work: </span><strong>{photo?.artWork}</strong>
                        </div>
                        <div>
                            <span>Photographer: </span><strong>{photo?.photographer}</strong>
                        </div>
                        <div>
                            <span>File Extension: </span><strong>{photo?.File_extension}</strong>
                        </div>
                        <div>
                            <span>Size: </span><strong>{photo?.size}</strong>
                        </div>
                        <div>
                            <span>Width: </span><strong>{photo?.width}</strong>
                        </div>
                        <div>
                            <span>Height: </span><strong>{photo?.height}</strong>
                        </div>
                        <div>
                            <button type="button" className={style2['btn-return']} onClick={() => navigate(-1)}>Go Back</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default PhotoDetails