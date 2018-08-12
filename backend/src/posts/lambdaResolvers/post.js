const AWS = require('aws-sdk');

const createPostObj = (returnItems) => {
  if (returnItems) {
    return returnItems.map(item => mapPostObj(item));
  }
  else {
    return null;
  }
};

const mapPostObj = (messageObj) => ({
  id: messageObj.postID,
  title: messageObj.title
});

// eslint-disable-next-line import/prefer-default-export
const handler = async (event, context, callback) => {
  console.log(JSON.stringify(event, null, 2));

  const userId = event.context.identity.sub;
  const action = event.action;

  if (!action || !userId) {
    callback(`Invalid input: Action: ${action}, UserID: ${userId}`);
    return;
  }

  let messageResult = {};
  let dynamodb = new AWS.DynamoDB.DocumentClient();

  switch (action) {
    case 'listPosts':

      let params = {
        TableName: event.params.TableName,
        IndexName: event.params.IndexName,
        KeyConditionExpression: 'userID = :hkey',
        ExpressionAttributeValues: {
          ':hkey': userId
        }
      };

      messageResult = await dynamodb.query(params)
        .promise()
        .then((result) => {
          return createPostObj(result.Items) || [];
        });
      break;
  }

  callback(null, messageResult);
};

module.exports = {
  handler
}