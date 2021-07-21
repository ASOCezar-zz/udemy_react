import P from 'prop-types';

import React from 'react';
import styled from 'styled-components';

export const ButtonLoad = ({ text, onClick, disabled }) => {
  return (
    <Button onClick={onClick} disabled={disabled}>
      {text}
    </Button>
  );
};

const Button = styled.button`
  width: 100%;
  background: #a806f3;
  color: white;
  font-weight: bold;
  border-radius: 25px;
  padding: 15px 30px;
  cursor: pointer;

  &:active {
    background: #b03ae7c9;
  }

  &:disabled {
    background: #888;
    cursor: not-allowed;
  }
`;

Button.defaultProps = {
  disabled: false,
};

ButtonLoad.propTypes = {
  text: P.string.isRequired,
  onClick: P.func.isRequired,
  disabled: P.bool,
};
