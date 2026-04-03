import { Link } from "react-router-dom";
import { TestConnection } from "../Others/apiHookTest";
import { testSupabase } from "../test";
export { testSupabase } from "../test";

function Example() {
  return (
    <div className="bg-fuchsia-500 flex items-center justify-center h-screen">
      <h1>Example Component</h1>
      <Link to="/" className="text-white underline">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Example Button
        </button>
        <button onClick={testSupabase}>Test Supabase</button>
      </Link>
      <TestConnection />
    </div>
  );
}

export default Example;
