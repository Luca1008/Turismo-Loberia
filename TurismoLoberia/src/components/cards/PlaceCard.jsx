import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import placeCard1 from "../../assets/images/place-card-index/place-card-1.jpg";

const PlaceCard = ({
  title = "Título del lugar",
  description = "Descripción breve del lugar.",
  city = "Ciudad no especificada",
  img = placeCard1,
}) => {
  return (
    <Card className="place-card">
      <Card.Img
        variant="top"
        src={img || placeCard1}
        alt={title}
      />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text><strong>Ciudad:</strong> {city}</Card.Text>
        <Button variant="link">Ver más</Button>
      </Card.Body>
    </Card>
  );
};

export default PlaceCard;
