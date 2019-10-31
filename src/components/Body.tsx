import React from 'react';
import styled, { keyframes } from 'styled-components/macro';
import { left, right, shirt } from '../images/';

const Section = styled.section`
  display: flex;
  justify-content: center;
  background-image: url(${shirt});
  background-repeat: no-repeat;
  background-position-x: center;
  background-size: 319px 456px;
  height: 18rem;
  align-items: flex-end;
`;

const armAnimate = keyframes`
  0% {
    transform: rotate(0deg)
  }
  20% {
    transform: rotate(-10deg);
  }
  40% {
    transform: rotate(10deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;

const Arm = styled.img<ArmProps>`
  width: 150px;
  height: 110px;
  transform-origin: top ${p => p.tfOrigin};
  :first-of-type {
    margin-right: 26px;
  }
  &.active {
    transform-origin: top ${p => p.tfOrigin};
    animation: ${armAnimate} 0.1s ease-in;
  }
`;

interface ArmProps {
  tfOrigin: string;
}
export const Body = () => {
  return (
    <Section>
      <Arm tfOrigin="left" width="150" className="arm left" src={right} />
      <Arm tfOrigin="right" width="150" className="arm right" src={left} />
    </Section>
  );
};
