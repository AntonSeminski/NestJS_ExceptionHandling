import {FilterDto} from "./filter.dto";
import {ISearchLogic} from "@jira-killer/metadata";

export class SearchLogicDto implements ISearchLogic {
    filters: Array<FilterDto>;
    filterLogic: string;

    constructor(search: any) {
        this.filters = search?.filters;
        this.filterLogic = search?.filterLogic;
    }
}