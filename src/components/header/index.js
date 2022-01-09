import { Link } from "react-router-dom";
import React, { useState } from 'react';
import {
  TopContainer,
  BottomContainer,
  Wrapper,
  Contact,
  TextLink,
  Nav,
  IconLink,
  Logo,
  Dropdown,
  DropButton,
  DropContent,
  CategoryLink,
  Search,
  SearchButton
} from "./styles/header";
import { SearchContainer } from "..";

export default function Header({ children, ...restProps }) {
  return <div {...restProps}>{children} </div>
}

Header.TopContainer = ({ children, ...restProps }) => {
  return <TopContainer {...restProps}>{children}</TopContainer>
}

Header.BottomContainer = ({ children, ...restProps }) => {
  return <BottomContainer {...restProps}>{children}</BottomContainer>
}

Header.Wrapper = ({ children, ...restProps }) => {
  return <Wrapper {...restProps}>{children}</Wrapper>
}

Header.Contact = ({ children, ...restProps }) => {
  return <Contact {...restProps}>{children}</Contact>
}

Header.TextLink = ({ children, ...restProps }) => {
  return <TextLink {...restProps}>{children}</TextLink>
}

Header.Nav = ({ children, ...restProps }) => {
  return <Nav {...restProps}>{children}</Nav>
}

Header.IconLink = ({ children, ...restProps }) => {
  return <IconLink {...restProps}>{children}</IconLink>
}

Header.Logo = ({ to, children, ...restProps }) => {
  return (
    <Link to={to}>
      <Logo {...restProps}>{children}</Logo>
    </Link>
  )
}

Header.Dropdown = ({ categories, ...restProps }) => {
  const categoryList = [];
  const subcategoryList = [];
  for (const [key, value] of Object.entries(categories)) {
    categoryList.push(key.substring(2));
    subcategoryList.push(value);
  }
  // <SearchContainer categories={categories}></SearchContainer>

  return (
    <Dropdown {...restProps}>
      <DropButton>
        Categories &nbsp;<i className="fas fa-chevron-down"></i>
      </DropButton>
      <DropContent>
        {categoryList.map((category, index) => (
          <CategoryLink key={index} to={`/search/category/${category}`}>{category}</CategoryLink>
        ))}
      </DropContent>
    </Dropdown>
  )
}

Header.Search = ({ ...restProps }) => {
  return (
    <Search {...restProps}>
      <input type="text" placeholder="Search an item..." />
      <SearchButton>
        <i className="fas fa-search"></i>
      </SearchButton>
    </Search>
  )
}






