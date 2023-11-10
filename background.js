chrome.tabs.onUpdated.addListener((tabId, tab) => {
  if (tab.url && tab.url.includes("youtube.com/watch")) {
    const queryParams = tab.url.split("?")[1];
    const urlParams = new URLSearchParams(queryParams);

    if (urlParams) {
      chrome.tabs.sendMessage(tabId, { videoId: urlParams.get("v") });
    }
  }
});
