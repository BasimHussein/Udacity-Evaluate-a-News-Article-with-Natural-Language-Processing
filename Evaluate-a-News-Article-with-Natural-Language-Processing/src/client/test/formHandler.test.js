/**
 * @jest-environment jsdom
 */

const { handleSubmit } = require("../js/formHandler.js");

describe("handleSubmit", () => {
  it("returns something", () => {
    expect(handleSubmit).toBeDefined();
  });
});
