import React from 'react';
import styled, { keyframes } from 'styled-components/macro';
import { left, right } from '../images/';

const Section = styled.section`
  display: flex;
  justify-content: center;
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
  /* transition: all 0.07s ease; */
  transform-origin: top ${p => p.tfOrigin};
  &.active {
    transform-origin: top ${p => p.tfOrigin};
    animation: ${armAnimate} 0.1s ease;
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
