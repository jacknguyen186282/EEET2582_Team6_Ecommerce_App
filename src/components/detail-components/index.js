import {
  Container,
  ImgContainer,
  ContentContainer,
  Field,
  Title,
  TitleValue,
  ColorField,
  ColorChoiceContainer,
  PriceContainer,
  Paragraph,
  Button,
  TurnBack,
  Image,
  Dots
} from "./style/detail-components"

import { Link } from 'react-router-dom';

export default function DetailContainer({children, ...restProps}) {
  return <Container {...restProps}>{children}</Container>
}

DetailContainer.ImgContainer = ({children, ...restProps}) => {
  return <ImgContainer {...restProps}>{children}</ImgContainer>
}

DetailContainer.ContentContainer = ({children, ...restProps}) => {
  return <ContentContainer {...restProps}>{children}</ContentContainer>
}

DetailContainer.Field = ({title, value, ...restProps}) => {
  return (
    <Field {...restProps}>
      <Title>{title + ':'}</Title>
      <TitleValue>{value}</TitleValue>
    </Field>
  )
}

DetailContainer.ColorField = ({colorList, title, ...restProps}) => {
  return (
    <ColorField {...restProps}>
      <Title>{title + ':'}</Title>
      {colorList.map((color, index) => {
        return <ColorChoiceContainer key={index}><i class="fas fa-check-circle all-icon"></i> {color}</ColorChoiceContainer>
      })}
    </ColorField>
  )
}

DetailContainer.PriceContainer = ({priceValue, ...restProps}) => {
  return (
    <PriceContainer {...restProps}>
      <i class="fas fa-tag"></i>
      <p>{priceValue}</p>
    </PriceContainer>
  )
}

DetailContainer.Paragraph = ({content, ...restProps}) => {
  return (
    <Paragraph>
      <p class="Detail">Detail</p>
      <p class="content">{content}</p>
    </Paragraph>
  )
}

DetailContainer.Button = ({children, ...restProps}) => {
  return (
    <Button {...restProps}>
      <div class="primary-cta--base button">Add to Cart &nbsp;<i class="far fa-arrow-alt-circle-right"></i></div>
    </Button>
  )
}

DetailContainer.TurnBack = ({children, ...restProps}) => {
  return (
    <TurnBack>
      <Link to='/'><i class="far fa-arrow-alt-circle-left"></i> Go back and browse more</Link>
    </TurnBack>
  )
}

DetailContainer.Image = ({imageURL, ...restProps}) => {
  return (
    <Image {...restProps}>
      <div className="img-container">
        <img src={imageURL} alt="product"></img>
      </div>
    </Image>
  )
}

DetailContainer.Dots = ({children, ...restProps}) => {
  return <Dots {...restProps}>{children}</Dots>
}