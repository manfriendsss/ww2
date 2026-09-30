export function isFullscreenActive(): boolean {
  const doc = document as any;
  return !!(
    doc.fullscreenElement ||
    doc.mozFullScreenElement ||
    doc.webkitFullscreenElement ||
    doc.msFullscreenElement
  );
}

export function isFullscreenSupported(): boolean {
  const doc = document as any;
  const element = document.documentElement as any;

  const hasEnabledFlag =
    'fullscreenEnabled' in doc ||
    'webkitFullscreenEnabled' in doc ||
    'mozFullScreenEnabled' in doc ||
    'msFullscreenEnabled' in doc;

  const enabledByPolicy = !!(
    doc.fullscreenEnabled ||
    doc.webkitFullscreenEnabled ||
    doc.mozFullScreenEnabled ||
    doc.msFullscreenEnabled
  );

  if (hasEnabledFlag) {
    return enabledByPolicy;
  }

  return !!(
    element.requestFullscreen ||
    element.webkitRequestFullscreen ||
    element.mozRequestFullScreen ||
    element.msRequestFullscreen
  );
}

export function toggleFullscreen(targetElement?: HTMLElement | null): Promise<void> {
  const doc = document as any;
  const element = (targetElement || document.documentElement) as any;

  if (!isFullscreenActive()) {
    if (element.requestFullscreen) {
      return element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      return element.webkitRequestFullscreen();
    } else if (element.mozRequestFullScreen) {
      return element.mozRequestFullScreen();
    } else if (element.msRequestFullscreen) {
      return element.msRequestFullscreen();
    }
  } else {
    if (doc.exitFullscreen) {
      return doc.exitFullscreen();
    } else if (doc.webkitExitFullscreen) {
      return doc.webkitExitFullscreen();
    } else if (doc.mozCancelFullScreen) {
      return doc.mozCancelFullScreen();
    } else if (doc.msExitFullscreen) {
      return doc.msExitFullscreen();
    }
  }
  return Promise.resolve();
}
