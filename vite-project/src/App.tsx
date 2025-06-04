import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/test" element={<Test />} />
        <Route path="/test/123" element={<Test2 />} />
      </Routes>
    </Router>
  )
}

export default App


const Test = () => {
  return <div>test</div>
}

const Test2 = () => {
  return <div>test2</div>
}