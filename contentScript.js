const chromeRuntime = () => {
  chrome.runtime.onMessage.addListener((message, sender, response) => {
    const { videoId } = message;
    const replaceVideo = async () => {
      const muteBtn = document.querySelector('[data-title-no-tooltip="Mute"]');
      const videoContainer = document.getElementsByClassName("ytd-player")[0];
      const defaultVid = document.getElementsByClassName("html5-video-player")[0];
      const embedSource = `https://www.youtube.com/embed/${videoId}`
      const embedVid = `<iframe class="embed-vid" src=${embedSource} frameborder="0"></iframe>`
      if (muteBtn) {
        muteBtn.click();
      }
      defaultVid.classList.add("rm-player");
      videoContainer.innerHTML = embedVid;
    }

    replaceVideo();
  })
}
chromeRuntime();