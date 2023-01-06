import React, { ReactNode } from 'react';
import styled from 'styled-components';

import PropTypes from 'prop-types';

type ContainerProps = {
  id: string;
  children: ReactNode;
  Background?: () => JSX.Element;
  place?: string;
  bc: string
};

const Container = ({
  id,
  children,
  place,
  Background = DefaultBackground,
  bc
}: ContainerProps) => (
  <div id={id} style={{ position: 'relative', width:'100%', backgroundColor: bc?bc:'none' }}>
    {Background && !bc &&  <Background /> }
    <SectionContainer 
      place={place} 
      bc={bc}
    >
      {children}
    </SectionContainer>
  </div>
);

Container.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  Background: PropTypes.func,
};




const SectionSpan= styled.span`
  border-bottom:  5px solid ${({ theme }) => theme.colors.primary};
`;

const SectionContainer = styled('div')<{ place?: string }>`
  min-height: 100%;
  min-width: 320px;
  max-width: 100vw;
  margin: auto;
  flex: 0 1 auto;

 /* flex-direction: column; */
  justify-content: ${({ place }) => place ? place : 'center'};
  scroll-behavior: smooth;
  @media only screen and (min-width: 768px) {
    /* For everything bigger than 768px */
   
  }

`;

const DefaultBackground = () => <div />;

export default {
  Container
};