import React, { useState } from "react";
import { Form, InputGroup, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import {useDispatch} from "react-redux";
import {getDomainUserThunk} from "../features/UsersSlice";
import {getActivitiesThunk} from "../features/ActivitiesSlice";

export function SearchBox({ placeholder, ariaLabel }) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    const dispatch = useDispatch();

    const handleInputChange = (event) => {
        const query = event.target.value;
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
        const followData = { "userUrl": userUrl };
        console.log(userUrl)
        fetch("/api/users/follow", {
            method: "POST",
            body: JSON.stringify(followData),
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(() => {
                setQuery('')
                setResults([])
                dispatch(getDomainUserThunk())
                dispatch(getActivitiesThunk())

            })

    };

    return (
        <Form className="d-none d-sm-block d-flex">
            <InputGroup>
                <Form.Control
                    type="search"
                    placeholder={placeholder}
                    className="mr-2"
                    aria-label={ariaLabel}
                    value={query}
                    onChange={handleInputChange}
                />
                <InputGroup.Text id="btnGroupAddon">
                    <FontAwesomeIcon icon={faSearch} />
                </InputGroup.Text>
                {results.length > 0 && (
                    <ListGroup className="position-absolute" style={{ width: "100%", marginTop: "38px" }}>
                        {results.map((result, index) => (
                            <ListGroup.Item key={index}>
                                <div className="d-flex justify-content-between align-items-center">
                                    <span>{result.name}</span>
                                    <FontAwesomeIcon
                                        icon={faPlusCircle}
                                        className="text-primary"
                                        onClick={() => handleFollow(result.id)}
                                    />
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </InputGroup>
        </Form>
    );
}
