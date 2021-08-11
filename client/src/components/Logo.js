//static img url
const LOGO_URL = "../img/logo.svg";
const LOGO_URL_SMALL = "../img/logo_small.svg";

export default function Logo() {
    return (
        <picture className="logo">
            <source media="(min-width: 768px)" srcSet={LOGO_URL} />
            <source media="(min-width: 480px)" srcSet={LOGO_URL_SMALL} />
            <img className="logo" src="" alt="" />
        </picture>
    );
}
