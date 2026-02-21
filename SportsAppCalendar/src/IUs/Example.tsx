import { Link } from "react-router-dom";

function Example() {
  return (
    <div className="bg-red-500 flex items-center justify-center h-screen">
      <h1>Example Component</h1>
      <Link to="/" className="text-white underline">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Example Button
        </button>
      </Link>
    </div>
  );
}

export default Example;
