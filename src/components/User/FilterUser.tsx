import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

const FilterUser = ({ setFilterQuery, userModal }: any) => {
  const [fieldValue, setFieldValue] = useState<any>();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFieldValue(`${name}=${value}`);
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
            {userModal === "user" ? (
              <Form.Select
                name="active"
                onChange={handleChange}
                aria-label="Default select example"
              >
                <option>Status</option>
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </Form.Select>
            ) : (
              <Form.Select
                name="staffType"
                onChange={handleChange}
                aria-label="Default select example"
              >
                <option>Staff Type</option>
                <option value="Admin">Admin</option>
                <option value="Level1">Level1</option>
                <option value="Level2">Level2</option>
              </Form.Select>
            )}
          </Form.Group>
        </Row>
        <Button
          className="m-1"
          variant="outline-info"
          onClick={() => setFilterQuery(JSON.stringify(fieldValue))}
        >
          Apply Filter
        </Button>
        {fieldValue ? (
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

export default FilterUser;
