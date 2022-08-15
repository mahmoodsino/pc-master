
interface props {
    progressPercentage:number
}

const ProgressLine = ({progressPercentage }:props) => {
  return (
    <div className="h-1 w-full bg-gray-300 ">
        <div
          style={{ width: `${progressPercentage}%` }}
          className={`h-full ${progressPercentage < 100 ? "bg-green-1100" : "bg-green-1100"}`}
        ></div>
      </div>
  )
}

export default ProgressLine
