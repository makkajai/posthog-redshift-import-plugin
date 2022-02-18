import { isValidEvent } from './index'
const { createEvent } = require('@posthog/plugin-scaffold/test/utils.js')

test('Skip Event 1', async () => {
    var event1 = createEvent({ event: 'Level Played' })
    event1.properties = {}
    event1.properties.distinct_id = "xyz"
    event1.properties.$app_version = "35.8.9"
    expect(false).toEqual(isValidEvent(event1))
})

test('Skip Event 2', async () => {
    var event1 = createEvent({ event: 'Level Played' })
    event1.properties = {}
    event1.properties.distinct_id = "xyz"
    event1.properties.$app_version = "37.12.1"
    expect(false).toEqual(isValidEvent(event1))
})

test('Skip Event 3', async () => {
    var event1 = createEvent({ event: 'Level Played' })
    event1.properties = {}
    event1.properties.distinct_id = "xyz"
    event1.properties.$app_version = "35.0.0"
    expect(false).toEqual(isValidEvent(event1))
})

test('Skip Event No event Name', async () => {
    var event1 = createEvent({ })
    event1.properties = {}
    event1.properties.distinct_id = "xyz"
    event1.properties.$app_version = "35.0.0"
    expect(false).toEqual(isValidEvent(event1))
})

test('Dont skip Event 1', async () => {
    var event2 = createEvent({ event: 'Level Played' })
    event2.properties = {}
    event2.properties.distinct_id = "xyz"
    event2.properties.$app_version = "19.8.9"
    expect(true).toEqual(isValidEvent(event2))
})

test('Dont skip Event 2', async () => {
    var event2 = createEvent({ event: 'Level Played' })
    event2.properties = {}
    event2.properties.distinct_id = "xyz"
    event2.properties.$app_version = "34.99.99"
    expect(true).toEqual(isValidEvent(event2))
})

test('Dont skip Event 3', async () => {
    var event2 = createEvent({ event: 'Level Played' })
    event2.properties = {}
    event2.properties.distinct_id = "xyz"
    event2.properties.$app_version = "32.9.9"
    expect(true).toEqual(isValidEvent(event2))
})
