import React from 'react';
import {render, screen, fireEvent, act} from '@testing-library/react';
import App from '../../App';

it("renders App component correctly", () => {
  const { getByText } = render(<App />);
  expect(getByText(/Welcome to/i)).toBeInTheDocument();
});

it("create new event button is present on the page", () => {
  const { getByRole } = render(<App />);
  expect(getByRole('button', {name: /Start/i})).toBeInTheDocument();
});

test('calls onClick prop when clicked', () => {
  const Button = ({onClick, children}) => (
    <button onClick={onClick}>{children}</button>
  );
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Start</Button>);
  fireEvent.click(screen.getByText(/Start/i));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
