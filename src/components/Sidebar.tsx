import { useContext, useEffect, useState } from "react";
import { CiHashtag } from "react-icons/ci";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { IoAdd } from "react-icons/io5";
import { AppContext } from "../AppContext";
import Logo from "./Logo";
import SmallButton from "./SmallButton";
import Modal from "./Modal";
import Popover from "./Popover";
import NavItem from "./NavItem";
import User from "./User";
import NavDefault from "./NavDefault";
import { MAX_PROJECT_NAME_LENGTH } from "../Types";
import ToastManager from "./ToastManager";
import { VscLayoutSidebarLeftOff } from "react-icons/vsc";
import { useLocation, useNavigate } from "react-router-dom";
import NoContent from "./NoContent";

export default function Sidebar() {
  const ctx = useContext(AppContext);
  const [notificationsActive, setNotificationsActive] = useState<boolean>(false);
  const [projectsActive, setProjectsActive] = useState<boolean>(false);
  const [newProjectName, setNewProjectName] = useState<string>("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentEditListId, setCurrentEditListId] = useState<string>("");
  const [newTitle, setNewTitle] = useState<string>("");
  const location = useLocation();
  const navigate = useNavigate();

  if (!ctx) {
    throw new Error("AppContext must be used within an AppProvider");
  }

  const {
    isSidebarOpen,
    closeSidebar,
    taskLists,
    deleteTaskList,
    editTaskList,
    errorMessage,
  } = ctx;

  function countTasksByCategory(category: string) {
    if (category === "important") {
      const myDayList = taskLists.find((list) => list.title === "My Day");
      if (myDayList) {
        return myDayList.tasks.filter((task) => task.isImportant).length;
      }
      return 0;
    }
    const currentList = taskLists.find((list) => list.id === category);
    return currentList ? currentList.tasks.length : 0;
  }

  function handleAddProject() {
    const newProject = {
      id: newProjectName.toLowerCase().replace(/\s+/g, "-"),
      title: newProjectName,
      tasks: [],
    };
    ctx?.addTaskList(newProject);
    setNewProjectName("");
    setProjectsActive(false);
    navigate(newProject.title)
  }

  function handleEditList(id: string, title: string) {
    setCurrentEditListId(id);
    setNewTitle(title);
    setIsEditModalOpen(true);
  }

  function saveEdit() {
    editTaskList(currentEditListId, newTitle);
    setIsEditModalOpen(false);
    setNewTitle("");
  }

  return (
    <>
      <nav
        className={`fixed md:relative min-h-full left-0 min-w-72 flex-shrink-0 flex flex-col justify-between p-4 transition-all duration-300 z-30 bg-firstColor text-secondColor ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between mb-2">
            <Logo className="text-2xl" />
            <div className="relative">
              <SmallButton
                icon={<HiOutlineBellAlert />}
                action={() => setNotificationsActive(!notificationsActive)}
              />
              {notificationsActive && (
                <Popover
                  onClose={() => setNotificationsActive(false)}
                  className="absolute right-0 md:left-0"
                >
                  <NoContent className="w-36" img={<img src="/src/assets/building.svg" className="h-full" alt="" />} title="Building" />
                </Popover>
              )}
              <SmallButton
                icon={<VscLayoutSidebarLeftOff />}
                action={closeSidebar}
                className="md:hidden"
              />
            </div>
          </div>

          <NavDefault
            selectedRoute={location.pathname}
            countTasksByCategory={countTasksByCategory}
            closeSidebar={closeSidebar}
          />

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <p className="text-sm font-semibold text-baseColor">Projects</p>
              <SmallButton
                icon={<IoAdd />}
                action={() => setProjectsActive(!projectsActive)}
              />
            </div>

            {projectsActive && (
              <Modal
                onClose={() => setProjectsActive(false)}
                title="Add Project"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-1 text-sm">
                    <label htmlFor="project-name">Name</label>
                    <input
                      type="text"
                      id="project-name"
                      placeholder="Project"
                      maxLength={MAX_PROJECT_NAME_LENGTH}
                      className="p-2 outline-none border rounded-lg text-sm"
                      value={newProjectName}
                      onChange={(e) => setNewProjectName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleAddProject();
                        }
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <div
                      className={`text-sm ${
                        newProjectName.length >= MAX_PROJECT_NAME_LENGTH
                          ? "text-accent"
                          : ""
                      }`}
                    >
                      {newProjectName.length}/{MAX_PROJECT_NAME_LENGTH}
                    </div>
                    <div className="flex gap-2 items-center">
                      <button
                        className="bg-focusColor text-white px-4 py-2 rounded-lg mt-2 text-sm transition-all duration-300 hover:brightness-75"
                        onClick={() => setProjectsActive(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className="bg-accent text-white px-4 py-2 rounded-lg mt-2 text-sm transition-all duration-300 hover:brightness-75"
                        onClick={handleAddProject}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </Modal>
            )}

            <div>
              <ul className="flex flex-col">
                {taskLists
                  .filter((list) => list.id !== "myday")
                  .map((list) => (
                    <NavItem
                      key={list.id}
                      id={list.id}
                      path={`/${list.id}`}
                      icon={<CiHashtag className="text-lg text-baseColor" />}
                      label={list.title}
                      onDelete={() => deleteTaskList(list.id)}
                      onEdit={() => handleEditList(list.id, list.title)}
                      isSelected={location.pathname === `/${list.id}`}
                      count={countTasksByCategory(list.id)}
                      hasSubMenu={true}
                      onClick={() => {
                        closeSidebar();
                      }}
                    />
                  ))}
              </ul>
            </div>
          </div>
        </div>

        <User name="John Doe" />
      </nav>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-20 lg:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      {isEditModalOpen && (
        <Modal onClose={() => setIsEditModalOpen(false)} title="Edit Project">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1 text-sm">
              <label htmlFor="edit-project-name">Name</label>
              <input
                type="text"
                id="edit-project-name"
                placeholder="Project"
                maxLength={MAX_PROJECT_NAME_LENGTH}
                className="p-2 outline-none border rounded-lg text-sm"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    saveEdit();
                  }
                }}
              />
            </div>
            <div className="flex items-center justify-between gap-2">
              <div
                className={`text-sm ${
                  newTitle.length >= MAX_PROJECT_NAME_LENGTH
                    ? "text-accent"
                    : ""
                }`}
              >
                {newTitle.length}/{MAX_PROJECT_NAME_LENGTH}
              </div>
              <div className="flex gap-2 items-center">
                <button
                  className="bg-focusColor text-white px-4 py-2 rounded-lg mt-2 text-sm transition-all duration-300 hover:brightness-75"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-accent text-white px-4 py-2 rounded-lg mt-2 text-sm transition-all duration-300 hover:brightness-75"
                  onClick={saveEdit}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      <ToastManager message={errorMessage} />
    </>
  );
}
