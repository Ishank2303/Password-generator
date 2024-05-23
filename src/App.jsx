import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  //usestate hook
  const [length, setlength] = useState(8);
  const [numberallowed, setnumberallowed] = useState(false);
  const [charallowed, setcharallowed] = useState(false);

  const [password, setpassword] = useState("");

  //use Ref hook for refrance

  const passwordref = useRef(null);

  //use callback hook to optimize the code
  const passwordgenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIKLMNOPQRSTVXYZabcdefghijklmnopqrstuvwxyz";
    if (numberallowed) str += "0123456789";
    if (charallowed) str += "!@#$%^&*(){}[]/?`~-_";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }
    setpassword(pass);
  }, [length, numberallowed, charallowed, setpassword]);

  // use effect hook to bring change in password over dependencies

  useEffect(() => {
    passwordgenerator();
  }, [length, numberallowed, charallowed, passwordgenerator]);

  // copying password to clipboard
  const copypasswordtoclipboard = useCallback(() => {
    passwordref.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 text-lg  ">
        <h1 className="text-white text-center my-3 font-bold text-lg">
          Password Generator
        </h1>

        <div className='className = "flex shadow rounded-lg overflow-hidden mb-4 "'>
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-4"
            placeholder="password"
            readOnly
            ref={passwordref}
          />
          <button
            onClick={copypasswordtoclipboard}
            className="outline-none bg-green-700 text-white px-3 py-0.5 shrink-0"
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2 ">
          <div className="flex items-center gap-x-1">
            {/* setting input range of password */}

            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer "
              onChange={(e) => {
                setlength(e.target.value);
              }}
            />
            <label>length:{length}</label>
          </div>

          {/* // checkbox for adding Numbers */}

          <div className="flex items-center gap-x-1 ">
            <input
              type="checkbox"
              defaultChecked={numberallowed}
              id="numberinput"
              onChange={() => {
                setnumberallowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberinput">Numbers</label>
          </div>

          {/* // checkbox for adding charcter */}

          <div className="flex items-center gap-x-1 ">
            <input
              type="checkbox"
              defaultChecked={charallowed}
              id="characterinput"
              onChange={() => {
                setcharallowed((prev) => !prev);
              }}
            />
            <label htmlFor="charinput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
