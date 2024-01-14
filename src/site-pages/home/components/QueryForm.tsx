import {
  useState,
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { Loading } from "@/src/components/common/loading/Loading";
import { IUser } from "@/src/types/types";
import Dropdown from "./dropdown/Dropdown";

type Props = {
  keyword: string;
  setKeyword: Dispatch<SetStateAction<string>>;
  userFilter: IUser[];
  setUserFilter: Dispatch<SetStateAction<IUser[]>>;
  runQueryHandler: (keyword: string, userFilter: IUser[]) => void;
  isLoading: boolean;
};

const QueryForm = ({
  keyword,
  setKeyword,
  userFilter,
  setUserFilter,
  runQueryHandler,
  isLoading,
}: Props) => {
  // ==========================================================================
  // STATE / HOOKS
  // ==========================================================================
  const [userOptions, setUserOptions] = useState<IUser[]>([]);

  useEffect(() => {
    getUserOptions();
  }, []);

  // ==========================================================================
  // FUNCTIONS / HANDLERS
  // ==========================================================================
  const getUserOptions = async () => {
    const res = await fetch(`/api/get-users/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Parse the response body as JSON
    const data = (await res.json()) as IUser[];
    setUserOptions(data);
    return data;
  };

  const setQueryHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    setKeyword(target.value);
  };

  const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      runQueryHandler(keyword, userFilter);
    }
  };

  // ==========================================================================
  // RENDER
  // ==========================================================================
  return (
    <div className="flex flex-col gap-4">
      <input
        className="bg-neutral-700 h-10 px-5 pr-10 w-full rounded-lg text-contrast-high
         placeholder-contrast-low focus:outline-none focus:border focus:border-primary-500"
        placeholder="Keywords"
        onChange={setQueryHandler}
        onKeyDown={keyDownHandler}
      />
      <Dropdown
        options={userOptions.map((u) => {
          return { label: "@" + u.username, value: u.username };
        })}
        setUserFilter={setUserFilter}
      />
      <div className="flex flex-row items-center gap-2">
        <button
          className="btn-md btn-primary w-28"
          onClick={() => runQueryHandler(keyword, userFilter)}
        >
          Run Query
        </button>
        {isLoading && <Loading size={24} />}
      </div>
    </div>
  );
};

export default QueryForm;
