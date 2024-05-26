import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //useref hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "123456789";
    if (charAllowed) str += "!@#$%^&*()_+{}:?><,./;][=-";

    for (let index = 1; index <= length; index++) {
      let char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();

    // passwordRef.current?.setSelectionRange(0, 4);

    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-xl px-4 py-3 my-8 text-orange-500 bg-gray-800">
        <h1 className="text-white text-center text-xl font-semibold my-3">
          Password Generator
        </h1>

        <div className="flex shadow rounded-2xl overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="outline-none bg-blue-900 text-white px-3 py-0.5 shrink-0 hover:bg-blue-600"
          >
            Copy
          </button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={30}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length: {length}</label>
          </div>

          <div className="flex items-center gap-x-y">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>

          <div className="flex items-center gap-x-y">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

// import React, { useState, useRef } from "react";

// const PasswordGenerator = () => {
//   const [password, setPassword] = useState("");
//   const passwordRef = useRef(null);

//   const generatePassword = () => {
//     const chars =
//       "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
//     let newPassword = "";
//     for (let i = 0; i < 12; i++) {
//       newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
//     }
//     setPassword(newPassword);
//   };

//   const copyPasswordToClipboard = () => {
//     if (passwordRef.current) {
//       passwordRef.current.select();
//       document.execCommand("copy");
//       alert("Password copied to clipboard");
//     }
//   };

//   return (
//     <div className="w-full max-w-md mx-auto shadow-md rounded-xl px-4 py-3 my-8 text-orange-500 bg-gray-800">
//       <h1 className="text-white text-center text-xl font-semibold my-3">
//         Password Generator
//       </h1>

//       <div className="flex shadow rounded-2xl overflow-hidden mb-4">
//         <input
//           type="text"
//           value={password}
//           className="outline-none w-full py-1 px-3"
//           placeholder="Password"
//           readOnly
//           ref={passwordRef}
//         />
//         <button
//           onClick={copyPasswordToClipboard}
//           className="outline-none bg-blue-900 text-white px-3 py-0.5 shrink-0 hover:bg-blue-600"
//         >
//           Copy
//         </button>
//       </div>

//       <button
//         onClick={generatePassword}
//         className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-500"
//       >
//         Generate Password
//       </button>
//     </div>
//   );
// };

// export default PasswordGenerator;
