import styled from 'styled-components/macro';

export const ButtonRow = styled.section`
  display: flex;
  width: 50vw;
  justify-content: space-evenly;
`;

export const Button = styled.button`
  color: #09d3ac;
  border: 3px solid #09d3ac;
  border-radius: 3px;
  background: transparent;
  width: 5rem;
  height: 5rem;
  font-size: 1.5rem;
  transition: all 0.1s ease;
  &.playing {
    transform: scale(1.1);
    border-color: #ffc600;
    box-shadow: 0 0 1rem #ffc600;
  }
`;
