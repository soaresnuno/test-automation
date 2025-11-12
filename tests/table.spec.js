import { test } from "@playwright/test";
import { TablePage } from "./pages/TablePage.js";

test.describe("Table Page", () => {
  test.beforeEach(async ({ page }) => {
    const tablePage = new TablePage(page);
    await tablePage.goto();
    await tablePage.waitForTableData();
  });

  test.describe("Page Structure", () => {
    test("should load the table page successfully", async ({ page }) => {
      const tablePage = new TablePage(page);

      await test.step("Verify page title", async () => {
        await tablePage.verifyTitle();
      });
    });

    test("should display page heading and description", async ({ page }) => {
      const tablePage = new TablePage(page);

      await test.step("Verify heading is visible", async () => {
        await tablePage.verifyHeading();
      });

      await test.step("Verify description is visible", async () => {
        await tablePage.verifyDescription();
      });
    });

    test("should show navigation menu", async ({ page }) => {
      const tablePage = new TablePage(page);

      await test.step("Verify navigation menu is visible", async () => {
        await tablePage.verifyNavigationVisible();
      });
    });

    test("should render the character table", async ({ page }) => {
      const tablePage = new TablePage(page);

      await test.step("Verify table is visible", async () => {
        await tablePage.verifyTableVisible();
      });
    });
  });

  test.describe("Table Headers", () => {
    test("should display all column headers", async ({ page }) => {
      const tablePage = new TablePage(page);

      await test.step("Verify all table headers are present", async () => {
        await tablePage.verifyTableHeaders();
      });
    });
  });

  test.describe("Table Data", () => {
    test("should display character data in all rows", async ({ page }) => {
      const tablePage = new TablePage(page);

      await test.step("Verify table has data rows", async () => {
        await tablePage.verifyTableHasRows(1);
      });

      await test.step("Verify all rows have character names", async () => {
        await tablePage.verifyNoEmptyNames();
      });
    });

    test("should show character images", async ({ page }) => {
      const tablePage = new TablePage(page);

      await test.step("Verify all rows have images", async () => {
        await tablePage.verifyAllRowsHaveImages();
      });
    });

    test("should display valid house names", async ({ page }) => {
      const tablePage = new TablePage(page);

      await test.step("Verify all houses are valid", async () => {
        await tablePage.verifyValidHouses();
      });
    });

    test("should contain expected number of characters", async ({ page }) => {
      const tablePage = new TablePage(page);

      await test.step("Verify table has at least 10 characters", async () => {
        await tablePage.verifyTableHasRows(10);
      });
    });
  });

  test.describe("Data Validation", () => {
    test("should not have empty name fields", async ({ page }) => {
      const tablePage = new TablePage(page);

      await test.step("Verify no empty names", async () => {
        await tablePage.verifyNoEmptyNames();
      });
    });

    test("should display all character data", async ({ page }) => {
      const tablePage = new TablePage(page);

      await test.step("Get all table data", async () => {
        const tableData = await tablePage.getTableData();
        const rowCount = await tablePage.getRowCount();

        test.expect(tableData.length).toBe(rowCount);

        for (const row of tableData) {
          test.expect(row.name).toBeTruthy();
        }
      });
    });
  });

  test.describe("Dynamic Behavior", () => {
    test("should randomize character order on reload", async ({ page }) => {
      const tablePage = new TablePage(page);
      let orderChangedAtLeastOnce = false;

      await test.step("Test multiple reloads for randomization", async () => {
        const firstLoad = await tablePage.getCharacterNames();

        // Try up to 3 reloads to verify randomization
        for (let i = 0; i < 3; i++) {
          await tablePage.goto();
          await tablePage.waitForTableData();
          const nextLoad = await tablePage.getCharacterNames();

          // Character lists should have same length
          test.expect(nextLoad.length).toBe(firstLoad.length);

          // Check if order changed
          const orderChanged = firstLoad.some(
            (name, index) => name !== nextLoad[index]
          );

          if (orderChanged) {
            orderChangedAtLeastOnce = true;
            break;
          }
        }

        // At least one reload should show different order
        test.expect(orderChangedAtLeastOnce).toBe(true);
      });
    });

    test("should maintain same characters across reloads", async ({ page }) => {
      const tablePage = new TablePage(page);

      await test.step("Get characters from first load", async () => {
        const firstLoad = await tablePage.getCharacterNames();
        const firstLoadSorted = [...firstLoad].sort();

        await test.step("Reload and verify same characters", async () => {
          await tablePage.goto();
          await tablePage.waitForTableData();
          const secondLoad = await tablePage.getCharacterNames();
          const secondLoadSorted = [...secondLoad].sort();

          await test.step("Compare sorted character lists", async () => {
            test.expect(secondLoadSorted).toEqual(firstLoadSorted);
          });
        });
      });
    });
  });

  test.describe("Navigation", () => {
    test("should navigate to HOME page", async ({ page }) => {
      const tablePage = new TablePage(page);

      await test.step("Click HOME link", async () => {
        await tablePage.navigateToHome();
      });

      await test.step("Verify redirected to home page", async () => {
        await test.expect(page).toHaveURL(/.*\//);
      });
    });

    test("should navigate to LOGIN page", async ({ page }) => {
      const tablePage = new TablePage(page);

      await test.step("Click LOGIN link", async () => {
        await tablePage.navigateToLogin();
      });

      await test.step("Verify redirected to login page", async () => {
        await test.expect(page).toHaveURL(/.*login/);
      });
    });

    test("should navigate to FORM page", async ({ page }) => {
      const tablePage = new TablePage(page);

      await test.step("Click FORM link", async () => {
        await tablePage.navigateToForm();
      });

      await test.step("Verify redirected to form page", async () => {
        await test.expect(page).toHaveURL(/.*form/);
      });
    });

    test("should navigate to TASKS page", async ({ page }) => {
      const tablePage = new TablePage(page);

      await test.step("Click TASKS link", async () => {
        await tablePage.navigateToTasks();
      });

      await test.step("Verify redirected to tasks page", async () => {
        await test.expect(page).toHaveURL(/.*tasks/);
      });
    });

    test("should navigate to STORE page", async ({ page }) => {
      const tablePage = new TablePage(page);

      await test.step("Click STORE link", async () => {
        await tablePage.navigateToStore();
      });

      await test.step("Verify redirected to store page", async () => {
        await test.expect(page).toHaveURL(/.*store/);
      });
    });

    test("should navigate to ABOUT page", async ({ page }) => {
      const tablePage = new TablePage(page);

      await test.step("Click ABOUT link", async () => {
        await tablePage.navigateToAbout();
      });

      await test.step("Verify redirected to about page", async () => {
        await test.expect(page).toHaveURL(/.*about/);
      });
    });
  });
});
