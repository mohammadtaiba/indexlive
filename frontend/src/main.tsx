import ReactDOM from 'react-dom/client';
import App from '@/App.tsx';
import '@/index.css';
import {Provider} from 'react-redux';
import {configureStore} from "@reduxjs/toolkit";
import { setupListeners} from "@reduxjs/toolkit/query";
import { api } from "@/state/api.ts";

import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    HttpLink,
} from '@apollo/client';

const client = new ApolloClient({
    link: new HttpLink({ uri: 'http://localhost:10081/graphql' }),
    cache: new InMemoryCache(),
});

export const store = configureStore({
    reducer: { [api.reducerPath]: api.reducer},
    middleware: (getDefault) => getDefault().concat(api.middleware), // for configuration
});

setupListeners(store.dispatch);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ApolloProvider client={client}>
        <Provider store={store}>
                <App/>
        </Provider>
    </ApolloProvider>
);
