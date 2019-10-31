import React from 'react';
import styled from 'styled-components/macro';
import { left, right } from '../images/';

const Section = styled.section`
  display: flex;
  justify-content: center;
`;

export const Body = () => {
  return (
    <Section>
      <img width="150" src={right} />
      <img width="150" src={left} />
    </Section>
  );
};
