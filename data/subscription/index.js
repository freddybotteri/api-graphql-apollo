const { PubSub } = require('graphql-subscriptions');

const  MESSAGE_EVENTS = require('./message');

module.exports =  { EVENTS : {
  		MESSAGE: MESSAGE_EVENTS,
	},
	pubsub: new PubSub()
}; 
