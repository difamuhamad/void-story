self.addEventListener("push", (event) => {
  console.log("Service worker pushing...");

  async function chainPromise() {
    await self.registration.showNotification("New report for you!", {
      body: "There are crash incident in the raffic light on Melati Street",
    });
  }

  async function chainPromise() {
    const data = await event.data.json();
    await self.registration.showNotification(data.title, {
      body: data.options.body,
    });
  }

  event.waitUntil(chainPromise());
});
