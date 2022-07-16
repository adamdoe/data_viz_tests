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

			it("TEST NOT BUILT YET: Change drop downs for the dashboards. The values in the dashboard should change.", async () => {
				assert.equal(false)
			});


			// it("Loads Dashboard Filtered by Location and Type", async () => {
			// 	await driver.get(URLS.dashboards)
			// 	await driver.wait(until.elementLocated(By.xpath("/html/body/div[6]/main/div[3]/div/div[5]/div/div[2]/div/div")), 20000)
			// 	let dashboard = await driver.findElement(By.xpath("/html/body/div[6]/main/div[3]/div/div[5]/div/div[2]/div/div")).getText();
			// 	assert.exists(dashboard)
			// });

			// it("Loads Dashboard Filtered by Location and Year", async () => {
			// 	await driver.get(URLS.dashboards)
			// 	await driver.wait(until.elementLocated(By.xpath("/html/body/div[6]/main/div[3]/div/div[6]/div/div[2]/div/div")), 20000)
			// 	let dashboard = await driver.findElement(By.xpath("/html/body/div[6]/main/div[3]/div/div[6]/div/div[2]/div/div")).getText();
			// 	assert.exists(dashboard)
			// });

			// it("Loads Dashboard with No Filter", async () => {
			// 	await driver.get(URLS.dashboards)
			// 	await driver.wait(until.elementLocated(By.xpath("/html/body/div[6]/main/div[3]/div/div[7]/div/div[2]/div/div")), 20000)
			// 	let dashboard = await driver.findElement(By.xpath("/html/body/div[6]/main/div[3]/div/div[7]/div/div[2]/div/div")).getText();
			// 	assert.exists(dashboard)
			// });
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



	// describe("Waffle Charts: Additional Checks", function () {
	// 	const driver = new Builder().forBrowser("chrome").build()


	// 	after(function () {
	// 		// close chrome
	// 		return driver.quit()
	// 	});



	// 	it("Loads Green Waffle Chart: Example Waffle Chart - Count", async () => {
	// 		await driver.get(URLS.waffle)
	// 		await driver.wait(until.elementLocated(By.className("cove-component__header theme-green")), 20000)
	// 		await driver.sleep(2 * 1000)
	// 		let first = await driver.findElement(By.className('cove-component__header theme-green')).getText();
	// 		assert.equal(first, 'Example Waffle Chart - Count')

	// 	});

	// 	it("Loads Purple Waffle Chart: Average Compared to Max Value", async () => {
	// 		await driver.get(URLS.waffle)
	// 		await driver.wait(until.elementLocated(By.className("cove-component__header theme-purple")), 20000)
	// 		await driver.sleep(2 * 1000)
	// 		let first = await driver.findElement(By.className('cove-component__header theme-purple')).getText();
	// 		assert.equal(first, 'Comparing the Average Amount to the Max Amount')
	// 	});

	// 	it("Loads Red Waffle Chart: Minimum Input Compared to Total - Filtered", async () => {
	// 		await driver.get(URLS.waffle)
	// 		await driver.wait(until.elementLocated(By.className("cove-component__header theme-pink")), 20000)
	// 		await driver.sleep(2 * 1000)
	// 		let first = await driver.findElement(By.className('cove-component__header theme-pink')).getText();
	// 		assert.equal(first, 'Minimum Input Compared to Total - Filtered')
	// 	});

	// });

});




// describe("Data Bites", function () {
// 	const driver = new Builder().forBrowser("chrome").build()

// 	// do something before test suite execution
// 	// no matter if there are failed cases
// 	before(async function () {
// 		//Create chrome driver instance
// 		//let driver = new Builder().forBrowser("chrome").build();
// 	});

// 	// do something after test suite execution is finished
// 	// no matter if there are failed cases
// 	after(function () {
// 		// close chrome
// 		return driver.quit()
// 	});

// 	beforeEach(function () {
// 		// do something before test case execution
// 		// no matter if there are failed cases
// 		// driver.get(tp4DataVizUrl);
// 		// const driver = new Builder().forBrowser("chrome").build()
// 	});

