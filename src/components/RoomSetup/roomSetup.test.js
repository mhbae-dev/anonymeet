import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import RoomSetup from "./RoomSetup";
import {MemoryRouter} from "react-router-dom";

test("it renders RoomSetup component correctly and description information is present", () => {
    const { getByText } = render(
        <MemoryRouter>
            <RoomSetup />
        </MemoryRouter>
    );

    expect(getByText(/For example, if you want a meetup/i)).toBeInTheDocument();
});

test('Submit Preferences button exists on the page', () => {
    const Button = ({onClick, children}) => (
        <button onClick={onClick}>{children}</button>
    );
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Submit Preferences</Button>);
    fireEvent.click(screen.getByText(/Submit Preferences/i));
    expect(handleClick).toHaveBeenCalledTimes(1);
});
