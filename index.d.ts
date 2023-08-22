declare module "jack-o-hook" {
    export interface MousePosition {
        x: number;
        y: number;
    }

    interface CopyboardHook {
        handleCopy: (content: string, callback: CopyboardCallback) => void;
    }
    
    export interface WindowWidthHook {
        (): number;
    }

    export interface LockScrollHook {
        (): void;
    }

    export interface GoToHook {
        (id: string): void;
    }

    export function useCopyboard(): CopyboardHook;
    export function useMouse(): MousePosition;
    export function useWindowWidth(): WindowWidthHook;
    export function useGoTo(): GoToHook;
    export function useLockScroll(): LockScrollHook;
}