/**
 * COVE: Automated Tests for Template Package Exampless
 * Reaches out to cdc.gov template package urls to make sure examples are loading properly
 * Last Modified: 07/16/2022
 */

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
		world: 'https://www.cdc.gov/wcms/4.0/cdc-wp/data-presentation/examples/example-world-data-map.html',
		filterable: 'https://www.cdc.gov/wcms/4.0/cdc-wp/data-presentation/examples/example-numeric-maps-filterable.html',
		hex: 'https://www.cdc.gov/wcms/4.0/cdc-wp/data-presentation/examples/Example-Hex-Map.html',
		county: 'https://www.cdc.gov/wcms/4.0/cdc-wp/data-presentation/examples/example-us-map-counties.html',
		singleStateMap: 'https://www.cdc.gov/wcms/4.0/cdc-wp/data-presentation/examples/example-data-state-map-counties.html'
	},
	barCharts: 'https://www.cdc.gov/wcms/4.0/cdc-wp/data-presentation/bar-chart.html#examples',
	lineCharts: 'https://www.cdc.gov/wcms/4.0/cdc-wp/data-presentation/line-chart.html#examples',
	pieCharts: 'https://www.cdc.gov/wcms/4.0/cdc-wp/data-presentation/pie-chart.html#examples',
	markupInclude: 'https://www.cdc.gov/wcms/4.0/cdc-wp/data-presentation/Markup-Include.html#examples',
	ventilationTool: 'https://www.cdc.gov/coronavirus/2019-ncov/prevent-getting-sick/interactive-ventilation-tool.html'
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

			it("Categorical Maps: Special Classes Visible", async () => {
				await driver.get(URLS.maps.categorical)
				await driver.wait(until.elementsLocated(By.xpath('//*[@id="legend"]/section/ul/li[1]')), 20000)
				let specialClass = await driver.findElement(By.xpath('//*[@id="legend"]/section/ul/li[1]')).getText();
				assert.equal(specialClass, '*')
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

			describe("Filterable Map", () => {
				it("Loads Filterable Map", async () => {
					await driver.get(URLS.maps.filterable)
					await driver.wait(until.elementsLocated(By.className("wcms-viz-container")), 20000)
					let elements = await driver.findElements(By.className("wcms-viz-container"));
					assert.equal(elements.length, 1)
				})

				it("Change the filters and the values in the map should change", async () => {
					await driver.get(URLS.maps.filterable)
					await driver.wait(until.elementsLocated(By.css('option[value="Male"]')), 200000)
					let element = await driver.findElement(By.css('option[value="Male"]')).click();
					let foo = await driver.wait(until.elementLocated(By.css('option[value="Male"]')), 200000, 'Timed out after 5 seconds', 5000);

					await driver.wait(until.elementsLocated(By.css('#legend > section.legend-section > ul > li:nth-child(1) > span.label')), 200000)
					let FirstItemInTableText = await driver.findElement(By.css('#legend > section.legend-section > ul > li:nth-child(1) > span.label')).getText();
					assert.equal("8 - 10", FirstItemInTableText)
				});
			})

			describe("US Map with Cities", () => {

				it("City State Map Loads", async () => {
					await driver.get(URLS.maps.cityState)
					await driver.wait(until.elementLocated(By.className("cdc-open-viz-module cdc-map-outer-container md")), 20000)
					let map = await driver.findElement(By.className("cdc-open-viz-module cdc-map-outer-container md")).isDisplayed();
					assert.isTrue(map)
				});

				it("Displays 7 cities", async () => {
					await driver.get(URLS.maps.cityState)
					await driver.wait(until.elementLocated(By.className("cdc-open-viz-module cdc-map-outer-container md")), 20000)
					let elements = await driver.findElements(By.css(".geo-point"));
					assert.equal(elements.length, 7)
				});

				it("Territories are visible", async () => {
					await driver.get(URLS.maps.cityState)
					await driver.wait(until.elementLocated(By.className("territories")), 20000)
					let elementIsDisplayed = await driver.findElement(By.className("territories")).isDisplayed();
					assert.isTrue(elementIsDisplayed)
				})
			})

			describe("Hex Map", () => {
				it("Hex Map Loads", async () => {
					await driver.get(URLS.maps.hex)
					await driver.wait(until.elementsLocated(By.className("cdc-open-viz-module")), 20000)
					let elements = await driver.findElements(By.className("cdc-open-viz-module"));
					assert.equal(2, elements.length)
				})
			})

			describe("US Map with Counties", () => {

				it("County Map Loads in 5-10 Seconds", async () => {
					await driver.get(URLS.maps.county)
					await driver.wait(until.elementsLocated(By.css(".cdc-open-viz-module")), 20000)
					let elements = await driver.findElements(By.css(".cdc-open-viz-module"));
					assert.equal(1, elements.length)
				})

				it("County Map Zoom Functions", async () => {
					await driver.get(URLS.maps.county)
					await driver.wait(until.elementsLocated(By.css(".county--Mendocino")), 20000)
					let california = await driver.findElement(By.css(".county--Mendocino")).click()
					let transformToCompare = await driver.findElement(By.className("countyMapGroup")).getAttribute('transform')
					assert.equal('translate(722.6618306838891,39.16062491778308) scale(2.212319059920627)', transformToCompare)
				})
			})

			describe("Single State Map with Counties", () => {

				it("Reduce browser to small viewport and click on a county, tooltip should pop-up on click", async () => {
					await driver.get(URLS.maps.singleStateMap)
					driver.manage().window().setRect({ width: 300, height: 800 })
					await driver.wait(until.elementsLocated(By.css(".county--Tuscaloosa")), 20000)
					let countyToClick = await driver.findElement(By.css(".county--Tuscaloosa")).click()
					await driver.wait(until.elementsLocated(By.css(".modal-content .content > div strong")), 20000)
					let modalContent = await driver.findElement(By.css(".modal-content .content > div strong")).getText()
					assert.equal('County: Tuscaloosa', modalContent)
				})

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

		describe('Ventilation Tool', () => {
			it("Ventilation Tool: Loads", async () => {
				await driver.get(URLS.ventilationTool)
				await driver.wait(until.elementsLocated(By.className("type-dashboard")), 20000)
				let elements = await driver.findElements(By.className("type-dashboard"));
				assert.equal(elements.length, 1)
			});

			it("Images/Data change on Clicks", async() => {
				await driver.get(URLS.ventilationTool)

				// Set HVAC operation
				await driver.wait(until.elementsLocated(By.css('#filter-0 [value="AUTO/Intermittent"]')), 20000)
				await driver.findElement(By.css('#filter-0 [value="AUTO/Intermittent"]')).click();

				// Filter (Skip if no HVAC system)
				await driver.wait(until.elementsLocated(By.css('#filter-1 [value="Not Sure"]')), 20000)
				await driver.findElement(By.css('#filter-1 [value="Not Sure"]')).click();
				
				// Portable HEPA Air Cleaner
				await driver.wait(until.elementsLocated(By.css('#filter-2 [value="Yes"]')), 20000)
				await driver.findElement(By.css('#filter-2 [value="Yes"]')).click();

				// Open Window
				await driver.wait(until.elementsLocated(By.css('#filter-3 [value="Yes"]')), 20000)
				await driver.findElement(By.css('#filter-3 [value="Yes"]')).click();

				// Extra hour of ventilation
				await driver.wait(until.elementsLocated(By.css('#filter-4 [value="No"]')), 20000)
				await driver.findElement(By.css('#filter-4 [value="No"]')).click();

				let fourHourVisitText = await driver.findElement(By.css("body > div.container.d-flex.flex-wrap.body-wrapper.bg-white > main > div:nth-child(3) > div > div.syndicate > div.row.venttool > div > div > div:nth-child(2) > div > div:nth-child(1) > div > div > div > div > div:nth-child(1) > div > div > div > div.bite.bite-bottom > div > div.bite-content > p > span")).getText();
				assert.equal("84%", fourHourVisitText)
			})
		})

	})

});
