import { Link } from "react-router-dom"
type Props = {}

function ViewMain({}: Props) {
  return (
    <Link to={"/messenger"}>Ir a menssenger</Link>
  )
}

export default ViewMain