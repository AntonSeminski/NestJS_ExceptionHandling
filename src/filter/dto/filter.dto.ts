import {mongoOperators} from "../constants";
import {FilterTypeEnum, IFilter} from "@jira-killer/metadata";

export class FilterDto implements IFilter {
    field: string;
    type: FilterTypeEnum;
    operator: string;
    value: any;

    constructor(filter: any) {
        this.field = filter?.field;
        this.type = filter?.type;
        this.operator = filter?.operator;
        this.value = filter?.value;
    }

    toExpression(): any {
        return mongoOperators[this.type]?.[this.operator]?.(this);
    }
}