import { AngularAppEngine, createRequestHandler } from '@angular/ssr';

// Create the SSR engine (non-Node variant)
const angularApp = new AngularAppEngine();

/**
 * Request handler used by the Angular CLI (dev-server and during build).
 * Angular CLI expects this `reqHandler` export.
 */
export const reqHandler = createRequestHandler(async (req: Request) => {
  // Use the correct API: `handle`, NOT `render`
  const res = await angularApp.handle(req);

  // If Angular didn’t generate a response, fall back to a 404
  return res ?? new Response('Not found', { status: 404 });
});
