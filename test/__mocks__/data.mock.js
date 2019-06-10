let organisations = [
    {
        "_id": 1,
        "url": "http://initech.zendesk.com/api/v2/organizations/1.json",
        "external_id": "9270ed79-35eb-4a38-a46f-35725197ea8d",
        "name": "Organistaion 1",
        "domain_names": [
            "domain1.com",
            "domain2.com"
        ],
        "created_at": "2016-05-21T11:10:28 -10:00",
        "details": "Mega Org 1",
        "shared_tickets": false,
        "tags": [
            "tag1",
            "tag2"
        ]
    },
    {
        "_id": 2,
        "url": "http://initech.zendesk.com/api/v2/organizations/2.json",
        "external_id": "9270ed79-35eb-4a38-a46f-35725197ea8d",
        "name": "Organistaion 2",
        "domain_names": [
            "domain3.com",
            "domain4.com"
        ],
        "created_at": "2016-05-21T11:10:28 -10:00",
        "details": "Mega Org 2",
        "shared_tickets": true,
        "tags": [
            "tag3",
            "tag2"
        ]
    },
    {
        "_id": 3,
        "url": "http://initech.zendesk.com/api/v2/organizations/3.json",
        "external_id": "9270ed79-35eb-4a38-a46f-35725197ea8d",
        "name": "Organistaion 3",
        "domain_names": [
            "domain5.com",
            "domain6.com"
        ],
        "created_at": "2016-05-21T11:10:28 -10:00",
        "details": "Mega Org 3",
        "shared_tickets": true,
        "tags": [
            "tag4",
            "tag5"
        ]
    },
];

let users = [
    {
        "_id": 1,
        "url": "http://initech.zendesk.com/api/v2/users/1.json",
        "external_id": "74341f74-9c79-49d5-9611-87ef9b6eb75f",
        "name": "John Doe",
        "alias": "Miss Coffey",
        "created_at": "2016-04-15T05:19:46 -10:00",
        "active": true,
        "verified": true,
        "shared": false,
        "locale": "en-AU",
        "timezone": "Sydney",
        "last_login_at": "2013-08-04T01:03:27 -10:00",
        "email": "email1@domain.com",
        "phone": "1234-567-890",
        "signature": "Don't Worry Be Happy!",
        "organization_id": 1,
        "tags": [
            "Springville",
            "Sutton",
            "Hartsville/Hartley",
            "Diaperville"
        ],
        "suspended": true,
        "role": "admin"
    },
    {
        "_id": 2,
        "url": "http://initech.zendesk.com/api/v2/users/2.json",
        "external_id": "74341f74-9c79-49d5-9611-87ef9b6eb75f",
        "name": "Jenny Doe",
        "alias": "Miss Jen",
        "created_at": "2016-04-15T05:19:46 -10:00",
        "active": false,
        "verified": true,
        "shared": false,
        "locale": "en-AU",
        "timezone": "Sydney",
        "last_login_at": "2013-08-04T01:03:27 -10:00",
        "email": "email2@domain.com",
        "phone": "1235-567-890",
        "signature": "Don't Worry Be Very Happy!",
        "organization_id": 2,
        "tags": [
            "Springville",
            "Sutton",
            "Hartsville/Hartley",
            "Diaperville"
        ],
        "suspended": false,
        "role": "admin"
    },
    {
        "_id": 3,
        "url": "http://initech.zendesk.com/api/v2/users/3.json",
        "external_id": "74341f74-9c79-49d5-9611-87ef9b6eb75f",
        "name": "Michael Jordan",
        "alias": "Mr Basketball",
        "created_at": "2016-04-15T05:19:46 -10:00",
        "active": true,
        "verified": true,
        "shared": true,
        "locale": "en-AU",
        "timezone": "Sydney",
        "last_login_at": "2013-08-04T01:03:27 -10:00",
        "email": "email3@domain.com",
        "phone": "1236-567-890",
        "signature": "An ordinary signature",
        "organization_id": 3,
        "tags": [
            "Springville",
            "Sutton",
            "Hartsville/Hartley",
            "Diaperville"
        ],
        "suspended": false,
        "role": "admin"
    },
    {
        "_id": 4,
        "url": "http://initech.zendesk.com/api/v2/users/4.json",
        "external_id": "74341f74-9c79-49d5-9611-87ef9b6eb75f",
        "name": "Paul McCartney",
        "alias": "Mr Mecca",
        "created_at": "2016-04-15T05:19:46 -10:00",
        "active": true,
        "verified": true,
        "shared": true,
        "locale": "en-AU",
        "timezone": "Sydney",
        "last_login_at": "2013-08-04T01:03:27 -10:00",
        "email": "paul@domain.com",
        "phone": "1237-567-890",
        "signature": "The Beatles",
        "organization_id": 3,
        "tags": [
            "Springville",
            "Sutton",
            "Hartsville/Hartley",
            "Diaperville"
        ],
        "suspended": false,
        "role": "admin"
    },
];