// 	afterEach(function () {
// 		// do something after test case execution is finished
// 		// no matter if there are failed cases
// 	});

// 	it("Loads Calculated Average Data Bite", async () => {
// 		await driver.get(URLS.dataBite)
// 		await driver.wait(until.elementLocated(By.className("cdc-open-viz-module type-data-bite md theme-cyan font-medium")), 20000)
// 		let bite = await driver.findElement(By.className("cdc-open-viz-module type-data-bite md theme-cyan font-medium")).getText();
// 		assert.exists(bite)
// 	});

// 	it("Loads Max Value Data Bite", async () => {
// 		await driver.get(URLS.dataBite)
// 		await driver.wait(until.elementLocated(By.css(".cdc-open-viz-module.type-data-bite.md.theme-green.font-large")), 20000)
// 		let bite = await driver.findElement(By.css(".cdc-open-viz-module.type-data-bite.md.theme-green.font-large")).getText();
// 		assert.exists(bite)
// 	});

// 	it("Loads Loads Sum of Data Data Bite", async() => {
// 		await driver.get(URLS.dataBite)
// 		await driver.wait(until.elementLocated(By.className("cdc-open-viz-module type-data-bite md theme-orange font-large")), 20000)
// 		let bite = await driver.findElement(By.className("cdc-open-viz-module type-data-bite md theme-orange font-large")).getText();
// 		assert.exists(bite)
// 	})

// 	it("Loads Calculated Average with Picture Data Bite", async () => {
// 		await driver.get(URLS.dataBite)
// 		await driver.wait(until.elementLocated(By.className("cdc-open-viz-module type-data-bite md theme-purple font-medium")), 20000)
// 		let bite = await driver.findElement(By.className("cdc-open-viz-module type-data-bite md theme-purple font-medium")).getText();
// 		assert.exists(bite)
// 	})


// });

// describe("Dashboards", function () {
// 	const driver = new Builder().forBrowser("chrome").build()

// 	// do something before test suite execution
// 	// no matter if there are failed cases
// 	before(async function () {
// 		//Create chrome driver instance
// 		//let driver = new Builder().forBrowser("chrome").build();
// 	});

// 	// do something after test suite execution is finished
// 	// no matter if there are failed cases
// 	after(function () {
// 		// close chrome
// 		return driver.quit()
// 	});

// 	beforeEach(function () {
// 		// do something before test case execution
// 		// no matter if there are failed cases
// 		// driver.get(tp4DataVizUrl);
// 		// const driver = new Builder().forBrowser("chrome").build()
// 	});

// 	afterEach(function () {
// 		// do something after test case execution is finished
// 		// no matter if there are failed cases
// 	});

// 	it("Loads Dashboard Filtered by Location and Type", async () => {
// 		await driver.get(URLS.dashboards)
// 		await driver.wait(until.elementLocated(By.xpath("/html/body/div[6]/main/div[3]/div/div[5]/div/div[2]/div/div")), 20000)
// 		let dashboard = await driver.findElement(By.xpath("/html/body/div[6]/main/div[3]/div/div[5]/div/div[2]/div/div")).getText();
// 		assert.exists(dashboard)
// 	});

// 	it("Loads Dashboard Filtered by Location and Year", async () => {
// 		await driver.get(URLS.dashboards)
// 		await driver.wait(until.elementLocated(By.xpath("/html/body/div[6]/main/div[3]/div/div[6]/div/div[2]/div/div")), 20000)
// 		let dashboard = await driver.findElement(By.xpath("/html/body/div[6]/main/div[3]/div/div[6]/div/div[2]/div/div")).getText();
// 		assert.exists(dashboard)
// 	});

// 	it("Loads Dashboard with No Filter", async () => {
// 		await driver.get(URLS.dashboards)
// 		await driver.wait(until.elementLocated(By.xpath("/html/body/div[6]/main/div[3]/div/div[7]/div/div[2]/div/div")), 20000)
// 		let dashboard = await driver.findElement(By.xpath("/html/body/div[6]/main/div[3]/div/div[7]/div/div[2]/div/div")).getText();
// 		assert.exists(dashboard)
// 	});

// });
