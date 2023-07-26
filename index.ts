import { useState, useEffect } from "react"

const useClipboard = () => {
	const handleCopy = (content: string, callback: () => void) => {
		navigator.clipboard.writeText(content)
		callback()
	}

	return { handleCopy }
}

const useMouse = () => {
	const [mousePos, setMousePos] = useState({
		x: 0,
		y: 0,
	})

	const handleMouseMove = (event: MouseEvent) => {
		setMousePos({ x: event.clientX, y: event.clientY })
	}

	useEffect(() => {
		window.addEventListener("mousemove", handleMouseMove)
		return () => window.removeEventListener("mousemove", handleMouseMove)
	}, [mousePos])

	return mousePos
}

const useWidth = () => {
	const [width, setWidth] = useState(0)
	const handleResize = () => setWidth(window.innerWidth)
	useEffect(() => {
		setWidth(window.innerWidth)
	}, [])
	useEffect(() => {
		window.addEventListener("resize", handleResize)
		return () => window.removeEventListener("resize", handleResize)
	}, [width])
	return width
}

const useGoTo = (id: string) => {
	const elementID = document.querySelector(`#${id}`)
	if (!elementID) return

	const elementBounds = elementID?.getBoundingClientRect()

	return window.scrollTo(0, ((window.scrollY + elementBounds.y - 150) as number) || 0)
}

export { useClipboard, useMouse, useWidth, useGoTo }
