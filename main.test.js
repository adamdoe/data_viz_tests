const { assert } = require("chai");
const { By, Key, Builder, until } = require("selenium-webdriver");
require("chromedriver");

const URLS = {
	navigationMaps: 'https://www.cdc.gov/wcms/4.0/cdc-wp/navigation/navigation-only-map.html#examples',
	waffle: 'https://www.cdc.gov/wcms/4.0/cdc-wp/data-presentation/Waffle-Chart.html#examples',
	dataBite: 'https://www.cdc.gov/wcms/4.0/cdc-wp/data-presentation/data_bites.html#examples',
	dashboards: 'https://www.cdc.gov/wcms/4.0/cdc-wp/data-presentation/dashboard.html#examples',
	maps: {
		categorical: 'https://www.cdc.gov/wcms/4.0/cdc-wp/data-presentation/examples/example-categorical-maps.html',
		numeric: 'https://www.cdc.gov/wcms/4.0/cdc-wp/data-presentation/examples/example-numeric-maps.html',
		cityState: 'https://www.cdc.gov/wcms/4.0/cdc-wp/data-presentation/examples/example-data-map-cities-states.html',
		world: 'https://www.cdc.gov/wcms/4.0/cdc-wp/data-presentation/examples/example-world-data-map.html'
	},
	barCharts: 'https://www.cdc.gov/wcms/4.0/cdc-wp/data-presentation/bar-chart.html#examples',
	lineCharts: 'https://www.cdc.gov/wcms/4.0/cdc-wp/data-presentation/line-chart.html#examples',
	pieCharts: 'https://www.cdc.gov/wcms/4.0/cdc-wp/data-presentation/pie-chart.html#examples',
	markupInclude: 'https://www.cdc.gov/wcms/4.0/cdc-wp/data-presentation/Markup-Include.html#examples'
}

console.log('COVE Selenium Tests')
console.log('Date: ', new Date().toDateString());

