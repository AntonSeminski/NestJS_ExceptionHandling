import {FilterDto} from "../dto";
import {operatorsByType} from "./operator.constants";

const logic_operators = {
    And: '$and',
    Or: '$or',
    Not: '$not',
    Nor: '$nor'
};

const mongoOperators = {
    common:
        {
            [operatorsByType.common.empty]: (filter: FilterDto) => {
                return {[filter.field]: null};
            },
            [operatorsByType.common.not_empty]: (filter: FilterDto) => {
                return {[filter.field]: {$ne: null}};
            }
        },

    text:
        {
            [operatorsByType.text.equal]: (filter: FilterDto) => {
                return {[filter.field]: filter.value};
            },
            [operatorsByType.text.not_equal]: (filter: FilterDto) => {
                return {[filter.field]: {$ne: null}};
            },
            [operatorsByType.text.contains]: (filter: FilterDto) => {
                return {[filter.field]:{$regex: filter.value}};
            },
            [operatorsByType.text.starts_with]: (filter: FilterDto) => {
                return {[filter.field]:{$regex: `^${filter.value}`}};
            },

            [operatorsByType.text.ends_with]: (filter: FilterDto) => {
                return {[filter.field]:{$regex: `${filter.value}$`}};
            }

        },
    number:
        {
            [operatorsByType.number.equal]: (filter: FilterDto) => {
                return {[filter.field]: {$e: filter.value}};
            },
            [operatorsByType.number.not_equal]: (filter: FilterDto) => {
                return {[filter.field]: {$ne: filter.value}};
            },
            [operatorsByType.number.greater]: (filter: FilterDto) => {
                return {[filter.field]: {$gt: filter.value}};
            },
            [operatorsByType.number.greater_equal]: (filter: FilterDto) => {
                return {[filter.field]: {$gte: filter.value}};
            },
            [operatorsByType.number.less]: (filter: FilterDto) => {
                return {[filter.field]: {$lt: filter.value}};
            },
            [operatorsByType.number.less_equal]: (filter: FilterDto) => {
                return {[filter.field]: {$lte: filter.value}};
            }
        },
    array:
        {
            [operatorsByType.array.equal]: (filter: FilterDto) => {
                return {[filter.field]: {$e: filter.value}};
            },
            [operatorsByType.array.not_equal]: (filter: FilterDto) => {
                return {[filter.field]: {$ne: filter.value}};
            },
            [operatorsByType.array.in]: (filter: FilterDto) => {
                return {[filter.field]: {$in: filter.value}};
            },
            [operatorsByType.array.not_in]: (filter: FilterDto) => {
                return {[filter.field]: {$nin: filter.value}};
            },
        }
}

export {mongoOperators, logic_operators}