const operatorsByType = {
    common:
        {
            empty: 'Empty',
            not_empty: 'Not Empty'
        },

    text:
        {
            equal: 'Equal',
            not_equal: 'Not Equal',
            contains: 'Contains',
            starts_with: 'Starts With',
            ends_with: 'Ends With'
        },
    number:
        {
            equal: 'Equal',
            not_equal: 'Not Equal',
            greater: 'Greater',
            greater_equal: 'Greater Or Equal',
            less: 'Less',
            less_equal: 'Less Or Equal'
        },
    array:
        {
            equal: 'Equal',
            not_equal: 'Not Equal',
            in: 'IN',
            not_in: 'NOT IN'
        }
}

export {operatorsByType}