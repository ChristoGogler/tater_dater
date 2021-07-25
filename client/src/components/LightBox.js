export default function LightBox({ user, toggleLightbox }) {
    return (
        <section className="backdrop" onClick={toggleLightbox}>
            <button className="closeButton">×</button>
            <div className="lightbox">
                <img
                    src={user.profile_url}
                    alt={user.first_name + " " + user.last_name}
                    onClick={(event) => event.stopPropagation()}
                ></img>
            </div>
        </section>
    );
}
