import { useRouter, BlitzPage } from "blitz"
import { LoginForm } from "app/auth/components/LoginForm"
import { TypeScript30 } from "app/pages"

const LoginPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <>
      <TypeScript30 href="/" />
      <div className="max-w-xl flex flex-col w-full">
        <LoginForm
          onSuccess={() => {
            const next = router.query.next ? decodeURIComponent(router.query.next as string) : "/"
            router.push(next)
          }}
        />
      </div>
    </>
  )
}

LoginPage.redirectAuthenticatedTo = "/lectures"

export default LoginPage
