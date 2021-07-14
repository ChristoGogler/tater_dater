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
import axios from "axios";
jest.mock("axios");

test("Clicking the save button causes an ajax request. The request should not actually happen during your test. To prevent it from actually happening, you should mock axios.", async () => {
    const { container } = render(<BioEditor bio={"this is a bio"} />);
    fireEvent.click(container.querySelector("button"));

    expect(container.querySelector("textarea")).toBeTruthy();
    expect(container.querySelector("#saveButton")).toBeTruthy();
    fireEvent.click(container.querySelector("#saveButton"));
    // axios.get.mockResolvedValue({
    //     bio: "This is my bio",
    // });
    await waitFor(() => expect(container.querySelector("p")).toBeTruthy());
    expect(container.querySelector("p").innerHTML).toBe("This is my bio");
});
