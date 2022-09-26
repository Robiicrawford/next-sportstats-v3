import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { client } from './apollo-client.ts';


export const WrapRootElement = ({ element }) => (
    <ApolloProvider client={client}>{element}</ApolloProvider> 

);
