import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
    receivePhotoGallery,
    setNewProfilePhoto,
    toggleUploaderVisible,
} from "../actions";

export default function PhotoGallery(props) {
    const dispatch = useDispatch();
    const photos = useSelector((state) => state.photoGallery);

    const setProfilePhoto = (photo_url) => {
        dispatch(setNewProfilePhoto(photo_url));
        dispatch(toggleUploaderVisible(false));
    };

    useEffect(() => {
        console.log("...(PhotoGallery EFFECT [photos]) photos: ", photos);
    }, [photos]);

    useEffect(() => {
        dispatch(receivePhotoGallery(props.id));
        console.log("...(PhotoGallery EFFECT []) photos: ", photos);
    }, []);

    const rendergallery = (photos) => {
        return photos.map((photo) => {
            return (
                <div className="galleryPhotoFrame" key={photo.id}>
                    <img
                        src={photo.photo_url}
                        alt={photo.photo_description}
                        onClick={() => setProfilePhoto(photo.photo_url)}
                    />
                </div>
            );
        });
    };

    return (
        <div className="galleryWrapper">
            {photos.length > 0 && rendergallery(photos)}
        </div>
    );
}
