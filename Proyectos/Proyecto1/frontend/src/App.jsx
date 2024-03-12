import { Fragment, useState } from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom";
import Realtime from './components/Realtime';
import Graphs from './components/Charts/Graphs';

function App() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState([])

  return (
    <Fragment>
      <div className="App">
        <Routes>
          <Route path="/" element={<Realtime />} />
          <Route path='/' element={
              <div className='contenedor'>
                <br/><br/><br/>
                <Graphs
                  Data={data} />
                {/* <InsertButton />
                <PIDtable
                  Procesos={procesos} /> */}
              </div>
            } />
        </Routes>
      </div>
    </Fragment>
  )
}

export default App
