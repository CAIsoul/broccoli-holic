import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { api } from '../../src/services/ApiService';

xdescribe('ApiService', () => {
    let mockAxios: MockAdapter;

    beforeEach(() => {
        mockAxios = new MockAdapter(axios);
    });

    afterEach(() => {
        mockAxios.restore();
    });

    describe('requestForInvite', () => {
        it('should return true on successful request', async () => {
            mockAxios.onPost('/fake-auth').reply(200, {});

            const result = await api.requestForInvite('John Doe', 'john@example.com');
            expect(result).toBe(true);
        });

        xit('should throw an error on failed request', async () => {
            mockAxios.onPost('/fake-auth').reply(400, { errorMessage: 'Bad Request: Email is already in use' });

            await expect(api.requestForInvite('John Doe', 'usedemail@test.com')).rejects.toThrow();
        });
    });
});