import styled from 'styled-components/macro';
import "../../../index.css"

export const Container = styled.div`
  margin-top: 48px;
  padding: 0 72px;
  display: flex;
  justify-content: space-between;
`

export const ImgContainer = styled.div`
  width: 48%;
  max-width: 48%;
  min-height: 500px;
`

export const ContentContainer = styled.div`
  width: 48%;
  max-width: 48%;
  min-height: 500px;
`

export const Field = styled.div`
  display: flex;
  margin-top: 32px;
`

export const Title = styled.p`
  font-size: 18px;
  color: #A9A9A9;
  font-weight: 400;
  margin-right: 24px;
`

export const TitleValue = styled.p`
  font-size: 18px;
  color: #22181CCC;
  font-weight: 400;
`

export const ColorChoiceContainer = styled.div`
  color: rgba(34, 24, 28, 0.5);
  margin-left: 26px;

  label {
    margin-left: 10px;
  }

  :hover {
    color: orange;
    font-weight: 700;
    cursor: pointer;
  }
`

export const ColorField = styled.div`
  display: flex;
  margin-top: 32px;
`

export const PriceContainer = styled.div`
  display: flex;
  margin-top: 34px;
  color: #FF9900;
  font-size: 24px;
  font-weight: 700;

  p {
    margin-left: 12px;
  }
`

export const Paragraph = styled.div`
  margin: 32px 0px;

  .description {
    font-size: 20px;
    font-weight: 700;
    color: #22181C;
  }
  .content {
    text-align: justify;
    font-size: 18px;
    font-weight: 400;
    margin-top: 12px;
  }
`

export const Button = styled.div`
  width: 60%;
`

export const TurnBack = styled.div`
  display: block;
  margin-top: 32px;
  font-size: 16px;
  font-weight: 700;
  color: #7A4900;

  :hover {
    text-decoration: underline;
    cursor: pointer;
  }
`

export const Image = styled.div`
  width: 100%;
  margin-left: auto;
  margin-right: auto;

  div {
  width: 100%;

  /* To fix the aspect ratio to 3:4 */
  position: relative;
  padding-top: 100%;
  }

  img {
    position: absolute;
    justify-self: center;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    /* To fit the whole 3:4 container */
    width: 100%;
    height: 100%;
    object-fit: fill;
    border-radius: 24px;
  }
`

export const Dots = styled.div`
  margin-top: 24px;
  text-align: center;
  color: #E0E0E0;

  .dot-line {
    display: flex;
    margin-left: auto;
    margin-right: auto;
    width: 20%;
    justify-content: space-between;

    div:hover {
      cursor: pointer;
      color: #FF9900;
    }
  }
`