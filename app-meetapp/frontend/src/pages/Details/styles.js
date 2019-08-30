import styled from 'styled-components'

export const Container = styled.div`
  padding: 0 30px;
`

export const Content = styled.div`
  max-width: 900px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
`

export const HeaderButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Cover = styled.div`
  margin-top: 30px;

  img {
    width: 100%;
  }
`
export const Description = styled.div`
  text-align: justify;
  color: #fff;
  font-size: 18px;
  font-family: Helvetica Neue, Helvetica, Arial;

  p {
    margin-top: 20px;
  }
`

export const DescriptionDetails = styled.div`
  margin-top: 30px;
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #ccc;

  div {
    display: flex;
    align-items: center;
    margin-right: 10px;
  }

  span {
    margin-left: 8px;
  }
`
