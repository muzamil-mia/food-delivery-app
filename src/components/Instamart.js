import instamart from "../images/instamart.jpg"


const Instamart = () => {
  return (
    <div className="container">
      <div className="flex flex-col justify-center items-center gap-10 p-5">
        <span className="text-blue-dark font-bold text-4xl">Coming Soon...</span>
        <img src = {instamart} alt="instamart" className="w-[300px]"/>
      </div>
    </div>
  )
}

export default Instamart