import {SearchLogicDto} from "../dto";
import {logic_operators} from "../constants";
import {FilterDto} from "../dto";

export class FilterService {
    static toExpression(search: SearchLogicDto) {
        if (!(search?.filters?.length <= 0) || !(search?.filterLogic?.length === 0))
            return {}

        let result = '';
        const filters = search.filters?.map(filter => {
            return new FilterDto(filter).toExpression()
        });

        console.log(`filters: ${JSON.stringify(filters)}`);

        search.filterLogic
            ?.split(' ')
            .forEach(char => {
                char = char.trim();

                if (this.isOperator(char)) result += `{"${logic_operators[char]}":`;

                else if (this.isNumber(char)) result += JSON.stringify(filters[+char - 1]);

                else if (char === '(') result += '[';

                else if (char === ')') result += ']}';

                else if (char === ',') result += ',';
            });

        console.log(`filters: ${JSON.stringify(result)}`);

        return JSON.parse(result);
    }

    static isOperator = (operator: string): boolean => !!logic_operators[operator];

    static isNumber = (word: string): boolean => new RegExp(/^\d+$/).test(word);
}