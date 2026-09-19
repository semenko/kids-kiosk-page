# Kids' Launchpad

A small, cheerful Chromebook homepage with quick links to educational apps and games. It is plain HTML, CSS, and JavaScript—there is no build step, no analytics, and no external site assets.

The header shows current weather for ZIP code 53217 using the keyless Open-Meteo API. The coordinates are fixed in `script.js`; the site never requests the child's location. If the weather request fails, the rest of the launchpad continues to work normally.

## Run locally

Open `index.html` directly, or serve the directory locally:

```sh
python3 -m http.server 8000
```

Then visit <http://localhost:8000>.

## Customize

Each tile is an `<a>` element in `index.html`, so destinations and labels are easy to change. Colors and layout live in `styles.css`.

The Epic and Stardew Valley tiles include Android launch choices:

- **Open app** uses the verified Android package `com.getepic.Epic` and falls back to Epic's website when supported by the browser.
- **Use website** always opens the web reader.
- Stardew Valley's **Open app** action uses the verified `com.chucklefish.stardewvalley` package and falls back to its Google Play listing.

ChromeOS may open ordinary supported links in an installed Android app if **Settings → Apps → Manage your apps → [app] → Opening supported links** is enabled. Android intent URLs are not consistent across Chromebook models and managed-school policies, so the web option remains visible.

DreamBox does not currently list an official Android app. Its tile uses the supported web experience instead.

## Deploy with GitHub Pages

1. Push this repository to GitHub.
2. In **Settings → Pages**, choose **Deploy from a branch**.
3. Select the `main` branch and `/ (root)` folder.
4. The included `CNAME` points Pages at `kids.semenkovich.com`. Add a DNS `CNAME` record for `kids` pointing to `<your-github-username>.github.io`.

## Deploy with Cloudflare Pages

1. In Cloudflare, create a Pages project and connect this repository.
2. Select **None** as the framework preset. Leave the build command blank and set the output directory to `.`.
3. Add `kids.semenkovich.com` under **Custom domains**. Cloudflare will configure DNS if the domain already uses Cloudflare DNS.

## Chromebook setup

In Chrome, open the deployed site, then choose **Settings → On startup → Open a specific page or set of pages** and add the site URL. You can also use Chrome's install/create-shortcut option to put Launchpad in the Chromebook launcher.
