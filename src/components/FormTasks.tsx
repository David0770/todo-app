import { useState } from "react";
import { FormEvent } from "react";

import Infos from "./Infos";
import List from "./List";

interface Props {
  themeMode: boolean;
}

export default function Formtask({ themeMode }: Props) {
  const [valueInput, setVelueIntput] = useState<string>("");
  const [tasks, setTasks] = useState<string[]>([]);

  const handleValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setVelueIntput(inputValue);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (valueInput !== "") {
      setTasks([...tasks, valueInput]);
      setVelueIntput("");
    }
  };
  const handleClear = () => setTasks([]);

  const deleteItem = (deleteTask: string) => {
    console.log(deleteTask)
    const newTasks = tasks.filter((task) => task !== deleteTask);
    setTasks(newTasks);
  };

  const bgThemeColor = themeMode
    ? `bg-light-grayish-blue-hover`
    : `bg-very-dark-desaturated-blue`;
  const themeColorText = themeMode
    ? "text-dark-grayish-blue "
    : "text-light-grayish-blue";

  return (
    <form onSubmit={handleSubmit} className="mt-16">
      <div
        className={`flex items-center justify-start  gap-3 ${bgThemeColor}  rounded-lg p-5 mb-9`}
      >
        <div className=" rounded-full w-16 h-6 border border-very-dark-grayish-blue bg-transparent"></div>
        <input
          className={`w-screen bg-transparent  ${themeColorText}   text-lg  outline-none  p-2 `}
          type="text"
          placeholder="Create a new todo..."
          onChange={handleValue}
          value={valueInput}
        />
      </div>
      <div
        className={`rounded-md p-1 ${bgThemeColor} shadow-black w-full  shadow-2xl `}
      >
        {tasks.map((task) => (
          <List
            key={task}
            tasks={task}
            theme={themeMode}
            deleteItem={deleteItem}
          />
        ))}
        <Infos
          quantityOfItems={tasks.length}
          onClick={handleClear}
          hoverThemeMode={themeMode}
        />
      </div>
    </form>
  );
}
