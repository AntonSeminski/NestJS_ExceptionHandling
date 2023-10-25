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
            [operatorsByType.common.empty]: (filter: { field: string, value: any }) => {
                return {[filter.field]: null};
            },
            [operatorsByType.common.not_empty]: (filter: { field: string, value: any }) => {
                return {[filter.field]: {$ne: null}};
            }
        },

    text:
        {
            [operatorsByType.text.equal]: (filter: { field: string, value: any }) => {
                return {[filter.field]: filter.value};
            },
            [operatorsByType.text.not_equal]: (filter: { field: string, value: any }) => {
                return {[filter.field]: {$ne: null}};
            },
            [operatorsByType.text.contains]: (filter: { field: string, value: any }) => {
                return {[filter.field]:{$regex: filter.value}};
            },
            [operatorsByType.text.starts_with]: (filter: { field: string, value: any }) => {
                return {[filter.field]:{$regex: `^${filter.value}`}};
            },

            [operatorsByType.text.ends_with]: (filter: { field: string, value: any }) => {
                return {[filter.field]:{$regex: `${filter.value}$`}};
            }

        },
    number:
        {
            [operatorsByType.number.equal]: (filter: any) => {
                return {[filter.field]: {$e: filter.value}};
            },
            [operatorsByType.number.not_equal]: (filter: any) => {
                return {[filter.field]: {$ne: filter.value}};
            },
            [operatorsByType.number.greater]: (filter: any) => {
                return {[filter.field]: {$gt: filter.value}};
            },
            [operatorsByType.number.greater_equal]: (filter: any) => {
                return {[filter.field]: {$gte: filter.value}};
            },
            [operatorsByType.number.less]: (filter: any) => {
                return {[filter.field]: {$lt: filter.value}};
            },
            [operatorsByType.number.less_equal]: (filter: any) => {
                return {[filter.field]: {$lte: filter.value}};
            }
        },
    array:
        {
            [operatorsByType.array.equal]: (filter: { field: string, value: any }) => {
                return {[filter.field]: {$e: filter.value}};
            },
            [operatorsByType.array.not_equal]: (filter: { field: string, value: any }) => {
                return {[filter.field]: {$ne: filter.value}};
            },
            [operatorsByType.array.in]: (filter: { field: string, value: any }) => {
                return {[filter.field]: {$in: filter.value}};
            },
            [operatorsByType.array.not_in]: (filter: { field: string, value: any }) => {
                return {[filter.field]: {$nin: filter.value}};
            },
        }
}

export {mongoOperators, logic_operators}