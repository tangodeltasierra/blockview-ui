import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Table,
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle
} from 'reactstrap';

const Detail = props => {
  const [block, setBlock] = useState({});

  const getBlock = async hash => {
    setBlock({});
    const getData = await fetch(`http://localhost:3000/block?hash=${hash}`);
    const data = await getData.json();
    setBlock(data);
    return () => {}; // unsubscribe
  };

  useEffect(() => {
    if (props.block.hash) getBlock(props.block.hash);
  }, [props.block.hash]);

  const DataTable = props => {
    const [data, setData] = useState(props.data || []);
    const [keys, setKeys] = useState([]);
    useEffect(() => {
      setData(props.data);
      props.data.map((v, k) => setKeys(k => [...k, Object.keys(v)]));
    }, [props.data]);

    return data.length > 0
      ? data.map((v, k) => (
          <Card key={`${k}`} className="m-4">
            <CardBody>
              <CardTitle></CardTitle>
              <CardSubtitle></CardSubtitle>
              {keys.length > 0
                ? keys[k].map((val, key) => (
                    <CardText>
                      <b style={{ textTransform: 'capitalize' }}>{val}:</b>
                      &nbsp;
                      {Object.keys(Object.values(v)[key]).length > 0 ? (
                        Object.values(v)[key] instanceof Array ? (
                          <DataTable data={Object.values(v)[key]} />
                        ) : Object.values(v)[key] instanceof Object ? (
                          <DataTable data={[Object.values(v)[key]]} />
                        ) : (
                          Object.values(v)[key]
                        )
                      ) : (
                        Object.values(v)[key]
                      )}
                    </CardText>
                  ))
                : null}
            </CardBody>
          </Card>
        ))
      : null;
  };

  return (
    <Col
      lg="9"
      className="bg-light shadow-lg vh-100"
      style={{ overflowY: 'auto' }}
    >
      {props.block.hash ? (
        <div>
          <Table>
            <thead>
              <tr>
                <th>Height</th>
                <th>Hash</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{props.block.height}</td>
                <td>{props.block.hash}</td>
                <td>{props.block.time}</td>
              </tr>
            </tbody>
          </Table>
          {!block.size ? (
            <div className="d-flex justify-content-center align-items-center h-100">
              <i className="fas fa-spin fa-3x fa-spinner"></i>
            </div>
          ) : (
            <div>
              <Table>
                <thead>
                  <tr>
                    <th>Size</th>
                    <th>Previous Hash</th>
                    <th>Block Index</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{block.size}</td>
                    <td>{block.prev_block}</td>
                    <td>{block.block_index}</td>
                  </tr>
                </tbody>
              </Table>
              {block.tx.length > 0
                ? block.tx
                    .filter((v, k) => k === 10)
                    .map((tx, k) => {
                      return (
                        <Row key={k}>
                          <Col md={6}>
                            <h4>Inputs</h4>
                            <DataTable data={tx.inputs} />
                          </Col>
                          <Col md={6}>
                            <h4>Outputs</h4>
                            <DataTable data={tx.out} />
                          </Col>
                        </Row>
                      );
                    })
                : null}
            </div>
          )}
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <i className="fab fa-5x fa-bitcoin"></i>
        </div>
      )}
    </Col>
  );
};
export default Detail;
