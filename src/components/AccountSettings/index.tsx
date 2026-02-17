import { useEffect, useState } from "react";
import { useAccountStore } from "../../store/accountStore";
import type { User } from "../../types";

type AccountState = Omit<User, "id">;

function AccountSettings() {
  const [account, setAccount] = useState<AccountState>({
    displayName: "",
    username: "",
  });
  const currentUser = useAccountStore((state) => state.user);
  const updateUser = useAccountStore((state) => state.updateUser);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target;

    if (name === "displayName") {
      setAccount({ ...account, displayName: value });
    } else if (name === "username") {
      setAccount({ ...account, username: value });
    }
  };

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateUser(account);
  };

  useEffect(() => {
    setAccount({
      displayName: currentUser.displayName,
      username: currentUser.username,
    });
  }, [currentUser]);

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <label
          className="text-gray-200 text-xs font-extrabold"
          htmlFor="username"
        >
          Username
        </label>
        <input
          className="p-2 border-gray-600 border text-xs rounded-sm text-gray-200 focus:outline focus:outline-solid focus:outline-gray-400"
          name="username"
          onChange={handleChange}
          value={account.username}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label
          className="text-gray-200 text-xs font-extrabold"
          htmlFor="displayName"
        >
          Display Name
        </label>
        <input
          className="p-2 border-gray-600 border text-xs rounded-sm text-gray-200 focus:outline focus:outline-solid focus:outline-gray-400"
          name="displayName"
          onChange={handleChange}
          value={account.displayName}
        />
      </div>
      <button
        type="submit"
        className="rounded-md bg-gray-800 py-2 px-8 border border-transparent text-gray-200 text-center text-xs hover:shadow-lg hover:bg-gray-600 hover:cursor-pointer self-end"
      >
        Save
      </button>
    </form>
  );
}

export default AccountSettings;
