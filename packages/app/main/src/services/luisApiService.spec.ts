const mockClass = class {
};
const mockArmToken = 'bm90aGluZw.eyJ1cG4iOiJnbGFzZ293QHNjb3RsYW5kLmNvbSJ9.7gjdshgfdsk98458205jfds9843fjds';
const mockReq: RequestInit = { headers: { Authorization: `Bearer ${mockArmToken}` } };
const mockResponses = [
  'hfdjg459846gjfdhgfdshjg',
  { 'error': { 'statusCode': 401, 'message': 'Oh Noes!' } },
  { 'error': { 'statusCode': 401, 'message': 'Oh Noes!' } },
  [
    {
      'id': 'frewrew',
      'name': 'My Great Bot',
      'description': 'Default Intents for Azure Bot Service V2',
      'culture': 'en-us',
      'usageScenario': '',
      'domain': '',
      'versionsCount': 1,
      'createdDateTime': '2018-03-13T21:25:49Z',
      'endpoints': {
        'PRODUCTION': {
          'versionId': '0.1',
          'isStaging': false,
          'endpointUrl': 'https://none',
          'region': null,
          'assignedEndpointKey': null,
          'endpointRegion': 'westus',
          'publishedDateTime': '2018-04-11T17:08:32Z'
        }
      },
      'endpointHitsCount': 2,
      'activeVersion': '0.1',
      'ownerEmail': 'none@none.com'
    }
  ],
  {
    'services': [
      {
        'authoringKey': 'tetrewwt',
        'appId': 'gdfdsetrew4',
        'id': '5325325325432',
        'name': 'My Great Bot',
        'subscriptionKey': '54353252532',
        'type': 'luis',
        'version': '0.1'
      }
    ]
  }
];
let mockArgsPassedToFetch;
jest.mock('node-fetch', () => ({
  default: async (url, headers) => {
    mockArgsPassedToFetch.push({ url, headers });
    return {
      ok: true,
      json: async () => mockResponses.shift(),
      text: async () => mockResponses.shift(),
    };
  },
  Headers: mockClass,
  Response: mockClass
}));
import { LuisApi } from './luisApiService';

describe('The LuisApiService class', () => {
  beforeEach(() => {
    mockArgsPassedToFetch = [];
  });
  it('should retrieve the luis models when given an arm token', async () => {
    const models = await LuisApi.getServices(mockArmToken);
    expect(models.services.length).toBe(1);
    expect(mockArgsPassedToFetch.length).toBe(4);
    expect(mockArgsPassedToFetch[0]).toEqual({
      'url': 'https://api.luis.ai/api/v2.0/bots/programmatickey',
      'headers': {
        'headers': {
          'Authorization': 'Bearer bm90aGluZw.eyJ1cG4iOiJnbGFzZ293QHNjb3RsYW5kLmNvbSJ9.7gjdshgfdsk98458205jfds9843fjds'
        }
      }
    });

    expect(mockArgsPassedToFetch[1]).toEqual({
      'url': 'https://australiaeast.api.cognitive.microsoft.com/luis/api/v2.0/apps/',
      'headers': {
        'headers': {},
        'method': 'get'
      }
    });

    expect(mockArgsPassedToFetch[2]).toEqual({
      'url': 'https://westeurope.api.cognitive.microsoft.com/luis/api/v2.0/apps/',
      'headers': {
        'headers': {},
        'method': 'get'
      }
    });

    expect(mockArgsPassedToFetch[3]).toEqual({
      'url': 'https://westus.api.cognitive.microsoft.com/luis/api/v2.0/apps/',
      'headers': {
        'headers': {},
        'method': 'get'
      }
    });
  });
});