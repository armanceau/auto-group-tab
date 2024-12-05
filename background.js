function organizeTabs() {
  browser.tabs.query({}).then((tabs) => {
    const groups = {};

    tabs.forEach((tab) => {
      const url = new URL(tab.url);
      const domain = url.hostname;

      if (!groups[domain]) {
        groups[domain] = [];
      }
      groups[domain].push(tab.id);
    });

    Object.keys(groups).forEach((domain) => {
      const tabIds = groups[domain];
      if (tabIds.length > 1) {
        browser.tabs.move(tabIds, { index: -1 }).then(() => {
          console.log(`Groupé les onglets pour ${domain}`);
        });
      }
    });
  });
}

browser.tabs.onUpdated.addListener(organizeTabs);