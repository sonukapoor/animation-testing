import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const openCloseAnimation = trigger('openClose', [
  state(
    'open',
    style({
      height: '200px',
      opacity: 1,
      backgroundColor: 'yellow',
    })
  ),
  state(
    'closed',
    style({
      height: '100px',
      opacity: 0.8,
      backgroundColor: 'blue',
    })
  ),
  transition('open => closed', [animate('1s')]),
  transition('closed => open', [animate('0.5s')]),
  transition('* => closed', [animate('1s')]),
  transition('* => open', [animate('0.5s')]),
  transition('open <=> closed', [animate('0.5s')]),
  transition('* => open', [animate('1s', style({ opacity: '*' }))]),
  transition('* => *', [animate('5000s')]),
]);

