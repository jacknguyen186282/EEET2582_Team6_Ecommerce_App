import styled from 'styled-components/macro';
import CoverImage from "../../../assets/main_cover.jpg"

export const Container = styled.div`
    width: 100%;
    height: 100vh;
    background: url(${CoverImage});
    background-size: cover;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
`

export const Text = styled.p`
    font-size: var(--font-400);
    color: white;
    font-weight: 400;
`

export const Quote = styled.p`
    font-size: var(--font-200);
    color: white;
    font-weight: 400;
    font-style: italic;
`

export const MainContent = styled.div`
    margin-left: 55%;
    margin-top: 10%;
`

export const Heading = styled.h1`
    color: var(--white-base);
    text-transform: capitalize;
    font-size: ${({size}) => size ? size:3}rem;
    margin-top: 3%;
    line-height: 120%;
`

export const Button = styled.button`
    margin-top: 40px;
    font-size: 1.3rem;
    padding: 10px 20px;
    background: var(--primary-400);
    color: var(--white-base);
    border-radius: 0.2em;
    font-weight: bold;
`

export const SubContent = styled.div`
    display: flex;
`

export const Sub = styled.div`
    width: 50%;
    background: url(${(props) => props.src});
    background-size: cover;
    height: 70vh;
    justify-content: center;
    text-align: center;
    display: flex;
    align-items: center;
    padding: 1rem;
`
