import * as React from 'react';
import { Helmet } from 'react-helmet-async';

import Loading from 'app/components/Loading';
import H1 from 'app/components/Elements/H1';
import Label from 'app/components/Elements/Label';
import Field from 'app/components/Elements/Fields';
import Input from 'app/components/Elements/Input';
import ErrorMsg from 'app/components/Elements/ErrorMsg';
import Button from 'app/components/Elements/Button';
import A from 'app/components/Elements/A';
import Flex from 'app/components/Elements/Flex';
import Textarea from 'app/components/Elements/Textarea';
import Ratio from 'app/components/Elements/Ratio';

import Wrapper from './Wrapper';

import Card from 'app/components/Elements/Card/Card';

export function OnlineBank() {
  return (
    <>
      <Helmet>
        <title>Online Bank</title>
      </Helmet>

      <Wrapper>
        <Card title="Online Bank" size="medium">
          <small>
            You can add fund by depositing via wire, interbank transfer, <br />{' '}
            or visiting a bank branch and deposit account below.
          </small>
          <br />
          <br />

          <div className="row">
            <div className="col">
              <div className="parent">
                <div className="image">
                  <Ratio size="1x1" fit="contain" radius="8px">
                    <img src="/banks/bpi.png" alt="Bank Logo" />
                  </Ratio>
                </div>
                <div className="details">
                  <p>
                    Account No: <span> 1234 4567 8910 112</span>
                  </p>
                  <p>
                    Account Name: <span>Juan Dela Cruz</span>
                  </p>
                  <p>
                    Branch: <span>Ortigas</span>
                  </p>
                  <p>
                    Swift Code: <span>12341</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="parent">
                <div className="image">
                  <Ratio size="1x1" fit="contain" radius="8px">
                    <img src="/banks/landbank.png" alt="Bank Logo" />
                  </Ratio>
                </div>
                <div className="details">
                  <p>
                    Account No: <span> 1234 4567 8910 112</span>
                  </p>
                  <p>
                    Account Name: <span>Juan Dela Cruz</span>
                  </p>
                  <p>
                    Branch: <span>Ortigas</span>
                  </p>
                  <p>
                    Swift Code: <span>12341</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="parent">
                <div className="image">
                  <Ratio size="1x1" fit="contain" radius="8px">
                    <img src="/banks/pnb.png" alt="Bank Logo" />
                  </Ratio>
                </div>
                <div className="details">
                  <p>
                    Account No: <span> 1234 4567 8910 112</span>
                  </p>
                  <p>
                    Account Name: <span>Juan Dela Cruz</span>
                  </p>
                  <p>
                    Branch: <span>Ortigas</span>
                  </p>
                  <p>
                    Swift Code: <span>12341</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="parent">
                <div className="image">
                  <Ratio size="1x1" fit="contain" radius="8px">
                    <img src="/banks/metrobank.png" alt="Bank Logo" />
                  </Ratio>
                </div>
                <div className="details">
                  <p>
                    Account No: <span> 1234 4567 8910 112</span>
                  </p>
                  <p>
                    Account Name: <span>Juan Dela Cruz</span>
                  </p>
                  <p>
                    Branch: <span>Ortigas</span>
                  </p>
                  <p>
                    Swift Code: <span>12341</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="parent">
                <div className="image">
                  <Ratio size="1x1" fit="contain" radius="8px">
                    <img src="/banks/eastwest.png" alt="Bank Logo" />
                  </Ratio>
                </div>
                <div className="details">
                  <p>
                    Account No: <span> 1234 4567 8910 112</span>
                  </p>
                  <p>
                    Account Name: <span>Juan Dela Cruz</span>
                  </p>
                  <p>
                    Branch: <span>Ortigas</span>
                  </p>
                  <p>
                    Swift Code: <span>12341</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="parent">
                <div className="image">
                  <Ratio size="1x1" fit="contain" radius="8px">
                    <img src="/banks/hsbc.png" alt="Bank Logo" />
                  </Ratio>
                </div>
                <div className="details">
                  <p>
                    Account No: <span> 1234 4567 8910 112</span>
                  </p>
                  <p>
                    Account Name: <span>Juan Dela Cruz</span>
                  </p>
                  <p>
                    Branch: <span>Ortigas</span>
                  </p>
                  <p>
                    Swift Code: <span>12341</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Wrapper>
    </>
  );
}
