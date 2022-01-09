import styled from 'styled-components/macro';
import "../../../index.css"

export const Container = styled.div`
  padding: 0 72px;
  margin-bottom: 120px;
`

export const LocationLink = styled.div`
  display: flex;
  margin-bottom: 60px;
  margin-top: 48px;

  span {
    margin: 0 11px;
  }
`

export const MainContent = styled.div`
  display: flex;
`

export const SideBar = styled.div`
  min-height: 400px;
  width: 20%;
`

export const ProductList = styled.div`
  min-height: 400px;
  width: 80%;
  margin-left: 20px;
`

export const Block = styled.div`
  margin-bottom: 54px;
`

export const SideBarHeader = styled.div`

  h2 {
    border-left: 5px solid var(--primary-800);
    margin-bottom: 24px;
    color: var(--primary-800);
    font-weight: 700;
  }
`

export const Option = styled.div`
  color: rgba(34, 24, 28, 0.5);

  label {
    margin-left: 10px;
  }

  :hover {
    color: orange;
    font-weight: 700;
  }
`

export const ProductRow = styled.div`
  display: flex;
  justify-content: space-between;
`

export const ApplyButton = styled.button`
  border: none;
  outline: none;
  border-radius: 0.2em;
  color: #fffaff;
  font-weight: bold;
  background-color: var(--primary-500);
  font-size: 1.5rem;
  padding: 8px 16px;
  width: 100%;
`

export const MinMax = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
`

export const Min = styled.div`
  width: 45%;

  p {
    color: black;
    font-size: var(--font-700);
    font-weight: 700;
    margin-bottom: 8px;
  }

  input {
    border-radius: 8px;
    border: 1px solid rgba(34, 24, 28, 0.2);
    height: 43px;
    text-indent: 20px;
    width: 100%;
  }
`
export const TopContent = styled.div`
  display: flex;
  margin-bottom: 33px;
`

export const FoundResult = styled.div`
  display: flex;

  p {
    font-size: 20px;
    font-weight: bold;
    color: black;
  }

  span {
    margin-left: 8px;
    font-size: 20px;
    font-weight: bold;
    color: #FF9900;
  }
`

export const DropContent = styled.div`
  display: none;
  position: absolute;
  background-color: var(--white-base);
  left: 80vw;
  /* min-width: 230px; */
  border-radius: 0.2em;
  z-index: 2; /* to display in front of other elements */
`

export const DropDown = styled.div`
  margin-left: auto;
  justify-self: flex-end;
  display: inline-block;
  background-color: rgba(34, 24, 28, 0.2);
  padding: 5px 12px;
  border-radius: 41px;

  &:hover ${DropContent} {
    display: block;
  }  
`

export const OptionValue = styled.div`
  display: block;
  text-decoration: none;
  color: var(--black-base);
  padding: 10px;

  &:hover {
    background-color: var(--primary-600);
  }
`