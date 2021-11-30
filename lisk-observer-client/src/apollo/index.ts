import { ApolloClient, InMemoryCache, Reference } from "@apollo/client";

export const apolloClient = new ApolloClient({
  // link,
  uri: process.env.REACT_APP_SERVER_URL,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          launches: {
            keyArgs: false,
            merge(existing, incoming) {
              let launches: Reference[] = [];
              if (existing && existing.launches) {
                launches = launches.concat(existing.launches);
              }
              if (incoming && incoming.launches) {
                launches = launches.concat(incoming.launches);
              }
              return {
                ...incoming,
                launches,
              };
            },
          },
        },
      },
    },
  }),
});
