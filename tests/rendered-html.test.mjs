import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the IntelliBucket home page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>IntelliBucket — Small software, sharply made<\/title>/i);
  assert.match(html, /Small software\./);
  assert.match(html, /Always Awake/);
  assert.match(html, /YMessage/);
  assert.match(html, /application\/ld\+json/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("server-renders product and legal routes", async () => {
  const [productResponse, privacyResponse, termsResponse] = await Promise.all([
    render("/alwaysawake"),
    render("/alwaysawake/privacy"),
    render("/alwaysawake/terms"),
  ]);

  for (const response of [productResponse, privacyResponse, termsResponse]) {
    assert.equal(response.status, 200);
  }

  const productHtml = await productResponse.text();
  assert.match(productHtml, /Your screen stays on\. You stay in flow\./);
  assert.match(productHtml, /Inside the app/);
  assert.match(productHtml, /always_awake\/screenshots\/home_on\.jpeg/);
  assert.match(productHtml, /always_awake\/screenshots\/settings_dark\.jpeg/);
  assert.match(await privacyResponse.text(), /Privacy policy/);
  assert.match(await termsResponse.text(), /Terms &amp; conditions/);
});
