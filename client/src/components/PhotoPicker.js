import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
    receivePhotoGallery,
    setNewProfilePhoto,
    toggleUploaderVisible,
    setPhotoPicker,
} from "../actions";

export default function PhotoGallery(props) {
    const dispatch = useDispatch();
    const photos = useSelector((state) => state.photoGallery);
    const { start, end, hidePrev, hideNext } = useSelector(
        (state) => state.photoPicker
    );

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
        return photos.slice(start, end).map((photo) => {
            return (
                <div className="photoPickerFrame" key={photo.id}>
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
        <div className="photoPickerWrapper">
            <div>
                {!hidePrev && (
                    <button
                        className="photoPickerControls"
                        onClick={() =>
                            dispatch(
                                setPhotoPicker(start, end, false, photos.length)
                            )
                        }
                    >
                        <i className="material-icons">arrow_left</i>
                    </button>
                )}
            </div>
            {photos.length > 0 && rendergallery(photos)}
            <div>
                {!hideNext && photos.length >= end && (
                    <button
                        className="photoPickerControls"
                        onClick={() =>
                            dispatch(
                                setPhotoPicker(start, end, true, photos.length)
                            )
                        }
                    >
                        <i className="material-icons">arrow_right</i>
                    </button>
                )}
            </div>
        </div>
    );
}
