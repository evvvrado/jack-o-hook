const useClipboard = () => {
	const handleCopy = (content: string, callback: () => void) => {
		navigator.clipboard.writeText(content)
		callback()
	}

	return { handleCopy }
}

export default useClipboard
