import { test, expect } from '@playwright/test';

test.skip('Visit BlogSpot', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');
  await expect(page).toHaveTitle('Test Automation Practice');
  await page.waitForEvent("download"); // Wait for 3 seconds to visually confirm the page load

  await page.locator('text=Test Automation Practice').selectText
});

test.skip('Frame test', async ({ page }) => {
  await page.goto('https://testing.qaautomationlabs.com/iframe.php');
//  await page
//   .frameLocator('#frame1')
//   .locator('button')
//   .click();

// await page
//   .frameLocator('iframe[name="iframe1"]')
//   .getByRole('button', { name: 'Click Me' })
//   .click();

await page
  .frameLocator('iframe[name="iframe1"]')
 .locator('button')
  .click();

  expect(await page.locator('#message')).toHaveText('You have clicked on iframe 1 button');

  const frames = page.frames();

console.log("Frames length is " + frames.length);
  
for (const frame of page.frames()) {
  console.log(frame.url());
}
});


test.skip('Shadow DOM  test', async ({ page }) => {

    await page.goto('https://testing.qaautomationlabs.com/shadow-dom.php');
    // await page.locator('.shadow-host').getByText('Hello from Shadow DOM!').
    // click();

    const text=await page.locator('#shadow-host').getByText('Hello from Shadow DOM!').textContent();
    console.log("Text is " + text);

  const shadowText = page
    .locator('#shadow-host')
    .getByText('Hello from Shadow DOM!');

    console.log("Const Shadow text is " + text);

  await expect(shadowText).toHaveText('Hello from Shadow DOM!');

});

test.skip('Shadow DOM Second  test', async ({ page }) => {

 await page.goto('https://testautomationpractice.blogspot.com');
  // await page.locator('#shadow_host input[type="text"]').scrollIntoViewIfNeeded();
  // await page.locator('#shadow_host input[type="text"]').fill('Test');

const shadowHost = page.locator('#shadow_host');
const textBox = shadowHost.locator('input[type="text"]');

//await textBox.scrollIntoViewIfNeeded();
await textBox.fill('Test');

//await page.locator('#shadow-host >> input[type="text"]').fill('Test');

 // await page.locator('#shadow_host > input').first().fill('Test');

  //  await page.locator('input:nth-child(7)').check();
  // await page.getByRole('cell', { name: 'ShadowDOM Mobiles Laptops' }).locator('input[type="file"]').click();
  // await page.getByRole('cell', { name: 'ShadowDOM Mobiles Laptops' }).locator('input[type="file"]').setInputFiles('CSharp_DotNetCore_100_Tough_MCQs.pdf');
  // await page.getByRole('cell', { name: 'ShadowDOM Mobiles Laptops' }).click();

});
test.skip('Auto  test', async ({ page }) => {

    await page.goto('https://testautomationpractice.blogspot.com/');
    await page.locator('#Wikipedia1_wikipedia-search-input').fill('Japan');
    await page.locator('.wikipedia-search-button').click();
    await page.locator('.wikipedia-search-results').waitFor({state:'visible'});

// Wait for new tab and click simultaneously
const [wikiPage] = await Promise.all([
  page.context().waitForEvent('page'),
  page
    .locator('.wikipedia-search-results')
    .getByRole('link', { name: 'Japan', exact: true })
    .click()
]);
await wikiPage.waitForLoadState();
// Assertion
await expect(wikiPage).toHaveTitle('Japan - Wikipedia');
});

test.skip('Dropdown  test', async ({ page }) => {
   await page.goto('https://testautomationpractice.blogspot.com');
    await page.locator('#animals').selectOption('cheetah');
    await expect(page.locator('#animals')).toHaveValues(['cheetah']);
   // await expect(page.locator('#animals')).toHaveText('Cheetah');/// 
    // This is not working because its giving multiple values  and we are expecting single value
    // Verify selected option text
await expect(
  page.locator('#animals option:checked')
).toHaveText('Cheetah');

    await page.locator('#animals').selectOption([
  'cat',
  'cheetah',
  'deer'
]);
  await expect(page.locator('#animals')).toHaveValues(['cat','cheetah','deer']);
//await page.waitForTimeout(50000);
    });

    test.skip('Calendar 1  test', async ({ page }) => {

      await page.goto('https://testautomationpractice.blogspot.com');
      await page.locator('#datepicker').click();
     const datet=await page.locator('.ui-datepicker-today a').getAttribute('data-date');
     console.log("Date is " + typeof(datet));///string

     //const d=parseInt(datet);
     const d = parseInt(datet!);
     const dd=d+7;
     //const ddd =await page.locator('.ui-datepicker-today a [data-date="' + dd + '"]');
    // const ddd = await page.locator(`.ui-datepicker-today a[data-date="${dd}"]`);
   
     const ddd = page.locator(`a[data-date="${dd}"]`);
     await ddd.click();

     const i=await page.locator('#datepicker').inputValue();
     console.log("Input value is " + i);

     await page.waitForTimeout(5000);
    // expect(datet).toBe('10');

    });

