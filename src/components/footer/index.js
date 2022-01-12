import {
    Container,
    Wrapper,
    Column,
    Heading,
    Link
} from "./styles/footer"

export default function Footer({children, ...restProps}) {
    return ( 
        <Container {...restProps}>
            {children}
            <p id="copyright">Copyright © 2022 team6architecture.com</p>  
        </Container>
    );
} 

Footer.Wrapper = ({children, ...restProps}) => {
    return <Wrapper {...restProps}>{children}</Wrapper>
}

Footer.Column = ({children, ...restProps}) => {
    return <Column {...restProps}>{children}</Column>
}

Footer.Heading = ({children, ...restProps}) => {
    return <Heading {...restProps}>{children}</Heading>
}

Footer.Link = ({children, ...restProps}) => {
    return <Link {...restProps}>{children}</Link>
}