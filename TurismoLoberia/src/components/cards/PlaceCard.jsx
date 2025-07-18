import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import placeCard1 from "../../assets/images/place-card-index/place-card-1.jpg";
import { Link } from "react-router-dom";

const PlaceCard = ({
  title = "Título del lugar",
  description = "Descripción breve del lugar.",
  city = "Ciudad no especificada",
  img = placeCard1,
  id = null,
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
        <Button as={Link} to={`/card/${id}`} variant="link">
          Ver más
        </Button>
      </Card.Body>
    </Card>
  );
};

export default PlaceCard;