test.skip('Calendar 2 test', async ({ page }) => {

  // function formatDate(date: Date): string {
  //   const iso = date.toISOString();
  //   const [datePart] = iso.split('T');
  //   return datePart; // now strictly string
  // }

  await page.goto('https://testautomationpractice.blogspot.com');
  function formatDate(date: Date): string 
  {
  const parts = date.toISOString().split('T');
  return parts[0]!;
  }
 const today = new Date();
 const startDate = new Date(today);
 startDate.setDate(startDate.getDate() + 8);
 const endDate = new Date(today);
 endDate.setDate(endDate.getDate() + 45);
 const start = formatDate(startDate);
 const end = formatDate(endDate);
  await page.getByPlaceholder('Start Date').fill(start);
  await page.getByPlaceholder('End Date').fill(end);
});


test.skip('Static Web Table 1 test', async ({ page }) => {

 await page.goto('https://testautomationpractice.blogspot.com');
 //const table = await page.locator('name="BookTable');
 const table = page.locator('table[name="BookTable"]');
 //const rowCount=await table.locator('tr td').count();// 24
 const rowCount=await table.locator('tr').count();// 7
  console.log("Row count is " + rowCount);  
  const columnCount=await table.locator('tr').first().locator('th').count();// 4
  console.log("Column count is " + columnCount);

  const rows = page.locator('table[name="BookTable"] tr');

for(let i=0; i < await rows.count(); i++)
{
    const rowText = await rows.nth(i).textContent();
    console.log(rowText);
}

const books = page.locator('table[name="BookTable"] tbody tr td:first-child');

for(let i=0;i<await books.count();i++)
{
    console.log(await books.nth(i).textContent());
}

//const text = await page.locator('table[name="BookTable"] tbody tr td:first-child').textContent();
// const text = await page.locator('table[name="BookTable"] tbody tr td:first-child').allTextContents();


// expect(text).toContain('Learn Java');

// const names = await page
// .locator('table tbody tr td:first-child')
// .allTextContents();

// const sorted = [...names].sort();

// expect(names).toEqual(sorted);

// const row = page.locator('tr', {
//     has: page.locator('text=Mukesh')
// });

// console.log(await row.textContent());

});


