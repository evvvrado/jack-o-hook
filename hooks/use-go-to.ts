export const useGoTo = (id: string) => {
	const elementID = document.querySelector(`#${id}`)
	if (!elementID) return

	const elementBounds = elementID?.getBoundingClientRect()

	return window.scrollTo(0, ((window.scrollY + elementBounds.y - 150) as number) || 0)
}
