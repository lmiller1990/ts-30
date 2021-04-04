import { BlitzPage, useParam } from "blitz"

export const Lecture: BlitzPage = () => {
  const lectureName = useParam("name")

  return <h4>Lecture: {lectureName}</h4>
}

export default Lecture
