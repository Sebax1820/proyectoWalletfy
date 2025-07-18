import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'

import * as TanstackQuery from './integrations/tanstack-query/root-provider.tsx'

import * as Mantine from './integrations/mantine/root-provider.tsx'

// Import the generated route tree
import { routeTree } from './routeTree.gen'

import './styles.css'
import '@mantine/core/styles.css'
import '@mantine/dates/styles.css';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

import reportWebVitals from './reportWebVitals.ts'

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    ...TanstackQuery.getContext(),
  },
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Render the app
const rootElement = document.getElementById('app')
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <Mantine.Provider>
        <TanstackQuery.Provider>
          <RouterProvider router={router} />
        </TanstackQuery.Provider>
      </Mantine.Provider>
    </StrictMode>,
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
