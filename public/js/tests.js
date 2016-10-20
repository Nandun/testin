"use strict";

describe("Compare", function () {

    var TestUtils = React.addons.TestUtils;
    var compareComponent, element, renderedDOM;

    beforeEach(function (done) {

        element = React.createElement(Universitycomp);
        compareComponent = TestUtils.renderIntoDocument(element);
        window.jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        setTimeout(function () {
            done();
        }, 500);
    });
    it("Has a School Select options", function () {
        let school = TestUtils.scryRenderedDOMComponentsWithTag(compareComponent, "select");
        expect(school[0].id).toBe("schoolSelector")
    });
    it("Has a non-empty schools list", function () {
        let option = TestUtils.scryRenderedDOMComponentsWithTag(compareComponent, "option");
        expect(option.length).toBeGreaterThan(1);
    });
});

describe("Login", function () {

    var TestUtils = React.addons.TestUtils;
    var loginComponent, element, username, password;

    beforeEach(function () {

        element = React.createElement(LogClass);
        loginComponent = TestUtils.renderIntoDocument(element);
    });

    it("Has a Signup Button", function () {
        let button = TestUtils.scryRenderedDOMComponentsWithTag(loginComponent, "button")[0];
        expect(button.innerHTML).toBe("Sign in")
    });
    it("Has a Username Field", function () {
        let input = TestUtils.scryRenderedDOMComponentsWithTag(loginComponent, "input")[0];
        expect(input.id).toBe("inputUsername")
    });
    describe("Sign in button", function () {
        var username, password;

        beforeEach(function(done) {
            username = "admin";
            password = "admin";
            spyOn(loginComponent.ref.child('logins'),"push");
        });
        it("should push to firebase", function () {
            let button = TestUtils.findRenderedDOMComponentWithTag(loginComponent,"button");
            TestUtils.Simulate.click(button);
            expect(loginComponent.ref.push).toHaveBeenCalled();
        });
    })


});
describe("Register", function () {

    var TestUtils = React.addons.TestUtils;
    var registerComponent, element;

    beforeEach(function (done) {

        element = React.createElement(RegClass);
        registerComponent = TestUtils.renderIntoDocument(element);

    });

    it("Has a Signup Button", function () {
        let button = TestUtils.scryRenderedDOMComponentsWithTag(registerComponent, "button")[0];
        expect(button.innerHTML).toBe("Register")
    });
    it("Has a Username Field", function () {
        let input = TestUtils.scryRenderedDOMComponentsWithTag(registerComponent, "input")[0];
        expect(input.id).toBe("registerUsername")
    });
    it("Should alert if username already exists", function () {
        spyOn(window, 'alert');
        expect(window.alert).toHaveBeenCalledWith("Username already exists. Please pick a different username, or login");
    });
    it("Should call ref.set to register new user", function () {
        return false; // need to implement
    });
});