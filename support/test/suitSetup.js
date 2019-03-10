jest.mock("@utils/cos")
jest.mock("@utils/mongo")
jest.mock("@utils/env")
jest.mock("@sentry/node")

process.env['SESSION_COOKIE_SECRET'] = '1234567890qwertyuiop';