import * as React from "react";

const useCopyboard = () => {
	const handleCopy = React.useCallback((content, callback) => {
		navigator.clipboard.writeText(content);
		callback();
	}, []);

	return { handleCopy };
};

const useScroll = () => {
	const goToId = React.useCallback((id, distance = 150) => {
		const elementID = document.querySelector(`#${id}`);
		if (!elementID) return;

		const elementBounds = elementID?.getBoundingClientRect();
		return window.scrollTo(0, window.scrollY + elementBounds.y - distance || 0);
	}, []);

	const goToTop = React.useCallback(() => {
		return window.scrollTo(0, 0);
	}, []);

	return { goToId, goToTop };
};

const useScrollPosition = () => {
	const [isScrolling, setIsScrolling] = React.useState(false);
	const [isOnTop, setIsOnTop] = React.useState(false);

	React.useEffect(() => {
		let offSet = 0;

		const scrollCheck = () => {
			if (window) {
				if (offSet > window.scrollY || window.scrollY === 0) {
					setIsOnTop(false);
					setIsScrolling(true);
				} else {
					setIsOnTop(true);
					setIsScrolling(false);
				}

				offSet = window.scrollY;
				offSet === 0 ? setIsScrolling(false) : setIsScrolling(true);
			}
		};

		scrollCheck();
		window.addEventListener("scroll", scrollCheck);

		return () => window.removeEventListener("scroll", scrollCheck);
	}, []);

	return [isScrolling, isOnTop];
};

const useMouse = () => {
	const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });

	const handleMouseMove = (event) => {
		setMousePos({ x: event.clientX, y: event.clientY });
	};

	React.useEffect(() => {
		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, []);

	return mousePos;
};

const useWindowWidth = () => {
	const [width, setWidth] = React.useState(0);
	const handleResize = () => setWidth(window ? window.innerWidth : 0);

	React.useEffect(() => {
		handleResize();
	}, []);

	React.useEffect(() => {
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return width;
};

const useHasRendered = () => {
	const [hasRendered, setHasRendered] = React.useState(false);

	React.useEffect(() => {
		setHasRendered(true);
	}, []);

	return hasRendered;
};

const useToggleState = (initialState = false) => {
	const [isOn, setIsOn] = React.useState(initialState);

	const handleOn = React.useCallback(() => {
		setIsOn(true);
	}, []);

	const handleOff = React.useCallback(() => {
		setIsOn(false);
	}, []);

	const handleToggle = React.useCallback(() => {
		setIsOn((p) => !p);
	}, []);

	return { isOn, handleToggle, handleOn, handleOff };
};

const useWindowDimensions = (debounceDelay = 500) => {
	const [width, setWidth] = React.useState();
	const [height, setHeight] = React.useState();

	React.useEffect(() => {
		const onWindowResize = debounce(
			() => {
				setWidth(Math.min(window.innerWidth, document.documentElement.clientWidth));
				setHeight(Math.min(window.innerHeight, document.documentElement.clientHeight));
			},
			debounceDelay,
			true
		);

		window.addEventListener("resize", onWindowResize, false);
		onWindowResize();

		return () => window.removeEventListener("resize", onWindowResize, false);
	}, [debounceDelay]);

	return { width, height };
};

const useLockScroll = () => {
	React.useEffect(() => {
		const initialStyle = window.getComputedStyle(document.body).overflow;
		document.body.style.overflow = "hidden";

		return () => {
			document.body.style.overflow = initialStyle;
		};
	}, []);
};

const useIntersectionObserver = (ref, options) => {
	const [isIntersecting, setIsIntersecting] = React.useState(false);

	React.useEffect(() => {
		const currentRef = ref.current;

		if (!currentRef) return;

		const observer = new IntersectionObserver(([entry]) => {
			setIsIntersecting(entry.isIntersecting);
		}, options);

		observer.observe(currentRef);

		return () => {
			if (currentRef) {
				observer.unobserve(currentRef);
			}
		};
	}, [ref, options]);

	return isIntersecting;
};

export {
	useCopyboard,
	useMouse,
	useScroll,
	useHasRendered,
	useScrollPosition,
	useWindowWidth,
	useWindowDimensions,
	useLockScroll,
	useIntersectionObserver,
	useToggleState,
};
