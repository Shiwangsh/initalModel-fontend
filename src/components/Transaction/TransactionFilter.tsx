import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

const TransactionFilter = ({ setFilterQuery }: any) => {
  const [query, setQuery] = useState<any>({});

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setQuery({ ...query, [name]: value });
  };

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
            <Form.Select
              name="type"
              onChange={handleChange}
              aria-label="Default select example"
            >
              <option>Transaction Type</option>
              <option value="Ticket">Ticket</option>
              <option value="Load Balance">Payment</option>
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Select
              name="status"
              onChange={handleChange}
              aria-label="Default select example"
            >
              <option>Transaction Status</option>
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
            </Form.Select>
          </Form.Group>
        </Row>
        <Button
          className="m-1"
          variant="outline-info"
          onClick={() => {
            // console.log(query);
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

export default TransactionFilter;
