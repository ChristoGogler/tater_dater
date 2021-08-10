import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    getMostRecentUsers,
    getUserSearchResults,
    toggleIsSearching,
} from "../redux/action-creator";

import ProfilePic from "./ProfilePic";
import { Link } from "react-router-dom";
import FriendButton from "./FriendButton";

export default function FindProfile() {
    const mostRecentUsers = useSelector((state) => {
        console.log("mostRecentUsers", state.mostRecentUsers);
        state.mostRecentUsers;
    });

    const userSearchResults = useSelector((state) => {
        state.userSearchResults;
    });
    let newArray;
    if (mostRecentUsers) {
        newArray = [...mostRecentUsers];
    }
    const isSearching = useSelector((state) => {
        state.isSearching;
    });

    const [searchquery, setSearchquery] = useState("");

    // onSearchfieldInputChange
    useEffect(async () => {
        if (searchquery.length < 3) {
            dispatch(toggleIsSearching(false));
            return;
        }
        await dispatch(getUserSearchResults(searchquery));
        dispatch(toggleIsSearching(true));
    }, [searchquery]);

    const renderLatestUsers = () => {
        console.log("mostrecentusers: ", mostRecentUsers);
        return newArray.map((user) => {
            console.log(user);
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

    // const renderResults = () => {
    //     return userSearchResults.map((user) => {
    //         return (
    //             <li key={user.id}>
    //                 <Link to={"/user/" + user.id}>
    //                     <ProfilePic
    //                         className="avatar"
    //                         profile_url={user.profile_url}
    //                     />
    //                 </Link>
    //                 <div className="searchResultDetails">
    //                     <Link to={"/user/" + user.id}>
    //                         <h1>{user.first_name + " " + user.last_name}</h1>
    //                     </Link>
    //                     <p>{user.bio}</p>
    //                 </div>
    //                 <FriendButton
    //                     smallButton="smallBtn"
    //                     otherUser_id={user.id}
    //                     on
    //                 ></FriendButton>
    //             </li>
    //         );
    //     });
    // };
    const dispatch = useDispatch();
    dispatch(getMostRecentUsers());
    // useEffect(() => {
    //     console.log("ddd");
    //     dispatch(getMostRecentUsers());
    // }, [dispatch]);

    return (
        <div>
            <p>loading</p>
            {mostRecentUsers && (
                <>
                    <section className="searchProfile">
                        <label className="searchBox" forhtml="searchuser">
                            <input
                                name="searchuser"
                                type="text"
                                placeholder="Find other Potatoes"
                                onChange={(event) =>
                                    setSearchquery(event.target.value)
                                }
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
                        {isSearching && noResults && <p>No taters found!</p>}

                        <>
                            <p>most recently joined taters</p>
                            <ul>{renderLatestUsers()}</ul>
                        </>
                    </section>
                </>
            )}
        </div>
    );
}
