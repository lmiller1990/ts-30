import { BlitzPage, useParam, dynamic } from "blitz"
import { useState, useEffect } from 'react'
import { LecturesLayout, LectureSlug, lecturesMap } from 'app/core/layouts/LecturesLayout'
import { style } from 'app/articles/style'

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

export const Lecture: BlitzPage = () => {
  const lectureName = useParam('name') as LectureSlug
  const [html, setHtml] = useState('')

  useEffect(() => {
    const lecture = lecturesMap[lectureName]
    if (lecture) {
      setHtml(lecture.html.concat(style))
    }
  }, [lectureName, lecturesMap, setHtml, style])


  return (
    <LecturesLayout>
      <DemoVideo />
      <div className="article bg-white p-6 overflow-x-scroll mt-4">
        <div
          style={{ whiteSpace: 'pre-wrap' }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </LecturesLayout>
  )
}

export default Lecture
