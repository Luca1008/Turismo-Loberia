import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import placeCard1 from "../../assets/images/place-card-index/place-card-1.jpg";

const PlaceCard = ({ title, description, city, img }) => {
  // Default values for props
  title = title || "Título del lugar";
  description = description || "Descripción breve del lugar.";
  city = city || "Ciudad no especificada";
  img = img || placeCard1;
  return (
    <Card className="place-card">
      <Card.Img variant="top" src={img || "https://via.placeholder.com/300x200?text=Sin+Imagen"}
        alt={title} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text><strong>Ciudad:</strong> {city}</Card.Text>
        <Button variant="link">Ver más</Button>
      </Card.Body>
    </Card>
  );
}

export default PlaceCard;
