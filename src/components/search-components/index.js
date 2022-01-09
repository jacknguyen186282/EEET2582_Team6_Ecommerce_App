import { Link } from "react-router-dom";
import {
  Container,
  LocationLink,
  MainContent,
  SideBar,
  ProductList,
  SideBarHeader,
  Block,
  Option,
  ProductRow,
  ApplyButton,
  MinMax,
  Min,
  TopContent,
  FoundResult,
  DropDown,
  OptionValue,
  DropContent
} from "./style/category-components";


export default function CategoryContainer({ children, ...restProps }) {
  return <Container {...restProps}>{children} </Container>
}

CategoryContainer.LocationLink = ({ children, ...restProps }) => {
  return <LocationLink {...restProps}>{children}</LocationLink>
}

CategoryContainer.MainContent = ({ children, ...restProps }) => {
  return <MainContent {...restProps}>{children}</MainContent>
}

CategoryContainer.SideBar = ({ children, ...restProps }) => {
  return <SideBar {...restProps}>{children}</SideBar>
}

CategoryContainer.ProductList = ({ children, ...restProps }) => {
  return <ProductList {...restProps}>{children}</ProductList>
}

CategoryContainer.SideBarHeader = ({ children, ...restProps }) => {
  return <SideBarHeader {...restProps}>{children}</SideBarHeader>
}

CategoryContainer.Block = ({ children, ...restProps }) => {
  return <Block {...restProps}>{children}</Block>
}

CategoryContainer.Option = ({ children, ...restProps }) => {
  return <Option {...restProps}>{children}</Option>
}

CategoryContainer.ProductRow = ({ children, ...restProps }) => {
  return <ProductRow {...restProps}>{children}</ProductRow>
}

CategoryContainer.ApplyButton = ({ to, children, ...restProps }) => {
  return (
      <ApplyButton {...restProps}>
        {children}
      </ApplyButton>
  );
}

CategoryContainer.MinMax = ({ children, ...restProps }) => {
  return <MinMax {...restProps}>{children}</MinMax>
}

CategoryContainer.Min = ({ children, ...restProps }) => {
  return <Min {...restProps}>{children}</Min>
}

CategoryContainer.TopContent = ({ children, ...restProps }) => {
  return <TopContent {...restProps}>{children}</TopContent>
}

CategoryContainer.FoundResult = ({children, ...restProps}) => {
  return <FoundResult {...restProps}>{children}</FoundResult>
}

CategoryContainer.DropDown = ({options, ...restProps}) => {
  return (
    <DropDown {...restProps}>
      <p class="sort-by">Sort by | &nbsp; <i className="fas fa-chevron-down"></i></p>
      <DropContent>
        {options.map((option, index) => {
          return <OptionValue to="#" key={index}>{option}</OptionValue>
        })}
      </DropContent>
    </DropDown>
  ) 
}