describe("Review feature gallery in the release environment", function () {
	const driver = new Builder().forBrowser("chrome").build()

	after(function () {
		return driver.quit()
	});

	describe("Navigation Section", () => {
		it("Navigation Only Maps", async () => {
			await driver.get(URLS.navigationMaps)
			await driver.wait(until.elementsLocated(By.className("cdc-open-viz-module")), 1000)
			let elements = await driver.findElements(By.className("cdc-open-viz-module"));
			assert.equal(elements.length, 3)
		});
	})

	describe("Data Presentation Section", () => {

		it("Waffle Chart", async () => {
			await driver.get(URLS.waffle)
			await driver.wait(until.elementsLocated(By.className("wcms-viz-container")), 20000)
			let elements = await driver.findElements(By.className("wcms-viz-container"));
			assert.equal(elements.length, 3)
		});

		describe("Dashboard", async () => {


			it("Dashboards Should Load", async () => {
				await driver.get(URLS.dashboards)
				await driver.wait(until.elementsLocated(By.className("wcms-viz-container")), 20000)
				let elements = await driver.findElements(By.className("wcms-viz-container"));
				assert.equal(elements.length, 3)
			});

			it("Dashboards Change", async () => {
				await driver.get(URLS.dashboards)
				await driver.wait(until.elementsLocated(By.css("[value=Arkansas]")), 20000)
				let element = await driver.findElement(By.css('[value=Arkansas]')).click();
				let foo = await driver.wait(until.elementLocated(By.css('[value=Arkansas]')), 3000, 'Timed out after 3 seconds', 5000);
				let arkansasCircleContent = await driver.findElement(By.css("body > div.container.d-flex.flex-wrap.body-wrapper.bg-white > main > div:nth-child(3) > div > div.row.mb-3.bg-gray-l3 > div > div.mb-3 > div > div > div > div:nth-child(4) > div:nth-child(1) > div > div > div > div > div > svg > text")).getText();
				assert.equal("1,418", arkansasCircleContent)
			});

		});

		describe("Data Maps", async () => {

			it("Numeric Maps", async () => {
				await driver.get(URLS.maps.numeric)
				await driver.wait(until.elementsLocated(By.className("wcms-viz-container")), 20000)
				let elements = await driver.findElements(By.className("wcms-viz-container"));
				assert.equal(elements.length, 2)
			})

			it("Categorical Maps: Load", async () => {
				await driver.get(URLS.maps.categorical)
				await driver.wait(until.elementsLocated(By.className("wcms-viz-container")), 20000)
				let elements = await driver.findElements(By.className("wcms-viz-container"));
				assert.equal(elements.length, 2)
			})

			describe("World Maps", () => {
				it("Loads World Map", async () => {
					await driver.get(URLS.maps.world)
					await driver.wait(until.elementsLocated(By.className("wcms-viz-container")), 20000)
					let elements = await driver.findElements(By.className("wcms-viz-container"));
					assert.equal(elements.length, 1)
				})

				it("Change the filter and the values in the map should change", async () => {
					await driver.get(URLS.maps.world)
					await driver.wait(until.elementsLocated(By.css('option[value="Category 3"]')), 200000)
					let element = await driver.findElement(By.css('option[value="Category 3"]')).click();
					let foo = await driver.wait(until.elementLocated(By.css('option[value="Category 3"]')), 200000, 'Timed out after 5 seconds', 5000);
					
					await driver.wait(until.elementsLocated(By.css('.table-link')), 200000)
					let FirstItemInTableText = await driver.findElement(By.xpath('//*[@id="dataTableSection__ExampleWorldDataMap"]/div[2]/table/tbody/tr[1]/td[1]/span[2]')).getText();
					assert.equal("Albania", FirstItemInTableText)
				});
			})

			it("Categorical Maps: Special Classes Visible", async () => {
				await driver.get(URLS.maps.categorical)
				await driver.wait(until.elementsLocated(By.xpath('//*[@id="legend"]/section/ul/li[1]')), 20000)
				let specialClass = await driver.findElement(By.xpath('//*[@id="legend"]/section/ul/li[1]')).getText();
				assert.equal(specialClass, '*')
			})

			it("Example Data Map with Cities and States", async () => {
				await driver.get(URLS.maps.cityState)
				await driver.wait(until.elementLocated(By.className("cdc-open-viz-module cdc-map-outer-container md")), 20000)
				let map = await driver.findElement(By.className("cdc-open-viz-module cdc-map-outer-container md")).isDisplayed();
				assert.isTrue(map)
			});

			it("Example Data Map with Cities and States > Has 7 Geopoints", async () => {
				await driver.get(URLS.maps.cityState)
				await driver.wait(until.elementLocated(By.className("cdc-open-viz-module cdc-map-outer-container md")), 20000)
				let elements = await driver.findElements(By.css(".geo-point"));
				assert.equal(elements.length, 7)
			});

			it("Example Data Map with Cities and States > Territories are visible", async () => {
				await driver.get(URLS.maps.cityState)
				await driver.wait(until.elementLocated(By.className("territories")), 20000)
				let elementIsDisplayed = await driver.findElement(By.className("territories")).isDisplayed();
				assert.isTrue(elementIsDisplayed)
			})

		});

		it("Pie Chart", async () => {
			await driver.get(URLS.pieCharts)
			await driver.wait(until.elementsLocated(By.className("cdc-open-viz-module")), 20000)
			let elements = await driver.findElements(By.className("cdc-open-viz-module"));
			assert.equal(elements.length, 3)
		});

		it("Line Chart", async () => {
			await driver.get(URLS.lineCharts)
			await driver.wait(until.elementsLocated(By.className("cdc-open-viz-module")), 20000)
			let elements = await driver.findElements(By.className("cdc-open-viz-module"));
			assert.equal(elements.length, 2)
		});

		it("Bar Chart", async () => {
			await driver.get(URLS.barCharts)
			await driver.wait(until.elementsLocated(By.className("cdc-open-viz-module")), 20000)
			let elements = await driver.findElements(By.className("cdc-open-viz-module"));
			assert.equal(elements.length, 10)
		});

		describe('HTML Markup', () => {
			it("Verify they are loading", async () => {
				await driver.get(URLS.markupInclude)
				await driver.wait(until.elementsLocated(By.className("markup-include")), 20000)
				let elements = await driver.findElements(By.className("markup-include"));
				assert.equal(elements.length, 4)
			});
		})

	})

});
