const mapping = {
  'house.fill': 'home', 'map.fill': 'map', 'wallet.pass.fill': 'account-balance-wallet',
  'person.2.fill': 'people', 'gearshape.fill': 'settings', 'paperplane.fill': 'send',
  'plus': 'add', 'plus.circle.fill': 'add-circle', 'chevron.left': 'chevron-left',
  'chevron.right': 'chevron-right', 'xmark': 'close', 'xmark.circle.fill': 'cancel',
  'checkmark': 'check', 'checkmark.circle.fill': 'check-circle', 'arrow.right': 'arrow-forward',
  'arrow.left': 'arrow-back', 'airplane': 'flight', 'bed.double.fill': 'hotel',
  'camera.fill': 'photo-camera', 'location.fill': 'location-on', 'location.north.fill': 'navigation',
  'globe': 'language', 'star.fill': 'star', 'heart.fill': 'favorite', 'heart': 'favorite-border',
  'clock.fill': 'schedule', 'calendar': 'calendar-today', 'tag.fill': 'local-offer',
  'message.fill': 'message', 'bubble.left.fill': 'chat', 'bell.fill': 'notifications',
  'bell': 'notifications-none', 'magnifyingglass': 'search', 'person.fill': 'person',
  'person.crop.circle.fill': 'account-circle', 'shield.fill': 'security', 'lock.fill': 'lock',
  'info.circle.fill': 'info', 'dollarsign.circle.fill': 'monetization-on', 'creditcard.fill': 'credit-card',
  'square.and.arrow.up': 'share', 'trash': 'delete', 'pencil': 'edit', 'doc.fill': 'description',
  'ellipsis': 'more-horiz', 'phone.fill': 'phone', 'envelope.fill': 'email',
  'slider.horizontal.3': 'tune', 'arrow.left.arrow.right': 'swap-horiz',
  'bookmark.fill': 'bookmark', 'map': 'map', 'arrow.left.arrow.right': 'swap-horiz',
};
const used = [
  'bell.fill','magnifyingglass','slider.horizontal.3','arrow.right','person.2.fill',
  'info.circle.fill','xmark.circle.fill','star.fill','location.fill','heart','bubble.left.fill',
  'square.and.arrow.up','calendar','plus','gearshape.fill','camera.fill','chevron.right','arrow.left',
  'person.fill','lock.fill','checkmark.circle.fill','chevron.left','checkmark','airplane','clock.fill',
  'location.north.fill','ellipsis','xmark','phone.fill','trash','paperplane.fill','pencil',
  'plus.circle.fill','map.fill','arrow.left.arrow.right','bookmark.fill','house.fill','wallet.pass.fill',
  'globe','person.crop.circle.fill'
];
const missing = used.filter(u => !mapping[u]);
console.log('Missing icons:', missing.length > 0 ? missing.join(', ') : 'None - all good!');
