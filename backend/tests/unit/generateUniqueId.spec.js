const generateUniqueId = require('../../src/utils/generateUniqueId')

describe('Generate Unique ID', () => {
    it('should generate an unique ID', () => {
        const id = generateUniqueId()

        expect(id).toHaveLength(8)
    })
})

describe('Generate multiple IDs', () => {
    it('should generate 500 IDs and not repeating any value', () => {
        const ids = []
        for(let i = 0; i < 500; i++)
            ids.push(generateUniqueId())

        let uniques = [...new Set(ids)]

        expect(uniques.length).toBe(500)
    })
})