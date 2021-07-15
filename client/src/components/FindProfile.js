import axios from "../axios";
import { useState, useEffect } from "react";
import ProfilePic from "./ProfilePic";
import { Link } from "react-router-dom";

export default function FindProfile() {
    const [isSearching, setIsSearching] = useState(false);
    const [noResults, setNoResults] = useState(false);
    const [results, setResults] = useState([1, 2, 3]);
    const [latestUsers, setLatestUsers] = useState([]);
    const [searchquery, setSearchquery] = useState("");

    //onSearchfieldInputChange
    useEffect(async () => {
        setNoResults(false);

        if (searchquery.length < 3) {
            setIsSearching(false);
            return;
        }
        setIsSearching(true);
        try {
            const { data } = await axios.get(
                `/api/users/find?q=${searchquery}`
            );
            setResults([...data]);
        } catch (error) {
            console.log(error);
            setResults([]);
            setNoResults(true);
        }
    }, [searchquery]);

    //on mount
    useEffect(async () => {
        try {
            const { data } = await axios.get("/api/users/latest");
            setLatestUsers([...data]);
        } catch (error) {
            console.log(error);
        }
    }, []);

    //Maybe not needed!
    const onSearchButtonClick = () => {};
    const renderLatestUsers = () => {
        return latestUsers.map((user) => {
            return (
                <li key={user.id}>
                    <ProfilePic
                        className="avatar"
                        profile_url={user.profile_url}
                    />
                    <div className="searchResultDetails">
                        <Link to={"/user/" + user.id}>
                            <h1>{user.first_name + " " + user.last_name}</h1>
                        </Link>
                        <p>{user.bio}</p>
                    </div>
                    <button type="submit" onClick={onSearchButtonClick}>
                        <i className="material-icons">person_add</i>
                    </button>
                </li>
            );
        });
    };

    const renderResults = () => {
        return results.map((user) => {
            return (
                <li key={user.id}>
                    <ProfilePic
                        className="avatar"
                        profile_url={user.profile_url}
                    />
                    <div className="searchResultDetails">
                        <Link to={"/user/" + user.id}>
                            <h1>{user.first_name + " " + user.last_name}</h1>
                        </Link>
                        <p>{user.bio}</p>
                    </div>
                    <button type="submit" onClick={onSearchButtonClick}>
                        <i className="material-icons">person_add</i>
                    </button>
                </li>
            );
        });
    };

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
                        <i className="material-icons">person_search</i>
                    </button>
                </label>
            </section>
            {isSearching && (
                <section className="searchResults">
                    <ul>{renderResults()}</ul>
                </section>
            )}
            {isSearching && noResults && <p>no results</p>}
            {!isSearching && (
                <section className="searchResults latestUsers">
                    <p>3 latest Potatoes</p>
                    <ul>{renderLatestUsers()}</ul>
                </section>
            )}
        </>
    );
}
