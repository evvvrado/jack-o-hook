import { ChangeEvent, FormEvent, useCallback, useState, useEffect } from "react"
type Field = {
	type: string
	value?: string
	defaultValue?: string
}

type RequiredField = Required<Field>

export type FormFields = {
	[field: string]: Field
}
export type RequiredFormFields = { [field: string]: RequiredField }

function getEnvironment() {
	const isDOM =
		typeof window !== "undefined" && window.document && window.document.documentElement

	return isDOM ? "browser" : "server"
}

const useCopyboard = () => {
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

const useWindowWidth = () => {
	const [width, setWidth] = useState(0)
	const handleResize = () => setWidth(window.innerWidth)

	useEffect(() => {
		handleResize()
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

const useFastForm = () => {
	const [fields] = useState<FormFields>({})

	const handleSubmit = (
		e: FormEvent<HTMLFormElement>,
		callback: (data: RequiredFormFields) => void
	) => {
		e.preventDefault()
		callback(fields as RequiredFormFields)
	}

	const register = useCallback(
		({
			field: fieldName,
			type,
			defaultValue,
			onChange: onChangeCallback,
		}: Field & {
			field: string
			onChange?: ({ fieldName, fields }: { fieldName?: string; fields?: FormFields }) => void
		}) => {
			if (!fields[fieldName]) {
				const field = {
					value: defaultValue || "",
					type,
				}

				fields[fieldName] = {
					...field,
				}
			}

			const onChange = (e: ChangeEvent<HTMLInputElement>) => {
				if (!fields) throw new Error("Something's wrong with the register")

				fields[fieldName].value =
					e.target.value == "" ? fields[fieldName].value : e.target.value

				if (onChangeCallback) return onChangeCallback({ fieldName, fields })
			}

			const props = {
				type: fields[fieldName].type,
				defaultValue: fields[fieldName].value,
				onChange,
			}

			return props
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	)

	return { handleSubmit, register, fields }
}

const useLockScroll = () => {
	useEffect(() => {
		const initialStyle = window.getComputedStyle(document.body).overflow
		document.body.style.overflow = "hidden"

		return () => {
			document.body.style.overflow = initialStyle
		}
	}, [])
}

export { useCopyboard, useMouse, useWindowWidth, useGoTo, useFastForm, useLockScroll }
