import { test, expect } from "./fixtures/registrationFixtures.js";
import { FORM_DATA, HOBBIES } from "./data/registration.js";

test.describe("Registration Flow", () => {
  test.describe("Successful Registration", () => {
    test("Complete registration with all required fields", async ({
      registrationPage,
    }) => {
      await test.step("Fill in all required fields", async () => {
        await registrationPage.fillForm(FORM_DATA.valid);
      });

      await test.step("Submit the registration form", async () => {
        await registrationPage.submit();
      });

      await test.step("Verify successful registration message", async () => {
        await registrationPage.verifySuccessfulRegistration();
      });
    });

    test("Registration with minimal required fields (no hobbies)", async ({
      registrationPage,
    }) => {
      await test.step("Fill only required fields without hobbies", async () => {
        await registrationPage.fillForm(FORM_DATA.validMinimal);
      });

      await test.step("Submit the registration form", async () => {
        await registrationPage.submit();
      });

      await test.step("Verify successful registration", async () => {
        await registrationPage.verifySuccessfulRegistration();
      });
    });

    test("Registration with all hobbies selected", async ({
      registrationPage,
    }) => {
      await test.step("Fill all fields including all hobbies", async () => {
        await registrationPage.fillForm(FORM_DATA.validWithAllHobbies);
      });

      await test.step("Submit the registration form", async () => {
        await registrationPage.submit();
      });

      await test.step("Verify successful registration", async () => {
        await registrationPage.verifySuccessfulRegistration();
      });
    });

    test("Verify all hobby checkboxes are selectable", async ({
      registrationPage,
    }) => {
      await test.step("Select each hobby checkbox", async () => {
        for (const hobby of HOBBIES) {
          const checkbox = registrationPage.getHobbyCheckbox(hobby);
          await expect(checkbox).toBeVisible();
          await checkbox.check();
          await expect(checkbox).toBeChecked();
        }
      });

      await test.step("Fill remaining required fields", async () => {
        await registrationPage.fillForm({
          name: FORM_DATA.valid.name,
          email: FORM_DATA.valid.email,
          password: FORM_DATA.valid.password,
          country: FORM_DATA.valid.country,
          gender: FORM_DATA.valid.gender,
        });
      });

      await test.step("Submit the form", async () => {
        await registrationPage.submit();
      });

      await test.step("Verify successful registration", async () => {
        await registrationPage.verifySuccessfulRegistration();
      });
    });
  });

  test.describe("Form Field Interactions", () => {
    test("Verify all gender radio buttons work correctly", async ({
      registrationPage,
    }) => {
      await test.step("Select Male gender", async () => {
        const maleRadio = registrationPage.getGenderRadio("male");
        await maleRadio.check();
        await expect(maleRadio).toBeChecked();
      });

      await test.step("Select Female gender", async () => {
        const femaleRadio = registrationPage.getGenderRadio("female");
        await femaleRadio.check();
        await expect(femaleRadio).toBeChecked();

        const maleRadio = registrationPage.getGenderRadio("male");
        await expect(maleRadio).not.toBeChecked();
      });

      await test.step("Select Other gender", async () => {
        const otherRadio = registrationPage.getGenderRadio("other");
        await otherRadio.check();
        await expect(otherRadio).toBeChecked();

        const femaleRadio = registrationPage.getGenderRadio("female");
        await expect(femaleRadio).not.toBeChecked();
      });
    });

    test("Verify hobby checkboxes can be toggled", async ({
      registrationPage,
    }) => {
      await test.step("Check and uncheck a hobby", async () => {
        const checkbox = registrationPage.getHobbyCheckboxByValue("gaming");

        await checkbox.check();
        await expect(checkbox).toBeChecked();

        await checkbox.uncheck();
        await expect(checkbox).not.toBeChecked();
      });
    });

    test("Verify country dropdown displays all options", async ({
      registrationPage,
    }) => {
      await test.step("Check all country options are present", async () => {
        const options = await registrationPage.getCountryOptions();

        expect(options).toContain("Brazil");
        expect(options).toContain("Canada");
        expect(options).toContain("United States of America");
        expect(options).toContain("Mexico");
        expect(options).toContain("Portugal");
      });
    });
  });
});
