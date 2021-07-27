import axios from "../axios";
import { useState, useEffect } from "react";
import ProfilePic from "./ProfilePic";
import { Link } from "react-router-dom";
import FriendButton from "./FriendButton";

export default function FindProfile() {
    const [isSearching, setIsSearching] = useState(false);
    const [noResults, setNoResults] = useState(false);
    const [results, setResults] = useState([]);
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
            console.log("FindProfiles Error: ", error);
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

    const renderLatestUsers = () => {
        return latestUsers.map((user) => {
            return (
                <li key={user.id}>
                    <Link to={"/user/" + user.id}>
                        <ProfilePic
                            className="avatar"
                            profile_url={user.profile_url}
                        />
                    </Link>

                    <div className="searchResultDetails">
                        <Link to={"/user/" + user.id}>
                            <h1>{user.first_name + " " + user.last_name}</h1>
                        </Link>
                        <p>{user.bio}</p>
                    </div>
                    <FriendButton
                        smallButton="smallBtn"
                        otherUser_id={user.id}
                    ></FriendButton>
                </li>
            );
        });
    };

    const renderResults = () => {
        return results.map((user) => {
            return (
                <li key={user.id}>
                    <Link to={"/user/" + user.id}>
                        <ProfilePic
                            className="avatar"
                            profile_url={user.profile_url}
                        />
                    </Link>
                    <div className="searchResultDetails">
                        <Link to={"/user/" + user.id}>
                            <h1>{user.first_name + " " + user.last_name}</h1>
                        </Link>
                        <p>{user.bio}</p>
                    </div>
                    <FriendButton
                        smallButton="smallBtn"
                        otherUser_id={user.id}
                        on
                    ></FriendButton>
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
                        placeholder="Find other Taters"
                        onChange={(event) => setSearchquery(event.target.value)}
                        defaultValue={searchquery}
                        autoFocus
                    />
                    <button type="submit">
                        <i className="material-icons">person_search</i>
                    </button>
                </label>
            </section>
            <section className="searchResults">
                {isSearching && !noResults && (
                    <>
                        <p>search results for {searchquery}</p>
                        <ul>{renderResults()}</ul>
                    </>
                )}
                {isSearching && noResults && <p>No Taters found!</p>}
                {!isSearching && (
                    <>
                        <p>most recently joined Taters</p>
                        <ul>{renderLatestUsers()}</ul>
                    </>
                )}
            </section>
        </>
    );
}
