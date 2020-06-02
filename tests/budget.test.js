import * as getBudget from '../getBudget';
import * as createBudget from '../createBudget';
import * as deleteBudget from '../deleteBudget';

import AWS from "aws-sdk";
const realParameter = "c10aa550-916b-11ea-93f3-f1b0c0456d2f";

//CREATE Operations Budget Functions
describe('CREATE Budget Test', () => {
  beforeAll(() => {
    AWS.config.update({
      region: "eu-central-1"
    });
  })
  
  test('Not Stringified Body - Expected code 500 (err: Not Stringified)', async () => {
    const event = {
      "body": {
        "nomeOp": "Not Stringified Test",
        "typeOp": "-",
        "amount": "20",
      }
    };
    process.env.tableNameBudget = "PathMaker_Budget"
    const context = 'context';
    const callback = (response) => {
      expect(response.statusCode).toEqual(500);
      expect(typeof response.body).toBe("string");
    };
    
    await createBudget.main(event, context).then(res => callback(res));
  });

  test('Stringified Body - Expected code 200 (res: Item)', async () => {
    const event = {
        "body": "{\"typeOp\":\"-\",\"nomeOp\":\"CREATED CASUAL\",\"amount\":\"20\"}"
    };
    process.env.tableNameBudget = "PathMaker_Budget"
    const context = 'context';
    const callback = (response) => {
      expect(response.statusCode).toEqual(200);
      expect(typeof response.body).toBe("string");
    };
    
    await createBudget.main(event, context).then(res => callback(res));
  });

  test('No "typeOp" value - Expected code 200 (msg: Created With "+" type)', async () => {
    const event = {
        "body": "{\"typeOp\":\"\",\"nomeOp\":\"NO TYPE TEST\",\"amount\":\"20\"}"
    };
    process.env.tableNameBudget = "PathMaker_Budget"
    const context = 'context';
    const callback = (response) => {
      expect(response.statusCode).toEqual(200);
      expect(typeof response.body).toBe("string");
    };
    
    await createBudget.main(event, context).then(res => callback(res));
  });

  test('Incorrect "typeOp" value - Expected code 200 (msg: Created With "+" type)', async () => {
    const event = {
        "body": "{\"typeOp\":\"a\",\"nomeOp\":\"INCORRECT TYPE TEST\",\"amount\":\"20\"}"
    };
    process.env.tableNameBudget = "PathMaker_Budget"
    const context = 'context';
    const callback = (response) => {
      expect(response.statusCode).toEqual(200);
      expect(typeof response.body).toBe("string");
    };
    
    await createBudget.main(event, context).then(res => callback(res));
  });

  test('No "nomeOp" value - Expected code 500 (err: No Value)', async () => {
    const event = {
        "body": "{\"typeOp\":\"-\",\"nomeOp\":\"\",\"amount\":\"20\"}"
    };
    process.env.tableNameBudget = "PathMaker_Budget"
    const context = 'context';
    const callback = (response) => {
      expect(response.statusCode).toEqual(500);
      expect(typeof response.body).toBe("string");
    };
    
    await createBudget.main(event, context).then(res => callback(res));
  });

  test('No "amount" value - Expected code 500 (err: No amount)', async () => {
    const event = {
        "body": "{\"typeOp\":\"-\",\"nomeOp\":\"NO AMOUNT TEST\",\"amount\":\"\"}"
    };
    process.env.tableNameBudget = "PathMaker_Budget"
    const context = 'context';
    const callback = (response) => {
      expect(response.statusCode).toEqual(500);
      expect(typeof response.body).toBe("string");
    };
    
    await createBudget.main(event, context).then(res => callback(res));
  });

  test('Incorrect "amount" value - Expected code 200 (msg: Created With "0" amount)', async () => {
    const event = {
        "body": "{\"typeOp\":\"-\",\"nomeOp\":\"INCORRECT AMOUNT\",\"amount\":\"a\"}"
    };
    process.env.tableNameBudget = "PathMaker_Budget"
    const context = 'context';
    const callback = (response) => {
      expect(response.statusCode).toEqual(200);
      expect(typeof response.body).toBe("string");
    };
    
    await createBudget.main(event, context).then(res => callback(res));
  });
});

