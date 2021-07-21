import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ButtonLoad } from '.';

describe('<Button />', () => {
  it('should render one text "Load More" on button', () => {
    const fn = jest.fn();
    render(<ButtonLoad text="Load More" onClick={fn} />);

    expect(screen.getByRole('button', { name: /load more/i })).toBeInTheDocument();
  });

  it('should call a function when clicked', () => {
    const fn = jest.fn();
    render(<ButtonLoad text="Load More" onClick={fn} />);

    userEvent.click(screen.getByRole('button'));

    expect(fn).toHaveBeenCalled();
  });

  it('should be disabled when disabled equal true', () => {
    const fn = jest.fn();
    render(<ButtonLoad text="Load More" disabled={true} onClick={fn} />);

    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should be enable when disabled equal false', () => {
    const fn = jest.fn();
    render(<ButtonLoad text="Load More" disabled={false} onClick={fn} />);

    expect(screen.getByRole('button')).toBeEnabled();
  });

  it('should match with snapshot', () => {
    const fn = jest.fn();
    const { container } = render(<ButtonLoad text="load more" disabled={false} onClick={fn} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
