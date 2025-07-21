import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import placeCard1 from "../../assets/images/default-photo.jpg";
import { Link } from "react-router-dom";
import "../../styles/card.css";
import { FaLocationDot } from "react-icons/fa6";

const PlaceCard = ({
  title = "Título del lugar",
  description = "Descripción breve del lugar.",
  city = "Ciudad no especificada",
  img,
  id = null,
}) => {
  const imageSrc = img || placeCard1;
  return (
    <Card className="card">
      <Card.Img className="card-img" variant="top" src={imageSrc} alt={title} />
      <Card.Body className="card-body">
        <div className="content-card">
          <Card.Title className="card-title-ellipsis">{title}</Card.Title>
          <Card.Text  className="card-description">{description}</Card.Text>
          <Card.Text className="card-city-ellipsis">
            <strong>
              <FaLocationDot />
            </strong>{" "}
            {city}
          </Card.Text>
        </div>
        <Button
          variant="link"
          className="btn-link"
          as={Link}
          to={`/card/${id}`}
        >
          Ver más
        </Button>
      </Card.Body>
    </Card>
  );
};

export default PlaceCard;
