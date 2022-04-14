import createCache from '@emotion/cache';

// prepend: true moves MUI styles to the top of the <head> so they're loaded first.
// It allows developers to easily override MUI styles with other styling solutions, like CSS modules.
export default function createEmotionCache(nonceServerValue = '') {
    let nonceValue;
    if (typeof window !== "undefined") nonceValue = document.head.querySelector("[property~=csp-nonce][content]").content;
    else if (nonceServerValue !== "") nonceValue = nonceServerValue
    return createCache({ key: 'css', prepend: true, nonce: nonceValue });
}