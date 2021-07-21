import P from 'prop-types';

import { PostCard } from '../PostCard';
import styled from 'styled-components';

export const Posts = ({ posts }) => (
  <Div className="posts">
    {posts.map((post) => (
      <PostCard key={post.id} title={post.title} body={post.body} id={post.id} cover={post.cover} />
    ))}
  </Div>
);

const Div = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
`;

Posts.defaultProps = {
  posts: [],
};

Posts.propTypes = {
  posts: P.array,
};
