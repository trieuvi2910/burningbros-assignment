import { useSearchStore } from "../../zustand/search.store";

const TextSearch = () => {
    const { keyword, onTyping } = useSearchStore();
    return <input type="text" value={keyword} onChange={(e) => onTyping(e.target.value)} placeholder="Input somthing..."/>;
};

export default TextSearch;
