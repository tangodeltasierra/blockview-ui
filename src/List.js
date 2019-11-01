import React from 'react';
import {
  Col,
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle
} from 'reactstrap';
import moment from 'moment';

const List = props => {
  return (
    <Col
      sm="12"
      lg="3"
      className="vh-100 bg-secondary shadow-sm d-inline-block"
    >
      {props.blocks.length > 0 ? (
        <div className="pt-4 list vh-100">
          {props.blocks.map(block => (
            <Card
              key={block.hash}
              onClick={ev => props.block(block)}
              className="mt-4 clickable"
            >
              <CardBody>
                <CardTitle>
                  <b>HEIGHT</b> {block.height}
                </CardTitle>
                <CardSubtitle>
                  {moment(new Date(block.time * 1000)).format(
                    'MMMM Do YYYY, h:mm:ss a'
                  )}
                </CardSubtitle>
                <CardText>{block.hash}</CardText>
              </CardBody>
            </Card>
          ))}
        </div>
      ) : null}
    </Col>
  );
};
export default List;
