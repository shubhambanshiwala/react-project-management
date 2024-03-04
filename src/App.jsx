import image from "./assets/no-projects.png";
import ProjectSidebar from "./components/ProjectSidebar";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import SelectedProject from "./components/SelectedProject";
import { useState } from "react";

function App() {
  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  function handleStartAddProject() {
    setProjectState((prevValue) => {
      return {
        ...prevValue,
        selectedProjectId: null,
      };
    });
  }

  function handleAddProject(projectData) {
    const newProject = {
      ...projectData,
      id: Math.random(),
    };
    setProjectState((prevValue) => {
      return {
        ...prevValue,
        selectedProjectId: undefined,
        projects: [...prevValue.projects, newProject],
      };
    });
  }

  function handleCancelAddProject() {
    setProjectState((prevValue) => {
      return {
        ...prevValue,
        selectedProjectId: undefined,
        projects: [...prevValue.projects],
      };
    });
  }

  function handleSelectProject(id) {
    setProjectState((prevValue) => {
      return {
        ...prevValue,
        selectedProjectId: id,
      };
    });
  }

  function handleDeleteProject() {
    setProjectState((prevValue) => {
      return {
        ...prevValue,
        selectedProjectId: undefined,
        projects: prevValue.projects.filter(
          (project) => project.id !== prevValue.selectedProjectId
        ),
      };
    });
  }

  function handleAddTask(enteredTask) {
    setProjectState((prevValue) => {
      const newTask = {
        text: enteredTask,
        taskId: Math.random(),
        projectId: prevValue.selectedProjectId,
      };
      return {
        ...prevValue,
        tasks: [newTask, ...prevValue.tasks],
      };
    });
  }

  function handleDeleteTask(taskId) {
    setProjectState((prevValue) => {
      return {
        ...prevValue,
        tasks: prevValue.tasks.filter((task) => task.taskId !== taskId),
      };
    });
  }

  const selectedProject = projectState.projects.find(
    (project) => project.id === projectState.selectedProjectId
  );

  let content = (
    <SelectedProject
      project={selectedProject}
      onDeleteProject={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={projectState.tasks}
    />
  );

  if (projectState.selectedProjectId === null) {
    content = (
      <NewProject onCancel={handleCancelAddProject} onAdd={handleAddProject} />
    );
  } else if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8 ">
      <ProjectSidebar
        listProjects={projectState.projects}
        onStartAddProject={handleStartAddProject}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
