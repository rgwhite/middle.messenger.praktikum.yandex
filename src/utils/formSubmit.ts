import { GroupItem } from "../components/form/groupItem";
import { Childs } from "../types/types";

export function formSubmit(event: Event, childrens: Childs) {
    event.preventDefault();
    const groupItems = Object.values(childrens).filter((item) => item instanceof GroupItem) as GroupItem[];
    if (!groupItems.length) {
        return;
    }
    const validateResults = groupItems.map((item) => item.validate());
    if (!validateResults.includes(false)) {
        const data = Object.fromEntries(new FormData(event.target as HTMLFormElement));
        console.log(data);
    }
}