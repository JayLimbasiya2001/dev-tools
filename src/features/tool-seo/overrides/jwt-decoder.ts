import type { ToolPageContent } from '../types';

export const jwtDecoderContent: ToolPageContent = {
  heroHighlights: [
    'Decode header and payload instantly',
    'Inspect claims without server round-trips',
    'Base64URL decoding in the browser',
    'Never validates secrets — decode only',
  ],
  whatIsParagraphs: [
    'JSON Web Tokens (JWTs) are compact, URL-safe tokens used for authentication and authorization in OAuth 2.0, OpenID Connect, and countless custom API designs. A JWT encodes three Base64URL segments separated by dots: header, payload, and signature.',
    'The header typically declares the signing algorithm (such as HS256 or RS256) and token type. The payload contains claims — statements about the subject, expiration (exp), issuer (iss), audience (aud), and custom application data. The signature verifies that the token was not tampered with after issuance.',
    'Decoding is not decryption. JWT payloads are only Base64URL-encoded, not encrypted. Anyone with the token string can read the payload unless you use JWE (encrypted JWT). Never store passwords, credit card numbers, or PII in JWT payloads.',
    'Developers decode JWTs constantly: debugging login flows, verifying clock skew on exp claims, inspecting scopes in microservices, and troubleshooting API gateway rejections. Velomint decodes locally so tokens from staging and production never leave your machine.',
    'This tool does not verify signatures. Signature verification requires the issuer\'s secret or public key and must happen on your server. Use decoded output for inspection only — never trust payload claims without cryptographic verification in your backend.',
    'Understanding JWT structure is essential for secure API design. Misconfigured exp times, weak HS256 secrets, and algorithm confusion attacks (accepting "none" or HS256 when RS256 was intended) remain common vulnerability classes in production systems.',
  ],
  howToSteps: [
    { step: 1, title: 'Obtain the JWT string', description: 'Copy from Authorization header, cookie, localStorage, or OAuth response. Include all three dot-separated segments.' },
    { step: 2, title: 'Paste into the decoder', description: 'Paste the full token. Partial segments will not decode correctly.' },
    { step: 3, title: 'Read the header', description: 'Confirm alg and typ. Unexpected algorithms may indicate attacks or misconfiguration.' },
    { step: 4, title: 'Inspect payload claims', description: 'Check exp, nbf, iat, iss, aud, and custom claims against your application expectations.' },
    { step: 5, title: 'Verify on the server', description: 'Use your framework\'s JWT library with the correct key to validate signature and claims.' },
    { step: 6, title: 'Rotate if compromised', description: 'If a token leaked, revoke sessions and rotate signing keys per your security playbook.' },
  ],
  examples: [
    {
      title: 'Typical access token structure',
      input: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0In0.signature',
      explanation: 'Header shows HS256; payload sub claim identifies the user. Signature must match server secret.',
    },
    {
      title: 'Expired token debugging',
      explanation: 'Decode and compare exp (Unix timestamp) with current time. Clock skew beyond leeway causes 401 errors.',
    },
    {
      title: 'OIDC id_token',
      explanation: 'OpenID tokens add claims like email, name, and nonce — decode to verify identity provider data.',
    },
  ],
  useCases: [
    'Debugging OAuth login and refresh token flows',
    'Inspecting API gateway and Lambda authorizer rejections',
    'Verifying custom claims in multi-tenant SaaS apps',
    'Security reviews and penetration test reporting',
    'Teaching JWT workshops without installing CLI tools',
    'Comparing staging vs production token lifetimes',
  ],
  faqs: [
    { question: 'Can this tool verify JWT signatures?', answer: 'No. Verification requires your server secret or public key. This tool only decodes Base64URL segments.' },
    { question: 'Is it safe to paste production JWTs here?', answer: 'Processing is local in your browser, but treat tokens as secrets. Prefer decoding dev tokens or redact sensitive claims.' },
    { question: 'What is Base64URL?', answer: 'A URL-safe variant of Base64 using - and _ instead of + and /, with optional padding stripped.' },
    { question: 'Why does my token show invalid structure?', answer: 'JWTs need exactly two dots separating three segments. Bearer prefix should be removed before pasting.' },
    { question: 'What does alg:none mean?', answer: 'Unsigned tokens. Servers must reject none algorithm in production to prevent forgery.' },
    { question: 'How do I check expiration?', answer: 'Read the exp claim as Unix seconds. Compare with current UTC time.' },
    { question: 'Difference between JWT and JWE?', answer: 'JWE encrypts content. This decoder handles signed JWT (JWS) with readable payloads only.' },
    { question: 'Can I decode refresh tokens?', answer: 'Yes, if they are JWT-formatted. Opaque refresh tokens cannot be decoded this way.' },
    { question: 'What is the difference from jwt.io?', answer: 'Velomint runs entirely in-browser with no account, integrated with related auth tools on the same platform.' },
    { question: 'Should I store user roles in JWT?', answer: 'Keep payloads small. Large role lists bloat headers. Consider reference tokens or server-side session stores.' },
  ],
  developerTips: [
    'Always validate iss and aud on the server to prevent cross-service token replay.',
    'Prefer RS256 with key rotation over long-lived HS256 secrets shared across services.',
    'Keep access token TTL short (5–15 minutes) and use refresh tokens for renewal.',
    'Log decoded claim keys in dev only — never log full tokens in production.',
  ],
  commonMistakes: [
    { mistake: 'Trusting decoded payload without signature check', fix: 'Always verify with your auth library before acting on claims.' },
    { mistake: 'Storing sensitive data in payload', fix: 'JWTs are readable by clients — store only identifiers and permissions.' },
    { mistake: 'Ignoring exp and nbf leeway', fix: 'Configure clock tolerance in your JWT middleware.' },
  ],
  benefits: [
    'Instant visibility into auth token structure',
    'No server upload — privacy-preserving local decode',
    'Pairs with Base64 and Hash tools for full auth debugging',
    'Educational content for secure JWT implementation',
  ],
};
