import React, { useState, useEffect } from 'react';
import List from './List';
import Detail from './Detail';
import Loading from './Loading';
import { Container, Row } from 'reactstrap';

function App() {
  const [blocks, setBlocks] = useState([]);
  const [block, setBlock] = useState({});

  const getBlocks = async () => {
    const getData = await fetch('http://localhost:3000/latest');
    const data = await getData.json();
    setBlocks(data.blocks);
  };

  useEffect(() => {
    getBlocks();
    return () => {}; //unsubsribe
  }, []);

  return blocks && blocks.length === 0 ? (
    <Loading />
  ) : (
    <Container fluid>
      <Row className="vh-100">
        <List blocks={blocks || []} block={setBlock} />
        <Detail block={block || {}} />
      </Row>
    </Container>
  );
}

export default App;
