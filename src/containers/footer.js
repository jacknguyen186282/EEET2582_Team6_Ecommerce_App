import { Footer } from "../components";

export const FooterContainer = ({categories}) => {
    const categoryList = [];
  const subcategoryList = [];
  for (const [key, value] of Object.entries(categories)) {
    categoryList.push(key);
    subcategoryList.push(value);
  }
    return (
        <Footer>
            <Footer.Wrapper>
                <Footer.Column>
                    <Footer.Heading>Get in touch</Footer.Heading>
                    <Footer.Link to="/">About us</Footer.Link>
                    <Footer.Link to="/">Blog</Footer.Link>
                    <Footer.Link to="/">Chat with us</Footer.Link>
                </Footer.Column>
                <Footer.Column>
                    <Footer.Heading>Connections</Footer.Heading>
                    <Footer.Link to="/">Facebook</Footer.Link>
                    <Footer.Link to="/">Twitter</Footer.Link>
                    <Footer.Link to="/">Instagram</Footer.Link>
                    <Footer.Link to="/">Youtube</Footer.Link>
                    <Footer.Link to="/">Linkedin</Footer.Link>
                </Footer.Column>
                <Footer.Column>
                    <Footer.Heading>Catgory</Footer.Heading>
                    {categoryList.map((cateogry, index) => {
                        return <Footer.Link to="/category" key={index}>{cateogry}</Footer.Link> 
                    })}
                </Footer.Column>
                <Footer.Column>
                    <Footer.Heading>Account</Footer.Heading>
                    <Footer.Link to="/">Profile</Footer.Link>
                    <Footer.Link to="/">Help</Footer.Link>
                </Footer.Column>
            </Footer.Wrapper>
        </Footer>
    )
}