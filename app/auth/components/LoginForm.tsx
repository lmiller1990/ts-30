import { AuthenticationError, Link, useMutation } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import login from "app/auth/mutations/login"
import { Login } from "app/auth/validations"

type LoginFormProps = {
  onSuccess?: () => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)

  return (
    <>
      <div className="flex justify-center mx-16 my-8">
        <Form
          submitText="Login"
          schema={Login}
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values) => {
            try {
              await loginMutation(values)
              props.onSuccess?.()
            } catch (error) {
              if (error instanceof AuthenticationError) {
                return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
              } else {
                return {
                  [FORM_ERROR]:
                    "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
                }
              }
            }
          }}
        >
          <LabeledTextField name="email" label="Email" placeholder="Email" />
          <LabeledTextField name="password" label="Password" placeholder="Password" type="password" />
        </Form>
      </div>

      <div className="text-black flex flex-col items-center pb-4">
        <div>
          <Link href="/forgot-password">
            <a className="underline">Forgot your password?</a>
          </Link>
        </div>
        <Link href="/signup">
          <a className="underline">
            Sign Up
          </a>
        </Link>
      </div>
    </>
  )
}

export default LoginForm
