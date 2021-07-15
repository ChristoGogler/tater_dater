import { useState, useEffect } from "react";

export default function FindProfile() {
    const [first_name, setFirstname] = useState("");
    const [last_name, setLastname] = useState("");
    const [profile_url, setProfileUrl] = useState("");
    const [id, setId] = useState(null);
    const [bio, setBio] = useState("");

    const onSearchButtonClick = () => {};

    return (
        <div>
            <h1>FindProfile</h1>
            <section className="searchProfile">
                <label className="searchBox" forhtml="searchuser">
                    <input
                        name="searchuser"
                        type="text"
                        placeholder="Find your Friends"
                    />
                    <button type="submit" onClick={onSearchButtonClick}>
                        <i className="material-icons">person_search</i>Search
                    </button>
                </label>
            </section>
            <section className="seachResults">b</section>
            <section className="latestUsers">c</section>
        </div>
    );
}
