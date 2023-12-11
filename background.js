async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

const getVidId = async () => {
  const tab = await getCurrentTab();
  if (tab.url && tab.url.includes("youtube.com/watch")) {
    const queryParams = tab.url.split("?")[1];
    const urlParams = new URLSearchParams(queryParams);
    return urlParams.get("v");
  }
  return null;
}

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo) => {
  if (changeInfo.status === "complete") {
    const vidId = await getVidId();
    if (vidId) {
      await chrome.tabs.sendMessage(tabId, { videoId: vidId })
    }
  }
});

chrome.tabs.onCreated.addListener(async (tab) => {
  // if (checkbox.checked) {
  const vidId = await getVidId();
  if (vidId) {
    await chrome.tabs.sendMessage(tab.id, { videoId: vidId })
    // }
  }
})
