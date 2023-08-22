declare module "jack-o-hook" {
    export interface MousePosition {
        x: number;
        y: number;
    }

    export interface CopyboardHook {
        handleCopy: (content: string, callback: () => void) => void;
    }

    export interface WindowWidthHook {
        (): number;
    }

    export interface GoToHook {
        (id: string): void;
    }

    export interface LockScrollHook {
        (): void;
    }

    export function useCopyboard(): CopyboardHook;
    export function useMouse(): MousePosition;
    export function useWindowWidth(): WindowWidthHook;
    export function useGoTo(): GoToHook;
    export function useLockScroll(): LockScrollHook;
}