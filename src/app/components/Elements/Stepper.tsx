import * as React from 'react';
import styled from 'styled-components/macro';
import { StyleConstants } from 'styles/StyleConstants';

const Wrapper = styled.div<{
  margin?: string;
}>`
  display: flex;
  width: 100%;
  background-color: #f9f9f9;
  padding: ${StyleConstants.spacing[12]} ${StyleConstants.spacing[12]};
  margin: ${p => (p.margin ? p.margin : '0 0')};
`;

const Step = styled.div<{
  active?: boolean;
  width: number;
  num: number;
}>`
  width: ${p => (p.width ? `${p.width}%` : '33%')};
  font-size: 0.75rem;
  text-align: center;
  position: relative;

  &:before {
    background-color: ${p =>
      p.active ? StyleConstants.color.tones.green : '#f0f0f0'};
    color: ${p => (p.active ? '#fff' : 'inherit')};
    content: ${p => (p.num ? `'${p.num}'` : '0')};
    display: block;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    text-align: center;
    line-height: 32px;
    font-size: 0.85rem;
    margin: 0 auto 10px;
    position: relative;
    z-index: 2;
    border: 2px solid #f9f9f9;
  }

  &:not(:first-child):after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    background-color: ${p =>
      p.active ? StyleConstants.color.tones.green : '#f0f0f0'};
    top: 17px;
    left: -50%;
    z-index: 1;
  }
`;

type StepProps = {
  name: string;
  active: boolean;
};

interface StepperProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * An string array of steps
   * @default []
   *
   * @example [{ name: 'Step 1', active: true }, { name: 'Step 2', active: true }, { name: 'Step 3', active: false }]
   */
  steps: StepProps[];
  margin?: string;
}

/**
 * Stepper
 * NOTE: this are not clickable stepper, only a guide to show user of where they are
 * @typedef StepperProps
 */
export default function Stepper({ steps = [], margin }: StepperProps) {
  // Return if there is steps length is 0
  if (steps && steps.length === 0) {
    return null;
  }

  const width = Math.floor(100 / steps.length);
  return (
    <Wrapper margin={margin || undefined}>
      {steps.map((s, i) => (
        <Step key={i} active={s.active} width={width} num={i + 1}>
          {s.name}
        </Step>
      ))}
    </Wrapper>
  );
}
