import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div className="text-center mt-20">实习生成长导航系统 - 初始化中...</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
