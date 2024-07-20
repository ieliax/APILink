import { getBusinessPageByName, getBusinessGPTByName } from "$lib/API";
import { commonLoad } from '../../../lib/utils/commonLoad.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({ params, request }) => {
    // const { cookieState } = await commonLoad({ request })
    // console.log(params)

    // const url = new URL(request.url);
    // console.log(url.searchParams.get("main"))
    // console.log(cookieState)



    try {


        let pagename = params.pagename;
        let parameters = params.parameter;

        const url = new URL(request.url);
        const gptname = url.searchParams.get("gpt");

        const page = await getBusinessPageByName(pagename);
        const pageid = page[0].document.pageid;

        let gpt;
        let knowledgeContent;

        console.log(parameters)

        // if (gptname == null) {
            gpt = await getBusinessGPTByName(pageid, parameters);

            const knowledgeURL = gpt[0].document.baseknowledge;
            const knowledgeResponse = await fetch(knowledgeURL);

            if (!knowledgeResponse.ok) {
                throw new Error(`HTTP error! status: ${knowledgeResponse.status}`);
            }

            knowledgeContent = await knowledgeResponse.text();

            console.log(knowledgeContent)

        // } else {
        //     gpt = await getBusinessGPTByName(pageid, gptname);
        //     // console.log(gpt)
        // }

        return {
            // pageinfo: {
            //     gpts: gpt[0].document,
            //     by:page[0].document.pagename,
            //     baseknowledge:knowledgeContent
            // }
            pageinfo: {
                nickname:gpt[0].document.nickname,
                bio:gpt[0].document.gptdescription,
                linkbio:gpt[0].document.gptlink,
                baseknowledge:knowledgeContent
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

