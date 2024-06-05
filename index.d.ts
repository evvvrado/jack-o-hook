declare module "jack-o-hook" {
	import * as React from "react";

	type HandleCopy = (content: string, callback: () => void) => void;
	export function useCopyboard(): { handleCopy: HandleCopy };

	type GoToId = (id: string, distance?: number) => void;
	type GoToTop = () => void;
	export function useScroll(): { goToId: GoToId; goToTop: GoToTop };

	export function useScrollPosition(): [boolean, boolean];

	type MousePos = { x: number; y: number };
	export function useMouse(): MousePos;

	export function useWindowWidth(): number;

	export function useHasRendered(): boolean;

	type UseToggleStateReturn = {
		isOn: boolean;
		handleToggle: () => void;
		handleOn: () => void;
		handleOff: () => void;
	};
	export function useToggleState(initialState?: boolean): UseToggleStateReturn;

	type WindowDimensions = { width: number | undefined; height: number | undefined };
	export function useWindowDimensions(debounceDelay?: number): WindowDimensions;

	export function useLockScroll(): void;

	type IntersectionObserverOptions = IntersectionObserverInit;
	export function useIntersectionObserver(
		ref: React.RefObject<Element>,
		options: IntersectionObserverOptions
	): boolean;

	function debounce(func: Function, wait: number, immediate?: boolean): () => void;
}