//GET operations Budget Functions
describe('GET Budget Test', () => {
  beforeAll(() => {
    AWS.config.update({
      region: "eu-central-1"
    });
  })
  
  test('Fake Id -> Expected code is 500 (err in response: Not Found)', async () => {
    const event = {
      pathParameters: {
        id: "6a062410-7c1b-11ea-9f59-39ac6330b9c"
      }
    };
    process.env.tableNameBudget = "PathMaker_Budget"
    const context = 'context';
    const callback = (response) => {
      expect(response.statusCode).toEqual(500);
      expect(typeof response.body).toBe("string");
    };
    
    await getBudget.main(event, context).then(res => callback(res));
  });
  
  test('Real Id -> Expected code 200 (response body: Item)', async () => {
    const event = {
      pathParameters: {
        id: realParameter
      }
    };
    process.env.tableNameBudget = "PathMaker_Budget"
    const context = 'context';
    const callback = (response) => {
      expect(response.statusCode).toEqual(200);
      expect(typeof response.body).toBe("string");
    };
    
    await getBudget.main(event, context).then(res => callback(res));
  });
  
  test('No Id -> Expected code 500 (err in response: Not Found, id: null)', async () => {
    const event = {
      pathParameters: {
        id: ""
      }
    };
    process.env.tableNameBudget = "PathMaker_Budget"
    const context = 'context';
    const callback = (response) => {
      expect(response.statusCode).toEqual(500);
      expect(typeof response.body).toBe("string");
    };
    
    await getBudget.main(event, context).then(res => callback(res));
  });
  
  test('"*" character -> Expected code 500 (err in response: Not Found, id: *)', async () => {
    const event = {
      pathParameters: {
        id: "*"
      }
    };
    process.env.tableNameBudget = "PathMaker_Budget"
    const context = 'context';
    const callback = (response) => {
      expect(response.statusCode).toEqual(500);
      expect(typeof response.body).toBe("string");
    };
    
    await getBudget.main(event, context).then(res => callback(res));
  });
  
  test('"_blank" character -> Expected code 500 (err in response: Not Found, id: null)', async () => {
    const event = {
      pathParameters: {
        id: " "
      }
    };
    process.env.tableNameBudget = "PathMaker_Budget"
    const context = 'context';
    const callback = (response) => {
      expect(response.statusCode).toEqual(500);
      expect(typeof response.body).toBe("string");
    };
    
    await getBudget.main(event, context).then(res => callback(res));
  });
});

//DELETE Operations Budget Functions
describe('DELETE Budget Test', () => {
  beforeAll(() => {
    AWS.config.update({
      region: "eu-central-1"
    });
  })
  
  test('Fake Id -> Expected code is 500 (err in response: Not Found)', async () => {
    const event = {
      pathParameters: {
        id: "6a062410-7c1b-11ea-9f59-39ac6330b9c"
      }
    };
    process.env.tableNameBudget = "PathMaker_Budget"
    const context = 'context';
    const callback = (response) => {
      expect(response.statusCode).toEqual(500);
      expect(typeof response.body).toBe("string");
    };
    
    await deleteBudget.main(event, context).then(res => callback(res));
  });
  
  test('Real Id -> Expected code 200 (response body: Item)', async () => {
    const event = {
      pathParameters: {
        id: realParameter
      }
    };
    process.env.tableNameBudget = "PathMaker_Budget"
    const context = 'context';
    const callback = (response) => {
      expect(response.statusCode).toEqual(200);
      expect(typeof response.body).toBe("string");
    };
    
    await deleteBudget.main(event, context).then(res => callback(res));
  });
  
  test('No Id -> Expected code 500 (err in response: Not Found, id: null)', async () => {
    const event = {
      pathParameters: {
        id: ""
      }
    };
    process.env.tableNameBudget = "PathMaker_Budget"
    const context = 'context';
    const callback = (response) => {
      expect(response.statusCode).toEqual(500);
      expect(typeof response.body).toBe("string");
    };
    
    await deleteBudget.main(event, context).then(res => callback(res));
  });
  
  test('"*" character id -> Expected code 500 (err in response: Not Found, id: *)', async () => {
    const event = {
      pathParameters: {
        id: "*"
      }
    };
    process.env.tableNameBudget = "PathMaker_Budget"
    const context = 'context';
    const callback = (response) => {
      expect(response.statusCode).toEqual(500);
      expect(typeof response.body).toBe("string");
    };
    
    await deleteBudget.main(event, context).then(res => callback(res));
  });
  
  test('"_blank" character id -> Expected code 500 (err in response: Not Found, id: null)', async () => {
    const event = {
      pathParameters: {
        id: " "
      }
    };
    process.env.tableNameBudget = "PathMaker_Budget"
    const context = 'context';
    const callback = (response) => {
      expect(response.statusCode).toEqual(500);
      expect(typeof response.body).toBe("string");
    };
    
    await deleteBudget.main(event, context).then(res => callback(res));
  })
});