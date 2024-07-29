import { getBusinessPageByName, getBusinessGPTByName } from "$lib/API";
import { commonLoad } from '../../lib/utils/commonLoad.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({ params, request }) => {
    const { cookieState } = await commonLoad({ request })
    // console.log(params)
   
    // const url = new URL(request.url);
    // console.log(url.searchParams.get("main"))
    //  console.log(cookieState)



    try {


        let pagename = params.pagename;
        const url = new URL(request.url);
        const gptname = url.searchParams.get("gpt");

        const page = await getBusinessPageByName(pagename);
        const pageid = page[0].document.pageid;
        let gpt;
        let knowledgeContent;

        // if (gptname == null) {
            // gpt = await getBusinessGPTByName(pageid, "clientservices");

            const knowledgeURL = page[0].document.baseknowledgeURL;
            const knowledgeResponse = await fetch(knowledgeURL);

            if (!knowledgeResponse.ok) {
                throw new Error(`HTTP error! status: ${knowledgeResponse.status}`);
            }

            knowledgeContent = await knowledgeResponse.text();

            console.log(page)

        // } else {
        //     gpt = await getBusinessGPTByName(pageid, gptname);
        //     // console.log(gpt)
        // }
        // console.log(cookieState.cookie.uid)
        
        return {
            pageinfo: {
                nickname:page[0].document.nickname,
                bio:page[0].document.pagedescription,
                biolink:page[0].document.pagelink,
                baseknowledge:knowledgeContent,
                uid:cookieState.cookie.uid
            }
        }

    } catch (error) {
        console.error("Error loading page data:", error);
        return {
            props: {
                error: "Failed to load business page data."
            }
        };
    }
}

// const username = "user123";
// if (validateUsername(username)) {
//     console.log("Username válido.");
//     throw redirect(302, '/');
// } else {
//     console.log("Username inválido.");
// }

// Uso de la función
function validateUsername(username) {
    // Permitir sólo caracteres alfanuméricos
    const regex = /^[a-zA-Z0-9]+$/;

    if (regex.test(username)) {
        return true; // Válido
    } else {
        return false; // Inválido
    }
}

