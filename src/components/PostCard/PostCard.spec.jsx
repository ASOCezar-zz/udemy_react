import { render, screen } from '@testing-library/react';
import { PostCard } from '.';

const mockPostCard = {
  title: 'Title1',
  body: 'Body1',
  id: 1,
  cover: 'img/img.png',
};

describe('<PostCard />', () => {
  it('should render PostCard correctly', () => {
    render(<PostCard {...mockPostCard} />);

    expect(screen.getByRole('img', { name: mockPostCard.title })).toHaveAttribute('src', mockPostCard.cover);

    expect(screen.getByRole('heading', { name: 'Title1 1' })).toBeInTheDocument();
    expect(screen.getByText(mockPostCard.body)).toBeInTheDocument();
  });

  it('should match with snapshot', () => {
    const { container } = render(<PostCard {...mockPostCard} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
