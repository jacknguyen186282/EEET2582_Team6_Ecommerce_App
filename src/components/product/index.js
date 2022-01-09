import {Link} from "react-router-dom";
import {
    Container,
    Card,
    Image,
    Discount,
    SectionTitle,
    Title,
    Description,
    Wrapper,
    Button,
    Price
} from "./styles/product";

export default function Product({children, ...restProps}) {
    return <Container {...restProps}>{children}</Container>
}

Product.Image = ({children, ...restProps}) => {
    return <Image {...restProps}>{children}</Image>
}

Product.SectionTitle = ({children, ...restProps}) => {
    return <SectionTitle {...restProps}>{children}</SectionTitle>
}

Product.Discount = ({children, ...restProps}) => {
    return <Discount {...restProps}>{children}</Discount>
}

Product.Discount = ({children, ...restProps}) => {
    return <Discount {...restProps}>{children}</Discount>
}

Product.Card = ({children, ...restProps}) => {
    return <Card {...restProps}>{children}</Card>
}

Product.Title = ({children, ...restProps}) => {
    return <Title {...restProps}>{children}</Title>
}

Product.Description = ({children, ...restProps}) => {
    return <Description {...restProps}>{children}</Description>
}

Product.Wrapper = ({children, ...restProps}) => {
    return <Wrapper {...restProps}>{children}</Wrapper>
}

Product.Price = ({children, ...restProps}) => {
    return <Price {...restProps}>{children}</Price>
}

Product.Button = ({to, children, ...restProps}) => {
    return (
        <Link to={to}>
            <Button {...restProps}>
              {children}
            </Button>
        </Link>
    );
}
