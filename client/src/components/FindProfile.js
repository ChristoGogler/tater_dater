import axios from "../axios";
import { useState, useEffect } from "react";
import ProfilePic from "./ProfilePic";

export default function FindProfile() {
    const [isSearching, setIsSearching] = useState(false);
    const [results, setResults] = useState([]);
    const [latestUsers, setLatestUsers] = useState([]);
    const [searchquery, setSearchquery] = useState("");

    useEffect(async () => {
        console.log("...(FindProfile) searchquery: ", searchquery);
        if (!searchquery) {
            setIsSearching(false);
            return;
        }
        setIsSearching(true);
        const users = await axios.get("/api/users/find?q=" + { searchquery });
        console.log("...(FindProfile: search) result: ", users);
    });

    //Maybe not needed!
    const onSearchButtonClick = () => {};

    return (
        <>
            <section className="searchProfile">
                <label className="searchBox" forhtml="searchuser">
                    <input
                        name="searchuser"
                        type="text"
                        placeholder="Find your Friends"
                        onChange={(event) => setSearchquery(event.target.value)}
                        defaultValue={searchquery}
                    />
                    <button type="submit" onClick={onSearchButtonClick}>
                        <i className="material-icons">person_search</i>Search
                    </button>
                </label>
            </section>
            <section className="searchResults">
                <p>23 results for "search query"</p>
                <ul>
                    <li>
                        <ProfilePic className="avatar" />
                        <div className="searchResultDetails">
                            <h1>Name Name</h1>
                            <p>Bio of that person!</p>
                        </div>
                        <button type="submit" onClick={onSearchButtonClick}>
                            <i className="material-icons">person_add</i>
                            Befriend
                        </button>
                    </li>
                </ul>
            </section>
            <section className="searchResults latestUsers">
                <p>3 latest Potatoes</p>
                <ul>
                    <li>
                        <ProfilePic className="avatar " />
                        <div className="searchResultDetails">
                            <h1>Name Name</h1>
                            <p>Bio of that person!</p>
                        </div>
                        <button type="submit" onClick={onSearchButtonClick}>
                            <i className="material-icons">person_add</i>
                            Befriend
                        </button>
                    </li>
                </ul>
            </section>
        </>
    );
}
