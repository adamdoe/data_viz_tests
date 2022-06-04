const { assert } = require("chai");
const { By, Key, Builder, until } = require("selenium-webdriver");
require("chromedriver");


describe("Waffle Charts", function () {
	const waffleChartUrl = 'https://www.cdc.gov/wcms/4.0/cdc-wp/data-presentation/Waffle-Chart.html#examples';
	const driver = new Builder().forBrowser("chrome").build()

	// do something before test suite execution
	// no matter if there are failed cases
	before( async function() {
		//Create chrome driver instance
		//let driver = new Builder().forBrowser("chrome").build();
	});

	// do something after test suite execution is finished
	// no matter if there are failed cases
	after(function () {
		// close chrome
		return driver.quit()
	});

	beforeEach(function () {
		// do something before test case execution
		// no matter if there are failed cases
		// driver.get(tp4DataVizUrl);
		// const driver = new Builder().forBrowser("chrome").build()
	});

	afterEach(function () {
		// do something after test case execution is finished
		// no matter if there are failed cases
	});

	it("Loads Green Waffle Chart: Example Waffle Chart - Count", async () => {
		await driver.get(waffleChartUrl)
		await driver.wait(until.elementLocated(By.className("cove-component__header theme-green")), 20000)
		let first = await driver.findElement(By.className('cove-component__header theme-green')).getText();
		assert.equal(first, 'Example Waffle Chart - Count')

	});

	it("Loads Purple Waffle Chart: Average Compared to Max Value", async() => {
		await driver.get(waffleChartUrl)
		await driver.wait(until.elementLocated(By.className("cove-component__header theme-purple")), 20000)
		let first = await driver.findElement(By.className('cove-component__header theme-purple')).getText();
		assert.equal(first, 'Comparing the Average Amount to the Max Amount')
	});

	it("Loads Red Waffle Chart: Minimum Input Compared to Total - Filtered", async () => {
		await driver.get(waffleChartUrl)
		await driver.wait(until.elementLocated(By.className("cove-component__header theme-pink")), 20000)
		let first = await driver.findElement(By.className('cove-component__header theme-pink')).getText();
		assert.equal(first, 'Minimum Input Compared to Total - Filtered')
	});



});

describe("Data Bites", function () {
	const dataBiteUrl = 'https://www.cdc.gov/wcms/4.0/cdc-wp/data-presentation/data_bites.html#examples';
	const driver = new Builder().forBrowser("chrome").build()

	// do something before test suite execution
	// no matter if there are failed cases
	before(async function () {
		//Create chrome driver instance
		//let driver = new Builder().forBrowser("chrome").build();
	});

	// do something after test suite execution is finished
	// no matter if there are failed cases
	after(function () {
		// close chrome
		return driver.quit()
	});

	beforeEach(function () {
		// do something before test case execution
		// no matter if there are failed cases
		// driver.get(tp4DataVizUrl);
		// const driver = new Builder().forBrowser("chrome").build()
	});

	afterEach(function () {
		// do something after test case execution is finished
		// no matter if there are failed cases
	});

	it("Loads Calculated Average Data Bite", async () => {
		await driver.get(dataBiteUrl)
		await driver.wait(until.elementLocated(By.className("cdc-open-viz-module type-data-bite md theme-cyan font-medium")), 20000)
		let bite = await driver.findElement(By.className("cdc-open-viz-module type-data-bite md theme-cyan font-medium")).getText();
		assert.exists(bite)
	});

	it("Loads Max Value Data Bite", async () => {
		await driver.get(dataBiteUrl)
		await driver.wait(until.elementLocated(By.className("cdc-open-viz-module type-data-bite md theme-green font-large")), 20000)
		let bite = await driver.findElement(By.className("cdc-open-viz-module type-data-bite md theme-green font-large")).getText();
		assert.exists(bite)
	});

	it("Loads Loads Sum of Data Data Bite", async() => {
		await driver.get(dataBiteUrl)
		await driver.wait(until.elementLocated(By.className("cdc-open-viz-module type-data-bite md theme-orange font-large")), 20000)
		let bite = await driver.findElement(By.className("cdc-open-viz-module type-data-bite md theme-orange font-large")).getText();
		assert.exists(bite)
	})

	it("Loads Calculated Average with Picture Data Bite", async () => {
		await driver.get(dataBiteUrl)
		await driver.wait(until.elementLocated(By.className("cdc-open-viz-module type-data-bite md theme-purple font-medium")), 20000)
		let bite = await driver.findElement(By.className("cdc-open-viz-module type-data-bite md theme-purple font-medium")).getText();
		assert.exists(bite)
	})


});

describe("Dashboards", function () {
	const dashboardUrl = 'https://www.cdc.gov/wcms/4.0/cdc-wp/data-presentation/dashboard.html#examples';
	const driver = new Builder().forBrowser("chrome").build()

	// do something before test suite execution
	// no matter if there are failed cases
	before(async function () {
		//Create chrome driver instance
		//let driver = new Builder().forBrowser("chrome").build();
	});

	// do something after test suite execution is finished
	// no matter if there are failed cases
	after(function () {
		// close chrome
		return driver.quit()
	});

	beforeEach(function () {
		// do something before test case execution
		// no matter if there are failed cases
		// driver.get(tp4DataVizUrl);
		// const driver = new Builder().forBrowser("chrome").build()
	});

	afterEach(function () {
		// do something after test case execution is finished
		// no matter if there are failed cases
	});

	it("Loads Dashboard Filtered by Location and Type", async () => {
		await driver.get(dashboardUrl)
		await driver.wait(until.elementLocated(By.xpath("/html/body/div[6]/main/div[3]/div/div[5]/div/div[2]/div/div")), 20000)
		let dashboard = await driver.findElement(By.xpath("/html/body/div[6]/main/div[3]/div/div[5]/div/div[2]/div/div")).getText();
		assert.exists(dashboard)
	});

	it("Loads Dashboard Filtered by Location and Year", async () => {
		await driver.get(dashboardUrl)
		await driver.wait(until.elementLocated(By.xpath("/html/body/div[6]/main/div[3]/div/div[6]/div/div[2]/div/div")), 20000)
		let dashboard = await driver.findElement(By.xpath("/html/body/div[6]/main/div[3]/div/div[6]/div/div[2]/div/div")).getText();
		assert.exists(dashboard)
	});

	it("Loads Dashboard with No Filter", async () => {
		await driver.get(dashboardUrl)
		await driver.wait(until.elementLocated(By.xpath("/html/body/div[6]/main/div[3]/div/div[7]/div/div[2]/div/div")), 20000)
		let dashboard = await driver.findElement(By.xpath("/html/body/div[6]/main/div[3]/div/div[7]/div/div[2]/div/div")).getText();
		assert.exists(dashboard)
	});

});
