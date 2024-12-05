chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete") {
      groupTabsByDomain();
    }
  });
  
  chrome.tabs.onCreated.addListener(() => {
    groupTabsByDomain();
  });
  
  async function groupTabsByDomain() {
    const tabs = await chrome.tabs.query({}); 
    const groups = {};
  
    tabs.forEach((tab) => {
      const url = new URL(tab.url);
      const domain = url.hostname;
  
      if (!groups[domain]) {
        groups[domain] = [];
      }
      groups[domain].push(tab.id);
    });
    
    for (const domain in groups) {
      await chrome.tabs.group({ tabIds: groups[domain] });
    }
  }
  