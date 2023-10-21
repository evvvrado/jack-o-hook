import * as React from "react";

declare module "jack-o-hook" {
	type CopyboardHandler = (content: string, callback: () => void) => void;

	export function useCopyboard(): {
		handleCopy: CopyboardHandler;
	};

	export function useScroll(): {
		goToId: (id: string) => void;
		goToTop: () => void;
	};

	export function useScrollPosition(): [boolean, boolean];

	export function useMouse(): {
		x: number;
		y: number;
	};

	export function useWindowWidth(): number;

	export function useLockScroll(): void;

	export function useIntersectionObserver<T extends HTMLElement>(
		ref: React.RefObject<T>,
		options?: IntersectionObserverInit
	): boolean;
}
