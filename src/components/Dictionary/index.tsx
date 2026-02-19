import { useDictionaryStore } from "../../store/dictionaryStore";
import DictionaryTable from "../DictionaryTable";
import DictionarySearch from "../DictionarySearch";

function Dictionary() {
  const wordDetails = useDictionaryStore((state) => state.wordDetails);

  return (
    <div className="max-w-full mx-auto flex flex-col gap-4">
      <DictionarySearch />
      {wordDetails && (
        <DictionaryTable
          definitions={wordDetails.meanings.definitions}
          synonyms={wordDetails.meanings.synonyms}
        />
      )}
    </div>
  );
}

export default Dictionary;