let tickets = [
    {
        "_id": "436bf9b0-1147-4c0a-8439-6f79833bff5b",
        "url": "http://initech.zendesk.com/api/v2/tickets/436bf9b0-1147-4c0a-8439-6f79833bff5b.json",
        "external_id": "9210cdc9-4bee-485f-a078-35396cd74063",
        "created_at": "2016-04-28T11:19:34 -10:00",
        "type": "incident",
        "subject": "A Catastrophe in Korea (North)",
        "description": "Nostrud ad sit velit cupidatat laboris ipsum nisi amet laboris ex exercitation amet et proident. Ipsum fugiat aute dolore tempor nostrud velit ipsum.",
        "priority": "high",
        "status": "pending",
        "submitter_id": 1,
        "assignee_id": 2,
        "organization_id": 1,
        "tags": [
          "Ohio",
          "Pennsylvania",
          "American Samoa",
          "Northern Mariana Islands"
        ],
        "has_incidents": false,
        "due_at": "2016-07-31T02:37:50 -10:00",
        "via": "web"
      },
      {
        "_id": "1a227508-9f39-427c-8f57-1b72f3fab87c",
        "url": "http://initech.zendesk.com/api/v2/tickets/1a227508-9f39-427c-8f57-1b72f3fab87c.json",
        "external_id": "3e5ca820-cd1f-4a02-a18f-11b18e7bb49a",
        "created_at": "2016-04-14T08:32:31 -10:00",
        "type": "incident",
        "subject": "A Catastrophe in Micronesia",
        "description": "Aliquip excepteur fugiat ex minim ea aute eu labore. Sunt eiusmod esse eu non commodo est veniam consequat.",
        "priority": "low",
        "status": "hold",
        "submitter_id": 1,
        "assignee_id": 3,
        "organization_id": 1,
        "tags": [
          "Puerto Rico",
          "Idaho",
          "Oklahoma",
          "Louisiana"
        ],
        "has_incidents": false,
        "due_at": "2016-08-15T05:37:32 -10:00",
        "via": "chat"
      },
      {
        "_id": "2217c7dc-7371-4401-8738-0a8a8aedc08d",
        "url": "http://initech.zendesk.com/api/v2/tickets/2217c7dc-7371-4401-8738-0a8a8aedc08d.json",
        "external_id": "3db2c1e6-559d-4015-b7a4-6248464a6bf0",
        "created_at": "2016-07-16T12:05:12 -10:00",
        "type": "problem",
        "subject": "A Catastrophe in Hungary",
        "description": "Ipsum fugiat voluptate reprehenderit cupidatat aliqua dolore consequat. Consequat ullamco minim laboris veniam ea id laborum et eiusmod excepteur sint laborum dolore qui.",
        "priority": "normal",
        "status": "closed",
        "submitter_id": 2,
        "assignee_id": 1,
        "organization_id": 3,
        "tags": [
          "Massachusetts",
          "New York",
          "Minnesota",
          "New Jersey"
        ],
        "has_incidents": true,
        "due_at": "2016-08-06T04:16:06 -10:00",
        "via": "web"
      },
      {
        "_id": "87db32c5-76a3-4069-954c-7d59c6c21de0",
        "url": "http://initech.zendesk.com/api/v2/tickets/87db32c5-76a3-4069-954c-7d59c6c21de0.json",
        "external_id": "1c61056c-a5ad-478a-9fd6-38889c3cd728",
        "created_at": "2016-07-06T11:16:50 -10:00",
        "type": "problem",
        "subject": "A Problem in Morocco",
        "description": "Sit culpa non magna anim. Ea velit qui nostrud eiusmod laboris dolor adipisicing quis deserunt elit amet.",
        "priority": "urgent",
        "status": "solved",
        "submitter_id": 3,
        "assignee_id": 1,
        "organization_id": 2,
        "tags": [
          "Texas",
          "Nevada",
          "Oregon",
          "Arizona"
        ],
        "has_incidents": true,
        "due_at": "2016-08-19T07:40:17 -10:00",
        "via": "voice"
      },
      {
        "_id": "4cce7415-ef12-42b6-b7b5-fb00e24f9cc1",
        "url": "http://initech.zendesk.com/api/v2/tickets/4cce7415-ef12-42b6-b7b5-fb00e24f9cc1.json",
        "external_id": "ef665694-aa3f-4960-b264-0e77c50486cf",
        "created_at": "2016-02-25T09:12:47 -11:00",
        "type": "question",
        "subject": "A Nuisance in Ghana",
        "priority": "high",
        "status": "solved",
        "submitter_id": 2,
        "assignee_id": 1,
        "organization_id": 3,
        "tags": [
          "Delaware",
          "New Hampshire",
          "Utah",
          "Hawaii"
        ],
        "has_incidents": false,
        "due_at": "2016-08-05T10:31:03 -10:00",
        "via": "web"
      },
];

module.exports = {
    users,
    tickets,
    organisations,
};