import { useEffect, useState } from "react";
import { useAccountStore } from "../../store/useAccountStore";
import type { User } from "../../types";

type AccountState = Omit<User, "id">;

function AccountSettings() {
  const [account, setAccount] = useState<AccountState>({
    displayName: "",
    username: "",
  });
  const currentUser = useAccountStore((state) => state.user);
  const updateUser = useAccountStore((state) => state.updateUser);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;

    if (name === "displayName") {
      setAccount({ ...account, displayName: value });
    } else if (name === "username") {
      setAccount({ ...account, username: value });
    }
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateUser(account);
  };

  useEffect(() => {
    setAccount({
      displayName: currentUser.displayName,
      username: currentUser.username,
    });
  }, [currentUser]);

  return (
    <div className="flex flex-col gap-4">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label
            className="text-white text-xs font-extrabold"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="p-2 bg-neutral-secondary-medium border text-xs rounded-sm text-white focus:outline focus:outline-solid focus:outline-white"
            name="username"
            onChange={handleChange}
            value={account.username}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            className="text-white text-xs font-extrabold"
            htmlFor="displayName"
          >
            Display Name
          </label>
          <input
            className="p-2 bg-neutral-secondary-medium border text-xs rounded-sm text-white focus:outline focus:outline-solid focus:outline-white"
            name="displayName"
            onChange={handleChange}
            value={account.displayName}
          />
        </div>
        <button
          type="submit"
          className="rounded-md bg-white py-2 px-8 border border-transparent text-center text-xs hover:shadow-lg hover:bg-gray-300 hover:cursor-pointer self-end"
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default AccountSettings;
