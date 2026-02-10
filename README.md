
# Work Location Prompt (Genesys Cloud Client App)

**Purpose:** Prompt agents to select **Home** or **Office** on login and/or when attempting to go **On Queue**. The choice is saved into the user profile attribute `attributes.workLocation`.

---

## What this app does
- Loads inside **Genesys Cloud Agent Desktop** as a **Client App Integration**.
- If `attributes.workLocation` is missing, shows a **modal** with two buttons: **Working from Office** / **Working from Home**.
- Saves the selection to the user via `PATCH /api/v2/users/{id}`.
- Subscribes to the user’s **routing status**; if the user tries to go **On Queue** without selecting, it will re-open the modal and can optionally **force OFF_QUEUE** (configurable).

> This solution uses the Genesys Cloud JavaScript SDK and Notifications API.

---

## Files
- `index.html` – Main app page (UI + logic)
- `config.js` – Configuration (region, OAuth Client ID, redirect URI, enforcement flag)
- `README.md` – This guide

---

## Prerequisites
- Genesys Cloud region (e.g., `euw2.pure.cloud`, `mypurecloud.ie`, etc.)
- **OAuth Client** in Genesys Cloud (Admin → Integrations → OAuth)
  - Grant type: **Implicit** (simple) or **Auth Code (PKCE)** (preferred by some orgs)
  - Add a **Redirect URI** that matches where you will host `index.html`
  - Ensure permissions (via role mapping, if enforced) allow:
    - `directory:user:view`
    - `directory:user:edit` (to update attributes)
    - `routing:status:view`
    - `routing:status:edit` *(only if you want to force OFF_QUEUE)*
    - `notifications:channel:view`
- **Client App Integration** (Admin → Integrations → Client Applications)
  - Type: **Client Application**
  - URL: the hosted location of `index.html` (HTTPS)
  - Visibility: **Agent Desktop** (pin for auto-load)

---

## Configure
1. Open `config.js` and set:
   - `region`: e.g., `'euw2.pure.cloud'`
   - `oauthClientId`: your OAuth Client ID
   - `redirectUri`: URL where `index.html` is hosted (must be registered on the OAuth client)
   - `enforceOffQueue`: set to `true` (default) to force OFF_QUEUE until selection is made

2. Host the files on an HTTPS web server reachable by agents (e.g., internal web, Azure Static Web Apps, S3/CloudFront).

3. Create a **Client App Integration** pointing to your hosted `index.html`.

---

## Notes
- If your Client App container injects authentication, you can leave `oauthClientId` blank and remove the `authorizeImplicitGrant` call, depending on your environment.
- You can change the attribute key by editing the `patchUser` call in `index.html`.
- If you do **not** want to force OFF_QUEUE, set `enforceOffQueue` to `false` in `config.js`.

---

## Troubleshooting
- **Blank screen / auth error**: Ensure the OAuth client has the correct **Redirect URI** and that the region in `config.js` matches your tenant (e.g., `euw2.pure.cloud`).
- **403 / Forbidden** when saving attribute: Verify the OAuth client/role mapping allows `directory:user:edit`.
- **Popup not showing**: Confirm `attributes.workLocation` is not already set on the user and that the Client App is pinned/visible.

---

## Security
- Always host over **HTTPS**.
- Restrict who can access the app URL if possible.
- Limit OAuth scopes/roles to the minimum required.

---

## License
This sample is provided "as-is" without warranty of any kind. Use at your own risk.
