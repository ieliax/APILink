import { redirect } from '@sveltejs/kit';
import { commonLoad } from '../../lib/utils/commonLoad.js';

export async function load({ request }) {
    const { cookieState } = await commonLoad({ request })

    if (cookieState.cookie.role != "admin") {
         throw redirect(302, '/');
    }
    
    return {
        cookieState
    }
}