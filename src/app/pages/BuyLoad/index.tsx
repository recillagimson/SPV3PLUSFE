import * as React from 'react';
import { Helmet } from 'react-helmet-async';

import Loading from 'app/components/Loading';
import H1 from 'app/components/Elements/H1';
import Label from 'app/components/Elements/Label';
import Field from 'app/components/Elements/Fields';
import Input from 'app/components/Elements/Input';
import ErrorMsg from 'app/components/Elements/ErrorMsg';
import A from 'app/components/Elements/A';
import Flex from 'app/components/Elements/Flex';

import Wrapper from './Wrapper';

import Card from 'app/components/Elements/Card/Card';

import { Button, Row, Col, Container } from 'react-bootstrap';

export function BuyLoad() {
  return (
    <>
      <Helmet>
        <title>Buy Load</title>
      </Helmet>

      <Wrapper>
        <Card title="Buy Load" size="medium">
          <Container>
            <Row>
              <Col sm={8} lg={12}>
                sm=8
              </Col>
              <Col sm={4}>sm=4</Col>
            </Row>
            <Row>
              <Col sm>sm=true</Col>
              <Col sm>sm=true</Col>
              <Col sm>sm=true</Col>
            </Row>
          </Container>
          <Button>LOL</Button>
        </Card>
      </Wrapper>
    </>
  );
}
