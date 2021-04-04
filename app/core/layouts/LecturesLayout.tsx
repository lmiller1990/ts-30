import { ReactNode } from "react"
import cs from 'classnames'
import { Head, Link, useParam } from "blitz"

interface LayoutProps {
  title?: string
  children: ReactNode
}

interface Lecture {
  title: string
  slug: string
}

type LectureSlug = "interfaces-vs-types" | "infer-keyword" | any

const lecturesMap: Record<LectureSlug, Lecture> = {
  "interfaces-vs-types": {
    title: "Interfaces vs Types",
    slug: "interfaces-vs-types"
  },
  "type-inference-with-infer-keyword": {
    title: "Type Inference with the infer keyword",
    slug: "type-inference-with-infer-keyword"
  },
  "Generics": {
    title: "Generics",
    slug: "generics"
  },
  "Map/Recursive types": {
    title: "Map and Recursive types",
    slug: "map-and-recusive-types"
  },
  "literal-types-and-the-const-keywords": {
    title: "Literal Types and the const Keyword",
    slug: "literal-types-and-the-const-keywords"
  },
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

const LectureItem: React.FC<{ lecture: Lecture }> = (props) => {
  const lectureName = useParam("name")

  return (
    <Link href={`/lectures/${props.lecture.slug}`} passHref>
      <a 
        className={cs("hover:text-gray-900 text-gray-500 block p-2 rounded-sm", {
          'text-gray-900': lectureName === props.lecture.slug,
          'bg-blue-100': lectureName === props.lecture.slug
        })}
      >
        {props.lecture.title}
      </a>
    </Link>
      
  )
}

const Sidebar: React.FC = () => {
  return (
    <div className="w-full bg-white p-4 rounded-sm shadow-lg text-xl">
      {lectures.map(lecture => 
        <LectureItem 
          key={lecture.slug}
          lecture={lecture} 
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

      <div
        className="p-8 bg-blue-500 flex flex-col items-center justify-center"
      >
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
