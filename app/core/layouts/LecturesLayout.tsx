import { ReactNode } from "react"
import { Head } from "blitz"
import { html, style } from './html'

interface LayoutProps {
  title?: string
  children: ReactNode
}

const DemoVideo = () => (
  <div className='embed-container'>
    <style jsx global>{`
      .embed-container {
        position: relative;
        padding-bottom: 56.25%;
        height: 0;
        overflow: hidden;
        max-width: 100%;
      }
      
      .embed-container iframe,
      .embed-container object,
      .embed-container embed {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    `}
    </style>
    <iframe
      src='https://player.vimeo.com/video/66140585'
      frameBorder='0'
      allowFullScreen />
  </div>
  // <iframe 
  //   src="https://player.vimeo.com/video/523333043?title=0&byline=0&portrait=0" 
  //   width="640"
  //   height="360" 
  //   frameBorder="0" 
  //   allow="autoplay; fullscreen; picture-in-picture" 
  //   allowFullScreen={true}
  // />
)

const lectures = [
  "Interfaces vs Types",
  "infer keyword",
  "Generics",
  "Map/Recursive types",
  "Literal types and the const keywords",
  "Function overloads",
  "Utility types",
  "namespace and module",
  "enum",
  "Decorators",
  "Class tricks",
  "Type guard with is",
  "Assertions, any and unknown",
  "Discriminated unions",
  "never type",
  "ThisType and this",
  "extends keyword for types",
]


const Sidebar: React.FC = () => {
  return (
    <ul>
      {lectures.map(lecture => (
        <li key={lecture}>{lecture}</li>
      ))}
    </ul>
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
            <DemoVideo />
            <div className="article bg-white p-6 overflow-x-scroll">
              <div
                style={{ whiteSpace: 'pre-wrap' }}
                dangerouslySetInnerHTML={{ __html: html.concat(style) }}
              />
            </div>
          </div>
          <Sidebar />
        </div>
      </div>
    </>
  )
}
