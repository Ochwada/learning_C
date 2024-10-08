import React, { useEffect, useState } from 'react';

function App() {
  const [wasmModule, setWasmModule] = useState(null);

  useEffect(() => {
    const loadWasm = async () => {
      try {
        const othelloModule = await import('./wasm/othello.js'); // Load JS glue code
  
        // Ensure that the correct path is used for the .wasm file in the public folder
        othelloModule.locateFile = (file) => {
          return `/othello.wasm`;  // Use the public folder path
        };
  
        othelloModule.onRuntimeInitialized = () => {
          setWasmModule(othelloModule);
        };
      } catch (err) {
        console.error('Error loading WebAssembly module:', err);
      }
    };
  
    loadWasm();
  }, []);
  

  const handleStartGame = () => {
    if (wasmModule) {
      wasmModule._main();  // Call the C main function
    } else {
      console.log('WASM Module not loaded yet');
    }
  };

  return (
    <div>
      <h1>Othello Game in React & WebAssembly</h1>
      <button onClick={handleStartGame}>Start Game</button>
    </div>
  );
}

export default App;
