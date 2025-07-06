import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import placeCard1 from "../../assets/images/place-card-index/place-card-1.jpg";
const PlaceCard = () => {
  return (
    <Card className="place-card">
      <Card.Img variant="top" src={placeCard1} />
      <Card.Body>
        <Card.Title>
          Museo de Ciencias Naturales Gesué Pedro Noseda - Lobería
        </Card.Title>
        <Card.Text>
          Conocé la megafauna pampeana, restos arqueológicos y fósiles locales.
        </Card.Text>
        <Button variant="link">Ver más</Button>
      </Card.Body>
    </Card>
  );
}

export default PlaceCard;
