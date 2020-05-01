import { getContributions } from "./github.js"

let contributions

beforeAll(async () => {
  contributions = await getContributions("cujarrett")
})

test("(Integration) GitHub - All years data have twelve months", async () => {
  for (const year of contributions) {
    expect(year.data.length).toBe(12)
  }
})

test("(Integration) GitHub - Expected years exist in results", async () => {
  for (let index = 0; index < contributions.length; index++) {
    let testYear = 2015 + index
    testYear = testYear.toString()
    expect(contributions[index].name).toBe(testYear)
  }
})

test("(Integration) GitHub - Expected category of months in results", async () => {
  expect(contributions[0].data[0].category).toBe("January")
  expect(contributions[0].data[1].category).toBe("February")
  expect(contributions[0].data[2].category).toBe("March")
  expect(contributions[0].data[3].category).toBe("April")
  expect(contributions[0].data[4].category).toBe("May")
  expect(contributions[0].data[5].category).toBe("June")
  expect(contributions[0].data[6].category).toBe("July")
  expect(contributions[0].data[7].category).toBe("August")
  expect(contributions[0].data[8].category).toBe("September")
  expect(contributions[0].data[9].category).toBe("October")
  expect(contributions[0].data[10].category).toBe("November")
  expect(contributions[0].data[11].category).toBe("December")
})

test("(Integration) GitHub - Expected counts in results", async () => {
  expect(contributions[0].data[0].value).toBe(0)
  expect(contributions[0].data[1].value).toBe(0)
  expect(contributions[0].data[2].value).toBe(0)
  expect(contributions[0].data[3].value).toBe(0)
  expect(contributions[0].data[4].value).toBe(0)
  expect(contributions[0].data[5].value).toBe(0)
  expect(contributions[0].data[6].value).toBe(0)
  expect(contributions[0].data[7].value).toBe(0)
  expect(contributions[0].data[8].value).toBe(0)
  expect(contributions[0].data[9].value).toBe(0)
  expect(contributions[0].data[10].value).toBe(0)
  expect(contributions[0].data[11].value).toBe(1)

  expect(contributions[1].data[0].value).toBe(0)
  expect(contributions[1].data[1].value).toBe(0)
  expect(contributions[1].data[2].value).toBe(0)
  expect(contributions[1].data[3].value).toBe(0)
  expect(contributions[1].data[4].value).toBe(0)
  expect(contributions[1].data[5].value).toBe(0)
  expect(contributions[1].data[6].value).toBe(0)
  expect(contributions[1].data[7].value).toBe(0)
  expect(contributions[1].data[8].value).toBe(0)
  expect(contributions[1].data[9].value).toBe(0)
  expect(contributions[1].data[10].value).toBe(1)
  expect(contributions[1].data[11].value).toBe(0)

  expect(contributions[2].data[0].value).toBe(0)
  expect(contributions[2].data[1].value).toBe(0)
  expect(contributions[2].data[2].value).toBe(0)
  expect(contributions[2].data[3].value).toBe(0)
  expect(contributions[2].data[4].value).toBe(15)
  expect(contributions[2].data[5].value).toBe(43)
  expect(contributions[2].data[6].value).toBe(10)
  expect(contributions[2].data[7].value).toBe(66)
  expect(contributions[2].data[8].value).toBe(6)
  expect(contributions[2].data[9].value).toBe(56)
  expect(contributions[2].data[10].value).toBe(1)
  expect(contributions[2].data[11].value).toBe(14)

  expect(contributions[3].data[0].value).toBe(52)
  expect(contributions[3].data[1].value).toBe(60)
  expect(contributions[3].data[2].value).toBe(8)
  expect(contributions[3].data[3].value).toBe(30)
  expect(contributions[3].data[4].value).toBe(17)
  expect(contributions[3].data[5].value).toBe(15)
  expect(contributions[3].data[6].value).toBe(210)
  expect(contributions[3].data[7].value).toBe(24)
  expect(contributions[3].data[8].value).toBe(22)
  expect(contributions[3].data[9].value).toBe(29)
  expect(contributions[3].data[10].value).toBe(148)
  expect(contributions[3].data[11].value).toBe(30)

  expect(contributions[4].data[0].value).toBe(40)
  expect(contributions[4].data[1].value).toBe(48)
  expect(contributions[4].data[2].value).toBe(210)
  expect(contributions[4].data[3].value).toBe(78)
  expect(contributions[4].data[4].value).toBe(16)
  expect(contributions[4].data[5].value).toBe(42)
  expect(contributions[4].data[6].value).toBe(83)
  expect(contributions[4].data[7].value).toBe(5)
  expect(contributions[4].data[8].value).toBe(1)
  expect(contributions[4].data[9].value).toBe(36)
  expect(contributions[4].data[10].value).toBe(154)
  expect(contributions[4].data[11].value).toBe(182)
})
