import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import ShopeItems from './Shopitems';

const ShopListing = () => {
  return (
    <div className="p-4">
      <Row>
        {ShopeItems.map((product) => (
          <Col lg="4" key={product.id} className="mb-4">
            <Link to="/apps/shopdetail">
              <img src={product.photo} alt="product" className="img-fluid rounded-3" />
            </Link>
            <div className="pt-2">
              <small>{product.category}</small>
              <h5 className="mb-3">{product.title}</h5>
              <div className="d-flex align-items-center">
                <h5>{product.price}</h5>
                <div className="ms-auto">
                  {product.star.map((index) => (
                    <i className="bi bi-star-fill text-warning" key={index} />
                  ))}
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ShopListing;
