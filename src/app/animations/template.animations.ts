import {trigger, sequence, state, animate, transition, style} from '@angular/animations';

export const signatureUpdateAnimation =
    trigger('signatureUpdateAnimation', [
        transition('void => *', [
            style({ backgroundColor: 'lightGreen',  opacity: '0.2' }),
            sequence([
                animate('0.7s ease-in-out', style({ backgroundColor: 'transparent', opacity: '1' }))
            ])
        ])
    ]);
