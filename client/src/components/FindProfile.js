//components
import ProfilePic from "./ProfilePic";
import { Link } from "react-router-dom";
import FriendButton from "./FriendButton";

//hooks
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

//redux
import {
    receiveUserSearchResults,
    toggleIsSearching,
} from "../redux/action-creator";

export default function FindProfile() {
    const dispatch = useDispatch();
    const mostRecentUsers = useSelector((state) => state.mostRecentUsers);
    const userSearchResults = useSelector((state) => state.userSearchResults);
    const isSearching = useSelector((state) => state.isSearching);

    const [searchquery, setSearchquery] = useState("");

    useEffect(async () => {
        if (searchquery.length < 3) {
            dispatch(toggleIsSearching(false));
            return;
        }
        await dispatch(receiveUserSearchResults(searchquery));
        dispatch(toggleIsSearching(true));
    }, [searchquery]);

    const renderLatestUsers = () => {
        if (mostRecentUsers) {
            return mostRecentUsers.map((user) => {
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
                                <h1>
                                    {user.first_name + " " + user.last_name}
                                </h1>
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
        }
    };

    const renderResults = () => {
        return userSearchResults.map((user) => {
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
                        placeholder="Find other Potatoes"
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
                {isSearching && userSearchResults.length > 0 && (
                    <>
                        <p>search results for {searchquery}</p>
                        <ul>{renderResults()}</ul>
                    </>
                )}
                {isSearching && userSearchResults.length === 0 && (
                    <p>No taters found!</p>
                )}
                {!isSearching && (
                    <>
                        <p>most recently joined taters</p>
                        <ul>{renderLatestUsers()}</ul>
                    </>
                )}
            </section>
        </>
    );
}
