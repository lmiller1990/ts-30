import { ReactNode } from "react"
import cs from 'classnames'
import { Head, Link, useParam } from "blitz"
import { TypeScript30 } from "app/pages"
import typesAndInterfaces from 'app/articles/types-and-interfaces'

interface LayoutProps {
  title?: string
  children: ReactNode
}

export interface Lecture {
  title: string
  slug: string
  html: string
}

export type LectureSlug = "types-and-interfaces" | "type-inference-with-infer-keyword"

export const lecturesMap: Record<LectureSlug, Lecture> = {
  "types-and-interfaces": {
    title: "Interfaces and Types",
    slug: "types-and-interfaces",
    html: typesAndInterfaces
  },
  "type-inference-with-infer-keyword": {
    title: "Type Inference with the infer keyword",
    slug: "type-inference-with-infer-keyword",
    html: 'ok'
  },
  // "generics": {
  //   title: "Generics",
  //   slug: "generics"
  // },
  // "Map/Recursive types": {
  //   title: "Map and Recursive types",
  //   slug: "map-and-recusive-types"
  // },
  // "literal-types-and-the-const-keywords": {
  //   title: "Literal Types and the const Keyword",
  //   slug: "literal-types-and-the-const-keywords"
  // },
  // "Function overloads",
  // "Utility types",
  // "namespace and module",
  // "enum",
  // "Decorators",
  // "Class tricks",
  // "Type guard with is",
  // "Assertions, any and unknown",
  // "Discriminated unions",
  // "never type",
  // "ThisType and this",
  // "extends keyword for types",
}


const lectures = Object.values(lecturesMap)

const LectureItem: React.FC<{ title: string, slug: string }> = (props) => {
  const lectureName = useParam("name")

  return (
    <Link href={`/lectures/${props.slug}`} passHref>
      <a 
        className={cs("hover:text-gray-900 text-gray-500 block p-2 rounded-sm", {
          'text-gray-900': lectureName === props.slug,
          'bg-blue-100': lectureName === props.slug
        })}
      >
        {props.title}
      </a>
    </Link>
      
  )
}

const Sidebar: React.FC = () => {
  return (
    <div className="w-full bg-white p-4 rounded-sm shadow-lg text-xl">
      <LectureItem
        title='← Back'
        slug=''
      />
      {lectures.map(lecture => 
        <LectureItem 
          key={lecture.slug}
          title={lecture.title}
          slug={lecture.slug}
        />
      )}
    </div>
  )
}

export const LecturesLayout = (props: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{props.title || "test-app"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="">
        <div className="flex justify-center mb-8">
          <TypeScript30 href="/lectures" />
        </div>
        <div className="w-full grid grid-cols-6 gap-4 max-w-screen-lg">
          <div className="col-span-4">
            {props.children}
          </div>
          <div className="col-span-2">
            <Sidebar />
          </div>
        </div>
      </div>
    </>
  )
}
