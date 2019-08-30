import styled from 'styled-components'

export const Container = styled.div`

  label {
    cursor: pointer;

    width: 100%;
    min-height: 300px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin: 30px 0;

    background: rgba(0, 0, 0, 0.4);
    transition: background 0.3s;

    border-radius: 4px;

    &:hover {
      background: rgba(0, 0, 0, 0.3);
    }

    div {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      color: #fff;

      strong {
        margin-top: 10px;
      }
    }

    img {
      width: 100%;
    }

    input {
      display: none;
    }
  }
`
