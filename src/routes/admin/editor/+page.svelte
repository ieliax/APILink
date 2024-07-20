<script>
    import EditorComponent from "../../../lib/components/admin/EditorComponent.svelte";
    import PreviewComponent from "../../../lib/components/admin/PreviewComponent.svelte";
    import TopBarComponent from "../../../lib/components/admin/TopBarComponent.svelte";
    import { gptsList } from "../../../lib/stores/auth";
    import { getDocument,getCookieInfo,collectionByName,createGPTInfo,uploadBaseknowled } from "../../../lib/API";
    import {name,description,instruction,userAction} from "../../../lib/stores/adminStore";
    import { page } from "$app/stores";

    let textarea;

    init()
    function init(){
        let selectedIndex = $page.url.searchParams.get("id");
        console.log($gptsList);
    }

    
    async function eventHandler(event) {

        if(userAction == "create"){

        }else if(userAction == "update"){

        }
        
        try {
            const documentData = await uploadBaseknowled(getCookieInfo("uid"),"conocimiento",$instruction);
            console.log(documentData);
        } catch (error) {
            console.error("Failed to fetch document: ", error);
        }
    }

    async function createGPT() {
        try {
            let response = await fetch("/api/creategpt", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: $name,
                    description: $description,
                }),
            });

            let data = await response.json();

            console.log(data);
        } catch (error) {
            console.error("Error:", error);
        }
    }
</script>

<div class="editorpage">
    <div class="editorpage__container">
        <div class="editorpage__top">
            <TopBarComponent action={$userAction} on:componentEvent={eventHandler} />
        </div>

        <div class="editorpage__center">
            <div class="editorpage__center-left">
                <EditorComponent />
            </div>

            <div class="editorpage__center-right">
                <!-- <PreviewComponent/> -->
            </div>
        </div>
    </div>
</div>

<style>
    .editorpage {
        margin: -8px;
    }
    .editorpage__container {
        display: grid;
        grid-template-rows: 0.08fr 1fr;
        height: 100vh;
        background-color: #212121;
    }
    .editorpage__top {
        border-bottom: 1px solid #424242;
        min-height: 60px;
    }
    .editorpage__center {
        display: grid;
        grid-template-columns: 1fr 1fr;
        overflow: hidden;
    }
    .editorpage__center-left {
        display: grid;
        grid-template-rows: 1fr auto;
    }
    .editorpage__center-right {
        background-color: #2f2f2f;
        /* min-height: 0px; */
    }
</style>
