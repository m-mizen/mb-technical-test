import PocketBase from 'pocketbase';

import { CMS_API_BASE, CMS_API_TOKEN } from '../../env';

// Creates and configures a PocketBase client instance
// This function can be reused wherever a PocketBase client is needed
// This function also makes it easier to mock the PocketBase client in tests
export function createPocketBaseClient() {
    const pb = new PocketBase(CMS_API_BASE);
    pb.authStore.save(CMS_API_TOKEN, null);
    return pb;
}