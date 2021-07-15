import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import BioEditor from "./BioEditor";

test("When no bio is passed to it, an Add button is rendered", () => {
    const { container } = render(<BioEditor />);
    expect(container.querySelector("button")).toBeTruthy();
    expect(container.querySelector("button").innerHTML).toBe(
        '<i class="material-icons">post_add</i>Add Bio'
    );
});

test("When a bio is passed to it, an Edit button is rendered.", () => {
    const { container } = render(<BioEditor bio={"this is a bio"} />);
    expect(container.querySelector("button")).toBeTruthy();
    expect(container.querySelector("button").innerHTML).toBe(
        '<i class="material-icons">edit</i>Edit Bio'
    );
});

test("Clicking either the add or edit button causes a textarea and a save button to be rendered.", () => {
    let { container } = render(<BioEditor bio={"this is a bio"} />);
    fireEvent.click(container.querySelector("button"));
    expect(container.querySelector("textarea")).toBeTruthy();
    expect(container.querySelector("button")).toBeTruthy();
    expect(container.querySelector("button").innerHTML).toBe(
        '<i class="material-icons">task_alt</i>Save'
    );

    container = render(<BioEditor />).container;
    fireEvent.click(container.querySelector("button"));
    expect(container.querySelector("textarea")).toBeTruthy();
    expect(container.querySelector("button")).toBeTruthy();
    expect(container.querySelector("button").innerHTML).toBe(
        '<i class="material-icons">task_alt</i>Save'
    );
});

import axios from "../axios";
jest.mock("axios");

const onBioChange = jest.fn(
    axios.post.mockResolvedValue({
        bio: "This is my bio",
    })
);

test("Clicking the save button causes an ajax request. The request should not actually happen during your test. To prevent it from actually happening, you should mock axios.", async () => {
    let { container } = render(
        <BioEditor bio={"hey, this is my bio."} onBioChange={onBioChange} />
    );
    fireEvent.click(container.querySelector("button"));

    expect(container.querySelector("textarea")).toBeTruthy();
    expect(container.querySelector("#saveButton")).toBeTruthy();
    fireEvent.click(container.querySelector("#saveButton"));
    axios.put.mockResolvedValue({
        id: 2,
        first_name: "Sam",
        last_name: "Soup",
        email: "Schrisse@gmail.com",
        profile_url:
            "https://profilepixbucket.s3.eu-central-1.amazonaws.com/5Og68CDPvsKnnhTzNwk9UPer0kdAAsL4.jpeg",
        bio: "MY New Bio!",
        password_hash:
            "$2a$10$l3mY0/WiqKXj55YUYs4Lte9wdsa6CFdU7PXUbBMs6x5OoUIfuDOv.",
    });
    await waitFor(() => expect(container.querySelector("p")).toBeTruthy());
    expect(container.querySelector("p").innerHTML).toBe("hey, this is my bio.");
});
