import{test,expect}from '@playwright/test';

test('test fail annotation', async() =>{
    test.fail();
    console.log('This test is delibaratly fails');
    expect(1).toBe(2);
});