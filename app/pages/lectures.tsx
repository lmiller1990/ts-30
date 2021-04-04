import { BlitzPage, Link, useMutation, useRouter } from "blitz"
import { LecturesLayout } from "../core/layouts/LecturesLayout"
import React, { Suspense } from "react"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { LectureSlug, lecturesMap, Lecture } from 'app/core/layouts/LecturesLayout'
import logout from "app/auth/mutations/logout"

const LectureLink: React.FC<{ lecture: Lecture }> = props => {
  return (
    <Link href={`/lectures/${props.lecture.slug}`} passHref>
      <a className="underline">{props.lecture.title}</a>
    </Link>
  )
}

const Logout: React.FC = () => {
  const [logoutMutation] = useMutation(logout)
  const router = useRouter()

  return (
    <button
      className="underline"
      onClick={async () => {
        await logoutMutation()
        router.push("/")
      }}
    >
      Logout
    </button>
  )
}

const Main = () => {
  const currentUser = useCurrentUser()

  if (!currentUser) {
    return (
      <div>
        Please
        <Link href="/signup">
          <a className="button small">
            <strong>sign up</strong>
          </a>
        </Link>
        or
        <Link href="/login">
          <a className="button small">
            <strong>login</strong>
          </a>
        </Link>
      </div>
    )
  }

  return (
    <LecturesLayout>
      <div className="w-full bg-white p-4 rounded-sm shadow-lg text-xl">
        <h3 className="text-3xl pb-2">Welcome to TypeScript30!</h3>
        <p className="pb-2">
          Select a lecture on the right to get started.
        </p>
        <p className="pb-2">
          Not sure where to start? <LectureLink lecture={lecturesMap["types-and-interfaces"]} />
          {' '}and <LectureLink lecture={lecturesMap["type-inference-with-infer-keyword"]} />{' '} are popular for developers
          relatively new to TypeScript.
        </p>
        <p>
          <Logout />.
        </p>
      </div>
    </LecturesLayout>
  )
}

const Lectures: BlitzPage = () => {
  return (
    <div className="min-h-screen">
      <Suspense fallback="Loading...">
        <Main />
      </Suspense>
    </div>
  )
}

export default Lectures
