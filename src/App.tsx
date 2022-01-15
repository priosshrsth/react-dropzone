import Dropzone from "./Dropzone/Dropzone";

export default function App() {
  return (
    <div className="App">
      <h1>React Dropzone</h1>
      <h2>Start editing to see some magic happen!</h2>

      <Dropzone className="custom-wrapper" accept={`image/*`} />
    </div>
  );
}
