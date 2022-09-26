import fetch from 'cross-fetch';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { getMainDefinition, relayStylePagination  } from '@apollo/client/utilities';
//import { createPersistedQueryLink } from "@apollo/client/link/persisted-queries";

//import { SubscriptionClient } from 'subscriptions-transport-ws';
//import { WebSocketLink } from '@apollo/client/link/ws';

//import ws from "ws"

//const wsForNode = typeof window === "undefined" ? ws : null

//import { sha256 } from 'crypto-hash';


const http = new HttpLink({
//	uri: `https://www-dev.sportstats.one/graphql`,
			  uri: `https://2tdxe2ivhf.execute-api.us-west-2.amazonaws.com/dev/graphql`,
	fetch
})

//const linkChain = createPersistedQueryLink({sha256, useGETForHashedQueries: true}).concat(http);


export const client = new ApolloClient({ 
	link: http, 
	cache: new InMemoryCache({
		typePolicies: {
		    Query: {
		      fields: {
		      	allMembers: relayStylePagination(),
		      	results: relayStylePagination() ,
		      	allResults: relayStylePagination(),
		      	masterEvents: relayStylePagination(),
		      	upcomingEvents: relayStylePagination(),
		      	recentEvents: relayStylePagination(),
		      }
		    }
		}
	})
});
