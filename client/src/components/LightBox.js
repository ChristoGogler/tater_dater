import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    setPhotoPicker,
    receivePhotoPickerGallery,
} from "../redux/action-creator";

export default function LightBox({ user, toggleLightbox, photos }) {
    const dispatch = useDispatch();
    const { start, end, hidePrev, hideNext, length, picturesPerPage } =
        useSelector((state) => state.photoPicker);
    // const photos = useSelector((state) => state.photoPickerGallery);

    useEffect(async () => {
        // await dispatch(receivePhotoPickerGallery(user.id));
        dispatch(setPhotoPicker(1, 2, false, photos.length, 1));
        console.log("LightBox: ", photos);
    }, []);

    const renderPhotos = (photos) => {
        console.log("renderPhotos start, end", start, end);
        return photos.slice(start, end).map((photo) => {
            return (
                <div className="" key={photo.id}>
                    <img
                        src={photo.photo_url}
                        alt={photo.photo_description}
                        onClick={(event) => event.stopPropagation()}
                    />
                </div>
            );
        });
    };

    return (
        <section className="backdrop" onClick={toggleLightbox}>
            <button className="closeButton">×</button>
            <div>
                <button
                    className={
                        !hidePrev
                            ? "photoPickerControls"
                            : "photoPickerControls hideButton"
                    }
                    onClick={(event) => {
                        event.stopPropagation();

                        dispatch(
                            setPhotoPicker(
                                start,
                                end,
                                false,
                                photos.length,
                                picturesPerPage
                            )
                        );
                    }}
                >
                    <i className="material-icons">arrow_left</i>
                </button>
            </div>

            <div className="lightbox">
                {photos.length > 0 && renderPhotos(photos)}
                {/* <img
                    src={user.profile_url}
                    alt={user.first_name + " " + user.last_name}
                    onClick={(event) => event.stopPropagation()}
                ></img> */}
            </div>
            <div>
                <button
                    className={
                        !hideNext
                            ? "photoPickerControls"
                            : "photoPickerControls hideButton"
                    }
                    onClick={(event) => {
                        event.stopPropagation();
                        dispatch(
                            setPhotoPicker(
                                start,
                                end,
                                true,
                                photos.length,
                                picturesPerPage
                            )
                        );
                    }}
                >
                    <i className="material-icons">arrow_right</i>
                </button>
            </div>
        </section>
    );
}
