import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextInput } from '.';

describe('<TextInput />', () => {
  it('should have a value of searchValue', () => {
    const fn = jest.fn();

    render(<TextInput handleChange={fn} searchValue={'teste'} />);

    const input = screen.getByPlaceholderText(/type your search/i);

    expect(input).toBeInTheDocument();

    expect(input.value).toBe('teste');
  });

  it('should call handleChange for each key pressed', () => {
    const fn = jest.fn();

    render(<TextInput handleChange={fn} searchValue="valor qualquer" />);

    const input = screen.getByPlaceholderText(/type your search/i);

    const value = 'o valor';

    userEvent.type(input, value);

    expect(input.value).toBe('valor qualquer');
    expect(fn).toHaveBeenCalledTimes(value.length);
  });

  it('should match with snapshot', () => {
    const fn = jest.fn();
    const { container } = render(<TextInput handleChange={fn} searchValue={'teste'} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
