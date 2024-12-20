import toast from "react-hot-toast"


function App() {

  return (
    <>
    <h1>This is main page</h1>
    <button onClick={()=>{
      toast.success("This is button clicked")
    }}>Click me</button>
    </>
  )
}

export default App
