import P from 'prop-types';

import styled from 'styled-components';

export const TextInput = ({ searchValue, handleChange }) => {
  return (
    <Input
      className="text-input"
      onChange={handleChange}
      value={searchValue}
      type="search"
      placeholder="Type your search"
    />
  );
};

const Input = styled.input`
  width: 75%;
  font-size: 20px;
  padding: 5px 10px;
  border: none;
  font-weight: normal;
  text-align: center;
  transition: transform 0.3s ease-in-out;

  &:focus {
    transform: scale(1.1);
  }
`;

TextInput.propTypes = {
  searchValue: P.string.isRequired,
  handleChange: P.func.isRequired,
};
