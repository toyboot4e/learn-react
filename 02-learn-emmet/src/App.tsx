import './App.css';
import expand from 'emmet';

function App() {
  return (
    <>
      <h1>Emmet 速習</h1>
      <textarea>{expand('div>ol>li+li+li')}</textarea>
    </>
  );
}

export default App;
