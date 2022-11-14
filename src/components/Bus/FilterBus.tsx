import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import loadData from "../../services/load-data";

const BusFilter = ({ setFilterQuery }: any) => {
  const [query, setQuery] = useState<any>({});
  const [routes, setRoutes] = useState<any>();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setQuery({ ...query, [name]: value });
  };

  useEffect(() => {
    const getRoutes = async () => {
      const data = await loadData("http://localhost:9090/routes");
      setRoutes(data.routes);
    };
    getRoutes();
  }, []);

  return (
    <div className="w-50">
      <Form className="mt-2">
        <Row>
          <Form.Group as={Col}>
            <Form.Control
              name="_id"
              onChange={handleChange}
              placeholder="Enter ID"
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Control
              name="capacity"
              onChange={handleChange}
              placeholder="Capacity"
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Select
              name="route"
              onChange={handleChange}
              aria-label="Default select example"
            >
              <option>Route</option>
              {routes
                ? routes.map((route: any, index: any) => (
                    <option value={route["_id"]} key={index}>
                      {route["routeName"]}
                    </option>
                  ))
                : null}
            </Form.Select>
          </Form.Group>
        </Row>
        <Button
          className="m-1"
          variant="outline-info"
          onClick={() => {
            const queryBuilder = Object.entries(query)
              .map(([key, value]) => `${key}=${value}`)
              .join("&");
            console.log(queryBuilder);
            setFilterQuery(queryBuilder);
          }}
        >
          Apply Filter
        </Button>
        {query ? (
          <Button
            className="m-1"
            variant="outline-danger"
            onClick={() => {
              setFilterQuery(" ");
            }}
          >
            Remove Filter
          </Button>
        ) : null}
      </Form>
    </div>
  );
};

export default BusFilter;
