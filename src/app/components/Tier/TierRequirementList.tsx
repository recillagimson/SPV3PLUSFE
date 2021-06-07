/**
 * Tier Requirement List
 * Rendering the style need for the Tier Requirement list
 *
 * @prop {array}  requirements      List of requirements
 */
import * as React from 'react';
import styled from 'styled-components/macro';

const Wrapper = styled.div`
  font-size: 1rem;
  padding: 5px 0;

  h3 {
    font-weight: 500;
    font-size: 1rem;
    margin: 0 0 5px;
  }

  ul {
    margin: 0 0 20px 20px;
    padding: 0 0 0 10px;
    color: inherit;

    li {
      margin: 0 0 5px;
    }
  }
`;

type TierRequirementListProps = {
  requirements: {
    name: string;
    list: {
      name: string;
    }[];
  }[];
};
export default function TierRequirementList({
  requirements,
}: TierRequirementListProps) {
  return (
    <Wrapper>
      {requirements &&
        requirements.length > 0 &&
        requirements.map((i: any) => (
          <React.Fragment key={i.name.replace(' ', '-').toLowerCase()}>
            {i.name !== '' && <h3>{i.name}</h3>}
            {i.list.length > 0 && (
              <ul>
                {i.list.map((j: { name: string }) => (
                  <li key={j.name.replace(' ', '-').toLowerCase()}>{j.name}</li>
                ))}
              </ul>
            )}
          </React.Fragment>
        ))}
    </Wrapper>
  );
}
