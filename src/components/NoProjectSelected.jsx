import noProjectImage from "../assets/no-projects.png";
import Button from "./Button.jsx";

export default function NoProjectSelected({ onStartAddProject }) {
  return (
    <div className="mt-24 text-center w-1/2">
      <img
        className="w-16 h-16 object-contain mx-auto"
        src={noProjectImage}
        alt="An empty task list"
      />
      <h2 className="text- xl font-bold text-stone-500 mt-4 my-4">
        No Project Selected
      </h2>
      <p className="text-stone-400 mb-4">
        Select a project or get started with a new one
      </p>
      <p>
        <Button onClick={onStartAddProject}>Create new project</Button>
      </p>
    </div>
  );
}
