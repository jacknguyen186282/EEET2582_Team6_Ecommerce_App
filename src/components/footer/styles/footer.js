import styled from 'styled-components/macro';
import { Link as ReactRouterLink} from 'react-router-dom';

export const Container = styled.div`
    background-color: var(--primary-200);
    text-align: center;
    padding-bottom: 2rem;
`
export const Wrapper = styled.div`
    width: auto;
    padding: 80px;
    display: flex;
    justify-content: space-evenly;
    align-items: flex-start;
    text-align: start;
`

export const Column = styled.div`
    min-width: 150px;
`

export const Heading = styled.h4`
    font-size: 20px;
    font-weight: bold;
`

export const Link = styled(ReactRouterLink)`
    font-size: 16px;
    display: block;
    margin: 15px 0;
`