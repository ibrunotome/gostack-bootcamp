import styled from 'styled-components'
import { darken } from 'polished'

export const Button = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 10px;
  background: ${props => props.color ? props.color : '#F94D6A'};
  border: 0;
  border-radius: 4px;
  padding: 10px 20px;
  color: #fff;
  font-weight: bold;
  transition: background 0.2s;
  :disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &:hover {
    background: ${darken(0.05, '#F94D6A')};
  }

  div {
    margin-left: 8px;
  }
`
