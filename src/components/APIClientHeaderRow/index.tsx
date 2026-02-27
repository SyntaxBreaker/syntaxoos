import { useAPIClientStore } from "../../store/APIClientStore";
import type { KeyValueItem } from "../../types";
import TableBadge from "../TableBadge";
import TableCell from "../TableCell";
import TableRow from "../TableRow";

interface APIClientHeaderRowProps {
  item: KeyValueItem;
}

function APIClientHeaderRow({ item }: APIClientHeaderRowProps) {
  const updateHeader = useAPIClientStore((state) => state.updateHeader);
  const removeHeader = useAPIClientStore((state) => state.removeHeader);

  return (
    <TableRow>
      <TableCell>
        <input
          className="outline outline-gray-600 p-2 rounded-md w-full focus:outline-gray-400"
          value={item.key}
          name="key"
          placeholder="Key"
          onChange={(event) =>
            updateHeader(item.id, { key: event.target.value })
          }
        />
      </TableCell>
      <TableCell classes="border-l border-gray-400">
        <input
          className="outline outline-gray-600 p-2 rounded-md w-full focus:outline-gray-400"
          value={item.value}
          name="value"
          placeholder="Value"
          onChange={(event) =>
            updateHeader(item.id, { value: event.target.value })
          }
        />
      </TableCell>
      <TableCell classes="border-l border-gray-400">
        <button onClick={() => removeHeader(item.id)}>
          <TableBadge
            label="Remove"
            classes="bg-red-700 hover:cursor-pointer hover:bg-red-600"
          />
        </button>
      </TableCell>
    </TableRow>
  );
}

export default APIClientHeaderRow;
