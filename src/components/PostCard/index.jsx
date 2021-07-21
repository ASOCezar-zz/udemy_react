import P from 'prop-types';
import styled from 'styled-components';

export const PostCard = ({ title, cover, body, id }) => {
  return (
    <Div className="post">
      <img src={cover} alt={title} />
      <div className="post-content">
        <h2>
          {title} {id}
        </h2>
        <hr />
        <span>{body}</span>
      </div>
    </Div>
  );
};

const Div = styled.div`
  background-color: white;
  border-radius: 25px;

  height: auto;

  padding: 15px;

  transition: transform 0.2s linear;

  img {
    max-width: 100%;
    border-radius: 25px;
  }

  h2 {
    color: #1199dd;
    text-align: justify;
  }

  hr {
    border: 0.5px solid #2411d6;
  }

  span {
    color: #34343d;
  }

  &:hover {
    transform: scale(1.05);
  }
`;

PostCard.propTypes = {
  title: P.string.isRequired,
  cover: P.string.isRequired,
  body: P.string.isRequired,
  id: P.number.isRequired,
};
