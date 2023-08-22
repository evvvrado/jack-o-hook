import * as React from "react"

function getEnvironment() {
	const isDOM =
		typeof window !== "undefined" && window.document && window.document.documentElement

	return isDOM ? "browser" : "server"
}

const useCopyboard = () => {
	const handleCopy = React.useCallback((content, callback) => {
		navigator.clipboard.writeText(content)
		callback()
	})

	return { handleCopy }
}


const useScroll = () => {
	const goToId = React.useCallback((id) => {
		const elementID = document.querySelector(`#${id}`)
		if (!elementID) return

		const elementBounds = elementID?.getBoundingClientRect()
		return window.scrollTo(0, (window.scrollY + elementBounds.y - 150) || 0)
	}, [])

	const goToTop = React.useCallback(() => {
		return window.scrollTo(0)
	}, [])


	return { goToId, goToTop }
}

const useMouse = () => {
	const [mousePos, setMousePos] = React.useState({
		x: 0,
		y: 0,
	})

	const handleMouseMove = (event) => {
		setMousePos({ x: event.clientX, y: event.clientY })
	}

	useEffect(() => {
		window.addEventListener("mousemove", handleMouseMove)
		return () => window.removeEventListener("mousemove", handleMouseMove)
	}, [mousePos])

	return mousePos
}

const useWindowWidth = () => {
	const [width, setWidth] = React.useState(0)
	const handleResize = () => setWidth(window.innerWidth)

	React.useEffect(() => {
		handleResize()
	}, [])

	React.useEffect(() => {
		window.addEventListener("resize", handleResize)
		return () => window.removeEventListener("resize", handleResize)
	}, [width])

	return width
}

const useLockScroll = () => {
	React.useEffect(() => {
		const initialStyle = window.getComputedStyle(document.body).overflow
		document.body.style.overflow = "hidden"

		return () => {
			document.body.style.overflow = initialStyle
		}
	}, [])
}

const useIntersectionObserver = (ref, options) => {
	const [isIntersecting, setIsIntersecting] = React.useState(false);

	React.useEffect(() => {
		const observer = new IntersectionObserver(([entry]) => {
			setIsIntersecting(entry.isIntersecting);
		}, options);

		if (ref.current) {
			observer.observe(ref.current);
		}

		return () => {
			observer.unobserve(ref.current);
		};
	}, [ref]);

	return isIntersecting;
};

export { useCopyboard, useMouse, useScroll, useWindowWidth, useLockScroll, useIntersectionObserver }
