import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';


/* ----- TOP CONTAINER ----- */
export const TopContainer = styled.div`
    width: 100%;
    margin: 0 auto;
`

export const Contact = styled.div`
    flex: 1;
    flex-wrap: wrap;
    margin: 10px;
`

export const TextLink = styled.a`
    margin: 0 10px;
    color: var(--black-base);
    text-decoration: none;
    font-weight: 500;
`

export const Nav = styled.div`
    display: flex;
    flex: 1;
    justify-content: flex-end;   
`

export const IconLink = styled(Link)`
    margin: 0 5%;
    font-size: 1em;
    font-weight: 500;
`

export const Wrapper = styled.div`
    display: flex;
    width: 100%;
    background-color: #fff;
    justify-content: space-between;
    align-items: center;
    padding: 10px 3%;

    ${IconLink} i:hover, ${TextLink}:hover {
        color: var(--primary-600);
        i {
            color: var(--primary-600);
        }
    }

    i {
        color: black;
    }
`

export const Logo = styled.h1`
    font-size: var(--font-500);
    color: var(--primary-500);
`


/* ----- BOTTOM CONTAINER ----- */
export const BottomContainer= styled.div`
    background-color: var(--primary-800);
    color: white;
    padding: 20px 3%;
    /* width: 97%; */
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;

    input {
        padding: 10px 0;
        width: 80%;
        border-radius: 0.5em;
        text-indent: 20px;
        outline: none;
        border: 0;
    }

    input:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgb(245, 126, 126);
        transition: 200ms ease-in-out;
    }
`
export const DropButton = styled.button`
    border: none;
    background-color: var(--primary-800);
    color: white;
    font-weight: bold;
    font-size: 1em;
`

export const DropContent = styled.div`
    display: none;
    position: absolute;
    background-color: var(--white-base);
    min-width: 230px;
    border-radius: 0.2em;
    z-index: 2; /* to display in front of other elements */
`

export const Dropdown = styled.div`
    position: relative;
    display: inline-block;

    i {
      color: var(--primary-600);
    }

    &:hover ${DropContent} {
      display: block;
    }    
`

export const CategoryLink = styled(Link)`
    display: block;
    text-decoration: none;
    color: var(--black-base);
    padding: 10px;

    &:hover {
      background-color: var(--primary-600);
    }
`
export const SearchButton = styled.div`
    height: 100%;
    padding: 5px 15px;
    border-radius: 0 0.5em 0.5em 0;
    background: var(--primary-500);
`

export const Search = styled.div`
    position: relative;
    flex-grow: 2;
    display: flex;
    align-items: center;
    justify-content: center;

    ${SearchButton} {
        position: relative;
        color: #262525;
        right: 43px;
        z-index: 2;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    ${SearchButton}:hover, ${SearchButton}:focus {
        background: var(--primary-600);
    }
`