test.skip('Dyanmic Web Table 1 test', async ({ page }) => {

   await page.goto('https://testautomationpractice.blogspot.com');
    const table=await  page.locator('#taskTable');
    const rowCount=await table.locator('tr').count();
    console.log("Row count is " + rowCount);  //5
    const columnCount=await table.locator('tr').first().locator('th').count();
    console.log("Column count is " + columnCount);//5

    const rows = await table.locator('tbody tr').count();
  const cols = await table.locator('thead th').count();
console.log("Column count is " + cols);// 5
     console.log("Row count is " + rows);  // 4

       const colsd=await table.locator('thead th');
     let cpuColIndex = -1;
    for (let i = 0; i <  cols; i++) {
    if ((await colsd.nth(i).innerText()).includes('CPU')) {
        cpuColIndex = i;
        break;
    }
}
const rowss = await table.locator('tbody tr').all();
   let cpuLoad:any ;
for (const row of rowss) {
   const processName = await row.locator('td').nth(0).innerText();
    if (processName === 'Chrome') {
     cpuLoad = await row.locator('td').nth(cpuColIndex).innerText();
        console.log(`CPU Load of Chrome: ${cpuLoad}`);
        //CPU Load of Chrome: 8.7% CPU Load of Chrome: 6.4%
        break;
    }
  }
  const tt=await page.locator('#displayValues p').first().innerText();
  expect(tt).toContain(cpuLoad);
  console.log("tt: " + tt);
const texts = await page.locator('#displayValues p').allInnerTexts();
console.log("texts : "+ texts);
expect(texts.some(text => text.includes(cpuLoad))).toBeTruthy();

const cpuText = await page
  .locator('#displayValues p')
  .filter({ hasText: 'CPU load of Chrome process' })
  .innerText();
expect(cpuText).toContain(cpuLoad);
console.log("cpuText : " + cpuText);//CPU load of Chrome process: 5.6%
const cpuTextt = await page
  .locator('#displayValues p')
  .filter({ hasText: 'CPU load of Chrome process' })
  .textContent();
expect(cpuTextt).toContain(cpuLoad);
console.log("cpuTextt : " + cpuTextt);//CPU load of Chrome process: 5.6%

console.log("cpuText : " );//CPU load of Chrome process: 5.6%
console.log(cpuText?.split(':')[0]);
console.log(cpuText?.split(':')[1]);

// const labels = page.locator('#displayValues p');
// for (let i = 0; i < await labels.count(); i++) {
//     const text = await labels.nth(i).innerText();
//     if (text.includes('CPU load of Chrome process')) {
//         expect(text).toContain(cpuLoad);
//         break;
//     }
// }

    //  for(let i=0;i<rows;i++){
    //     const rowText = await table.locator('tbody tr').nth(i).textContent();
    //     if(rowText?.includes('Chrome'))
    //     {
    //          const cpuLoad = await row.locator('td').nth(cpuColIndex).innerText();

    //         console.log(`CPU Load of Chrome: ${cpuLoad}`);
    //         break;
    //     }
    //  }

//      const row = page.locator('tbody tr').filter({
//     has: page.locator('td').filter({ hasText: 'Chrome' })
// });
});
test.skip('Checkbox Web Table 1 test', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com');
    const table=await  page.locator('#productTable');
    const rowCount=await table.locator('tbody tr').count();
    console.log("Row count is " + rowCount);  
    const columnCount=await table.locator('thead tr th').count();
    console.log("Column count is " + columnCount);
    for(let i=0;i<rowCount;i++){
        const rowText = await table.locator('tbody tr').nth(i).textContent();
        if(rowText?.includes('Smartphone'))
        {
             await table.locator('tbody tr').nth(i).locator('input[type="checkbox"]').check();
             const isChecked = await table.locator('tbody tr').nth(i).locator('input[type="checkbox"]').isChecked();
             console.log("Checkbox for Smartphone is checked : " + isChecked);
             break;
        }
      }
    });

    
    test.skip('Scrolling Dropdown 1 test', async ({ page }) => {

    await page.goto('https://testautomationpractice.blogspot.com');
    await page.getByPlaceholder('Select an item').click();

    //await page.locator('#dropdown').filter({ hasText: 'Item 4' }).click(); Does not work

    //await page.locator('#dropdown .option').filter({ hasText: 'Item 4' }).click();
    //await page.locator('#dropdown .option', { hasText: 'Item 4' }).click();

    await page.getByText('Item 4', { exact: true }).click();
    const selectedText = await page.getByPlaceholder('Select an item').inputValue();
    console.log("Selected text is " + selectedText);

    });

    test.skip('Copy paste test', async ({ page }) => {
      await page.goto('https://testautomationpractice.blogspot.com');
      await page.locator('#field1').fill('Test');
     // await page.getByText('Copy Text').click();
     await page.getByText('Copy Text').dblclick();
      const copiedText = await page.locator('#field2').inputValue();
      console.log("Copied text is " + copiedText);
      expect(copiedText).toBe('Test');

    });

      test.skip('Drag and Drop test', async ({ page }) => {

      await page.goto('https://testautomationpractice.blogspot.com');
      const source=await page.locator('#draggable');
      const target=await page.locator('#droppable');

      await source.dragTo(target);
      expect(target).toHaveText('Dropped!');


      });

      test.skip('bounding box test', async ({ page }) => {
           await page.goto('https://testautomationpractice.blogspot.com');
     const bb= await page.locator('#field1').boundingBox();
      console.log("bb", bb);//{ x: 887.328125, y: 1329.484375, width: 189, height: 28.390625 }
     console.log("Bounding box is " + JSON.stringify(bb));//{"x":887.328125,"y":1329.484375,"width":189,"height":28.390625}
     console.log("bb" + bb);//bb[object Object]

       console.log("Bounding box is withount stringify " + bb);
        console.log("X: " + bb?.x);


      });

      test.skip('alert test ss', async ({page}) => {
        await page.goto('https://testautomationpractice.blogspot.com');
        page.on('dialog', async dialog => {
          console.log(`Dialog message: ${dialog.message()}`);
          await dialog.accept();
        });
        await page.getByText('Confirmation Alert').click();
      });