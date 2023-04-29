import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle, faSearch} from "@fortawesome/free-solid-svg-icons";
import {Typeahead} from "react-bootstrap-typeahead";
import {useDispatch} from "react-redux";
import {getDomainUserThunk} from "../features/UsersSlice";
import {getActivitiesThunk} from "../features/ActivitiesSlice";
import {InputGroup} from "react-bootstrap";
import './SearchBox.css'
import 'bootstrap/dist/css/bootstrap.min.css';

export function SearchBox({placeholder}) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const dispatch = useDispatch();

    const handleInputChange = (query) => {
        setQuery(query);
        fetch(`/open-api/users?query=${query}`)
            .then((response) => response.json())
            .then((data) => {
                setResults(data);
            })
            .catch((error) => {
                setResults([]);
            });
    };

    const handleFollow = (userUrl) => {
        const followData = {userUrl};
        fetch("/api/users/follow", {
            method: "POST",
            body: JSON.stringify(followData),
            headers: {
                "Content-Type": "application/json",
            },
        }).then(() => {
            setQuery("");
            setResults([]);
            dispatch(getDomainUserThunk());
            dispatch(getActivitiesThunk());
        });
    };

    return (
        <InputGroup className="mb-3">
            <Typeahead
                id="searchBox"
                placeholder={placeholder}
                options={results}
                labelKey="name"
                value={query}
                minLength={2}
                onChange={setQuery}
                onInputChange={handleInputChange}
                renderMenuItemChildren={(option) => (
                    <div className="d-flex justify-content-between align-items-center">
                        <span>{option.name}</span>
                        <FontAwesomeIcon
                            icon={faPlusCircle}
                            className="text-primary"
                            onClick={() => {
                                handleFollow(option.id);
                            }}
                        />
                    </div>
                )}
            />
            <InputGroup.Text id="basic-addon1">
                <FontAwesomeIcon
                    icon={faSearch}
                    className="text-primary"
                />
            </InputGroup.Text>
        </InputGroup>

    );
}
