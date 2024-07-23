import React, { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import { fetchPhotos, ActionPhoto } from '../dataTypes/types/photoGallery';
import style2 from '../css/style2.module.css';
import { Link, Outlet } from 'react-router-dom';
// ___________________________________________________________

const PhotoGallery = () => {
    const reducer = (state: fetchPhotos, action: ActionPhoto): fetchPhotos => {
        switch (action.type) {
            case "success":
                return { photos_list: action.payload, temp_list: action.payload, errorMessage: null }

            case "field":
                return { photos_list: [], temp_list: [], errorMessage: action.payload }

            case "search":
                return { ...state, photos_list: action.payload, errorMessage: null }

            default:
                return state;
        }
    }

    const initalState: fetchPhotos = {
        photos_list: [],
        temp_list: [],
        errorMessage: null
    };

    const [data, dispatch] = useReducer(reducer, initalState)
    const [searchTitle, setSearchTitle] = useState<string>('')

    useEffect(() => {
        axios.get("http://localhost:3060/photos")
            .then(response => dispatch({ type: "success", payload: response.data }))
            .catch(error => dispatch({ type: "field", payload: error }));


    }, []);


    const searchTitlePhotoHnadler = (e: any) => {
        const value = e.target.value;
        setSearchTitle(value);

        if (value.length > 2) {
            dispatch({ type: "search", payload: data.temp_list.filter(photo => photo.artWork.includes(value)) })
        } else if (value.length < 3) {
            dispatch({ type: "search", payload: data.temp_list })
        }

    }

    // -----------------------------------------------------------

    if (data.errorMessage) {
        return <h2 className='error-message'>سرور با خطا مواجه شد</h2>
    }

    return (
        <div>
            <div className={style2['search-box']}>
                <input type="text" name='q' id='q' placeholder='search Title Photo ...' value={searchTitle} onChange={searchTitlePhotoHnadler} />
            </div>
            <div className={style2['gallery-container']}>
                {data.photos_list.map((photo) => (
                    <Link key={photo.id} to={"photo/" + String(photo.id)}>
                        <img key={photo.id} src={photo.url} alt="" className={style2['photo-gallery']} />
                    </Link>

                ))}
            </div>


        </div>
    )
}

export default PhotoGallery