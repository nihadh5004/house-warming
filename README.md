# White Aura housewarming invitation

React 18 and Vite, with plain CSS and no additional runtime dependencies.

```sh
npm install
npm run dev
npm run build
npm run preview
```

All event details live in `src/data/invitation.js`. The event starts at 17 December 2026, 5 PM Indian Standard Time; the explicit `+05:30` offset keeps the countdown correct in every guest's timezone.

Configuration:

- `mapsUrl` uses the exact Google Maps location supplied by the hosts.
- `mapsEmbedUrl` displays a restrained, monochrome map at the supplied coordinates. Set it to an empty string to hide the map.
- `websiteUrl` optionally overrides the current page URL when sharing. Once deployed, the current public URL works automatically.
- In `index.html`, set the `og:image` and `twitter:image` URLs to absolute URLs on the final public domain for reliable social preview support. An old, unrelated canonical domain has been removed.

The hero, architectural showcase, and social-sharing metadata all use the uploaded `public/housewarming-preview.jpeg`. No stock house or interior imagery is displayed. The current design follows a modern architectural editorial direction: off-white and stone surfaces, charcoal typography, sage accents, a 12-column grid, and full-width photography.

Background audio plays automatically on a loop without visible controls. If a browser blocks audible autoplay, playback starts on the first tap or key press. Sticky navigation and buttons support keyboard use. Scroll reveals and initial image reveals respect reduced motion. The location section shows the confirmed location map and directions link; WhatsApp invitations include the same exact location link.

This project has no configured lint script. Production validation uses `npm run build`.

For browser verification, start the dev server and run `node scripts/verify-browser.mjs` with Chrome installed. Set `CHROME_PATH` if needed. This checks five viewport widths, mobile touch targets and readability, image loading, navigation, removal of RSVP and numbered labels, WhatsApp URLs, countdown ticking, timezone independence, completed events, and reduced motion. Screenshots are saved in the ignored `artifacts/` directory.
