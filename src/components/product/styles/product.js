import styled from 'styled-components/macro';

export const Container = styled.div`
    width: 100vw;
    position: relative;
    z-index: 10;
    overflow: hidden;
    margin: 0 auto;
    display:flex;
    justify-content: space-evenly;
    align-items:center;
    flex-wrap: wrap;

`

export const Card = styled.div`
    background-color: var(--white-base);
    /* width: 22%; */
    display: flex;
    flex-direction: column;
    border-radius: 12px;
    box-shadow: 0px 16px 24px rgba(0, 0, 0, 0.08), 0px 2px 6px rgba(0, 0, 0, 0.06),
    0px 0px 1px rgba(0, 0, 0, 0.04);
    padding: 10px;
    margin-bottom: 1rem;
    width: 25%;
`

export const Image = styled.img`
    margin: 0 auto;
    width: 100%;
    height: 100%;
    /* object-fit: cover; */
    
`

export const Discount = styled.span`
    position: absolute;
    margin: 10px;
    color: #aa1504;
    width: fit-content;
    padding: 5px 15px;
    border-radius: 1em;
    background-color: #d0ccd0;
`

export const SectionTitle = styled.h2`
    text-align:center;
    margin: 3rem 0;
    color: var(--primary-500);
`

export const Title = styled.p`
    /* color: pink; */
    font-weight: 700;
    line-height: 150%;
    font-weight: bold;
    /* height: 100px; */
    margin: 20px 0 5px 0;
    font-size: 1.2em;
`

export const Description = styled.p`
    /* color: pink; */
    font-weight: 400;
    line-height: 150%;
    height: 50px;
    font-size: 0.9em;
`

export const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    /* border: 10px solid purple; */
    align-items: flex-start;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
`

export const Button = styled.button`
    border: none;
    outline: none;
    border-radius: 0.2em;
    color: #fffaff;
    font-weight: bold;
    background-color: var(--primary-500);
    font-size: 0.9rem;
    padding: 8px 16px;
    /* width: fit-content; */
`

export const Price = styled.p`
    font-size: 1.2rem;
    font-weight: 700;
`