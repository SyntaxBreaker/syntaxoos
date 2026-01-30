import { useDictionaryStore } from "../../store/dictionaryStore";
import DictionaryTable from "../DictionaryTable";
import DictionarySearch from "../DictionarySearch";

function Dictionary() {
  const wordDetails = useDictionaryStore((state) => state.wordDetails);

  return (
    <div className="max-w-full mx-auto p-6 space-y-6">
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
