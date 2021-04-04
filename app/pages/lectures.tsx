import { BlitzPage, Link } from "blitz"
import { LecturesLayout } from "../core/layouts/LecturesLayout"
import { Suspense } from "react"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"

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
      Blah 
    </LecturesLayout>
  )
}

const Lectures: BlitzPage = () => {
  return (
    <div className="container">
      <Suspense fallback="Loading...">
        <Main />
      </Suspense>
    </div>
  )
}

export default Lectures
