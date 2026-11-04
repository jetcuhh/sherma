import { useSyncExternalStore } from 'react';

/** Accent colors layered on top of the light/dark theme. Stored per device
 * (not synced) so picking a color never touches the account settings. The
 * actual colors live in `styles/_sherma.scss`, keyed by `data-sherma-accent`. */
export enum Accent {
    VIOLET = 'violet',
    BLUE = 'blue',
    MINT = 'mint',
    CORAL = 'coral',
    SUN = 'sun',
    INK = 'ink',
}

export const DEFAULT_ACCENT = Accent.VIOLET;

/** Swatch colors for the picker. `ink` follows the current text color. */
export const ACCENT_SWATCHES: Record<Accent, string> = {
    [Accent.VIOLET]: '#6d4aff',
    [Accent.BLUE]: '#1085f2',
    [Accent.MINT]: '#1ea885',
    [Accent.CORAL]: '#f0566a',
    [Accent.SUN]: '#f5a300',
    [Accent.INK]: 'var(--text-norm)',
};

const STORAGE_KEY = 'sherma:accent';
const isAccent = (value: unknown): value is Accent => Object.values(Accent).includes(value as Accent);

const read = (): Accent => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return isAccent(stored) ? stored : DEFAULT_ACCENT;
    } catch {
        return DEFAULT_ACCENT;
    }
};

let current: Accent = read();
const listeners = new Set<() => void>();

const apply = (accent: Accent) => {
    if (typeof document === 'undefined') return;
    if (accent === DEFAULT_ACCENT) document.body.removeAttribute('data-sherma-accent');
    else document.body.setAttribute('data-sherma-accent', accent);
};

/** Applies the stored accent to the document. Call once when the app mounts. */
export const initAccent = () => apply(current);

export const setAccent = (accent: Accent) => {
    current = accent;
    try {
        localStorage.setItem(STORAGE_KEY, accent);
    } catch {
        /* storage can be unavailable: the accent still applies for this session */
    }
    apply(accent);
    listeners.forEach((listener) => listener());
};

const subscribe = (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
};

export const useAccent = (): [Accent, (accent: Accent) => void] => {
    const accent = useSyncExternalStore(subscribe, () => current, () => DEFAULT_ACCENT);
    return [accent, setAccent];
};
