import { forwardRef, PropsWithoutRef } from "react"
import { useField } from "react-final-form"

export interface LabeledTextFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: "text" | "password" | "email" | "number"
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
}

export const LabeledTextField = forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  ({ name, label, outerProps, ...props }, ref) => {
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField(name, {
      parse: props.type === "number" ? Number : undefined,
    })

    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError

    return (
      <div {...outerProps} className="text-black">
        <div
          role="alert"
          className="py-1 text-red-500 text-right text-xs h-5 flex items-center justify-end"
        >
          {touched && normalizedError}
        </div>
        <input
          className="w-full p-2 border-black border"
          {...input}
          {...props}
          disabled={submitting}
          ref={ref}
        />
      </div>
    )
  }
)

export default LabeledTextField
