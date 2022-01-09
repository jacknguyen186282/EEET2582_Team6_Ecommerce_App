import {Link} from "react-router-dom";
import {
    Container,
    Button,
    Text,
    Heading,
    MainContent,
    SubContent,
    Sub,
    Quote
} from "./styles/cover";

export default function Cover({children, ...restProps}) {
    return <Container {...restProps}>{children}</Container>
}

Cover.Button = ({to, children, ...restProps}) => {
    return ( 
        <Link to={to}>
            <Button {...restProps}>{children}</Button>
        </Link>
    )
}

Cover.Text = ({children, ...restProps}) => {
    return <Text {...restProps}>{children}</Text>
}

Cover.Heading = ({children, ...restProps}) => {
    return <Heading {...restProps}>{children}</Heading>
}

Cover.MainContent = ({children, ...restProps}) => {
    return <MainContent {...restProps}>{children}</MainContent>
}

Cover.SubContent = ({children, ...restProps}) => {
    return <SubContent {...restProps}>{children}</SubContent>
}

Cover.Sub = ({children, ...restProps}) => {
    return <Sub {...restProps}>{children}</Sub>
}

Cover.Quote = ({children, ...restProps}) => {
    return <Quote {...restProps}>{children}</Quote>
}
