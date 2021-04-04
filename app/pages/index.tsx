import Form from "app/core/components/Form"
import * as z from "zod"
import { BlitzPage } from "blitz"
import React, { forwardRef, PropsWithoutRef } from "react"
import { useField } from "react-final-form"
import SignupForm from "app/auth/components/SignupForm"

const InfoCard: React.FC<{ title: string; content: JSX.Element[] }> = (props) => {
  return (
    <div className="bg-white shadow-md p-2">
      <h1 className="text-xl p-2 border-b-2">{props.title}</h1>
      {props.content.map((jsx, idx) => (
        <p className="text-left p-2 px-4" key={idx}>
          {jsx}
        </p>
      ))}
    </div>
  )
}

const Code: React.FC = (props) => {
  return <code className="bg-gray-100 text-red-500 p-1 rounded-lg">{props.children}</code>
}

const Href: React.FC<{ href: string }> = (props) => {
  return (
    <>
      {" "}
      <a className="underline" href={props.href}>
        {props.children}
      </a>
    </>
  )
}

export const EmailForSchema = z.object({
  email: z.string().email(),
})

export const EmailInput = forwardRef<HTMLInputElement>((props, ref) => {
  const { input, meta } = useField("email")

  return (
    <div>
      <input {...input} ref={ref} placeholder="Email" className="text-black" />
      {meta.error && meta.touched && <span>{meta.error}</span>}
    </div>
  )
})

const EmailForm: React.FC = () => {
  return (
    <Form
      schema={EmailForSchema}
      initialValues={{ email: "" }}
      onSubmit={async (values) => {
        console.log(values)
      }}
    >
      <EmailInput />
      <button className="bg-blue-700 hover:bg-blue-800 duration-75 p-4 px-8 inline-flex m-4 cursor-pointer rounded-lg">
        Preview Lectures
      </button>
    </Form>
  )
}

const Home: BlitzPage = () => {
  return (
    <div className="bg-blue-500 flex flex-col items-center">
      <div className="max-w-3xl text-center flex flex-col p-8 pt-4">
        <div className="text-white self-end rounded-lg hover:bg-blue-400 duration-100 cursor-pointer p-2">
          Existing Users
        </div>
        <div className="text-white p-12">
          <h1 className="text-7xl p-2">TypeScript30</h1>
          <h3 className="text-4xl p-2">30 days. 30 TypeScript lessons.</h3>
          <h6 className="text-lg">
            <div className="px-24">
              Learn the intricacies of TypeScript's powerful type system using examples from top
              tier open source code projects.
            </div>
          </h6>

          <SignupForm />
        </div>

        <div className="text-black grid grid-cols-2 gap-4">
          <InfoCard
            title="What is this?"
            content={[
              <>
                Just under two hours of videos/reading material on TypeScript. We skip the boring
                bits ("this is how you declare a string") and start of around the intermediate
                level, learning about generics and the intricacies of <Code>type</Code> and{" "}
                <Code>interface</Code>.
              </>,
              <>
                We cover some advanced topics to mapped types and recusive type definitions. You'll
                even see how to implement basic algorithms, exclusively with types!
              </>,
              <>
                Each lecture will reference top tier open source projects like
                <Href href="https://github.com/microsoft/vscode">VS Code</Href>,
                <Href href="https://github.com/microsoft/vscode">React</Href> (well, the type
                definitions), and
                <Href href="https://github.com/Microsoft/TypeScript">TypeScript itself</Href>.
              </>,
            ]}
          />

          <InfoCard
            title="How do I get it?"
            content={[
              <>
                You can take the course on this platform. You'll have to sign up, but you get access
                to the lectures and articles in a beautifully crafted UI.
              </>,
              <>Alternatively, you can purchase the content via Gumroad.</>,
              <>
                Either way, you can download and keep all the content forever. You bought it and you
                own it.
              </>,
            ]}
          />
        </div>
      </div>
    </div>
  )
}

export default Home

{
  /* <section className="bg-blue-500 text-white flex justify-center">
        <div className="bg-red-400 max-w-3xl text-center flex flex-col p-8 pt-4">
          <div className="self-end p-2 bg-blue-400 rounded-md">Sign in</div>
        </div>
      </section>

      <section className="bg-blue-500 text-white flex justify-center">
        <div className="bg-red-400 max-w-3xl text-center flex flex-col p-8 pt-4">
        </div>
      </section>
    </> */
}
