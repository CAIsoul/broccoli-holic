import { AxiosInstance } from "axios";
import config from '../../config';
import { getAxiosInstance } from "./AxiosService";

const BASE_URL: string = config.baseApiUrl;

class ApiService {
    private _axios: AxiosInstance;

    constructor() {
        this._axios = getAxiosInstance({
            baseURL: BASE_URL,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    setup(options: any) {

    }

    /**
     * Request for an invitation.
     *
     * @param {string} name
     * @param {string} email
     * @return {*} 
     * @memberof ApiService
     */
    async requestForInvite(name: string, email: string) {
        try {
            const response = await this._axios.post('/fake-auth', { name, email });
            return response.data;
        }
        catch (error) {
            console.log('Error requesting for an inviate: ', error);
            throw error
        }
    }
}

export const api = new ApiService();