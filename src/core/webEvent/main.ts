type CallbackType = (this: Window, ev: MessageEvent<any>) => any;

class WebEvent {
  subscribe(callback: CallbackType) {
    window.addEventListener('message', callback, false);
  }

  unsubscribe(callback: CallbackType) {
    window.removeEventListener('message', callback, false);
  }

  next(type: string, payload: any) {
    parent.postMessage({ type, payload }, '*');
  }

  filterStream(e: MessageEvent, eventType: string) {
    const eventData = e.data;

    if (eventData.type !== eventType) {
      return false;
    }

    return true;
  }
}

export const webEvent = new WebEvent();
