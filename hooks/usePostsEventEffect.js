import {useEffect} from 'react';
import events from '../lib/events';

export default function usePostsEventEffect({
  refresh,
  removePost,
  updatePost,
  enabled,
}) {
  useEffect(() => {
    if (!enabled) {
      return;
    }
    events.addListener('refresh', refresh);
    events.addListener('removePost', removePost);
    events.addListener('updatePost', updatePost);
    return () => {
      events.removeListener('refresh', refresh);
      events.addListener('removePost', removePost);
      events.addListener('updatePost', updatePost);
    };
  }, [refresh, removePost, updatePost, enabled]);
}
