import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import Home from '.';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import userEvent from '@testing-library/user-event';

const handlers = [
  rest.get('*jsonplaceholder.typicode.com*', async (req, res, ctx) => {
    return res(
      ctx.json([
        {
          userId: 1,
          id: 1,
          title: 'title1',
          body: 'body1',
          url: 'img1.jpg',
        },
        {
          userId: 2,
          id: 2,
          title: 'title2',
          body: 'body2',
          url: 'img2.jpg',
        },
        {
          userId: 3,
          id: 3,
          title: 'title3',
          body: 'body3',
          url: 'img3.jpg',
        },
      ]),
    );
  }),
];

const server = setupServer(...handlers);

describe('<Home />', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());
  it('should render search input, posts and load more buttton', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText(/Não existem posts/i);

    await waitForElementToBeRemoved(noMorePosts);

    expect.assertions(3);

    const search = screen.getByPlaceholderText(/digite sua pesquisa/i);
    expect(search).toBeInTheDocument();

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);

    const button = screen.getByRole('button', { name: /ler mais posts/i });
    expect(button).toBeInTheDocument();
  });

  it('should search for posts', async () => {
    render(<Home />);

    const noMorePosts = screen.getByText(/não existem posts/i);

    await waitForElementToBeRemoved(noMorePosts);

    expect.assertions(9);

    const search = screen.getByPlaceholderText(/digite sua pesquisa/i);
    expect(screen.getByRole('heading', { name: 'title1 1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title2 2' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title3 3' })).not.toBeInTheDocument();

    userEvent.type(search, 'title3');
    expect(screen.queryByRole('heading', { name: 'title1 1' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title2 2' })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title3 3' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Search value: title3' })).toBeInTheDocument;

    userEvent.clear(search);
    expect(screen.getByRole('heading', { name: 'title1 1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title2 2' })).toBeInTheDocument();

    userEvent.type(search, 'ndajns');
    expect(screen.getByText(/não existem posts/i)).toBeInTheDocument();
  });

  it('should be able to load mores posts when button clicked', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText(/não existem posts/i);

    await waitForElementToBeRemoved(noMorePosts);

    expect.assertions(2);

    const button = screen.getByRole('button', { name: /ler mais posts/i });
    userEvent.click(button);
    expect(screen.getByRole('heading', { name: 'title3 3' })).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it('should match with snapshot', async () => {
    const { container } = render(<Home />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
