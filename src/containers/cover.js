import { Cover } from "../components";
import Ring from "../assets/ring.png"
import Suit from "../assets/suit.png"


export const CoverContainer = () => {
  return (
    <>
      <Cover>
        <Cover.MainContent>
          <Cover.Text>Just Arrived</Cover.Text>
          <Cover.Heading>The New Collection Blends Versatility With Serenity.</Cover.Heading>
          <Cover.Button to="/">Learn More</Cover.Button>
        </Cover.MainContent>
      </Cover>
      <Cover.SubContent>
        <Cover.Sub src={Ring}>
          <div>
            <Cover.Heading size={2.5}>Accessories</Cover.Heading>
            <Cover.Quote >"Good dressing is largely a question of detail and accessories." </Cover.Quote>
            <Cover.Quote>- Elsie de Wolfe</Cover.Quote>
            <Cover.Button to="/">Shop Now</Cover.Button>
          </div>
        </Cover.Sub>
        <Cover.Sub src={Suit}>
          <div>
            <Cover.Heading size={2.5}>Tops</Cover.Heading>
            <Cover.Quote >"Elegance is not standing out, but being remembered." </Cover.Quote>
            <Cover.Quote>- Giorgio Armani</Cover.Quote>
            <Cover.Button to="/">Shop Now</Cover.Button>
          </div>
        </Cover.Sub>
      </Cover.SubContent>
    </>
  )
}