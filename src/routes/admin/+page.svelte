<script>
    import { onMount } from "svelte";
    import UiCreateUserComponent from "../../lib/CreateUserComponent/UICreateUserComponent.svelte";
    import UiAlertComponent from "../../lib/UIAlertComponent/UIAlertComponent.svelte";
    import UiUserPageComponent from "../../lib/UserPageComponent/UIUserPageComponent.svelte";
    import { pageInfo } from "../../lib/stores/auth";
    import { goto } from "$app/navigation";
    import { userAction } from "../../lib/stores/adminStore";
    import { collectionByName } from "../../lib/API";


    let showAlert = false;

    export let data;

    let pageList = [];

    onMount(async () => {
        // fetchBusinessPage();
        let response = await collectionByName("page");
        pageList = response;
        console.log(response)
    });

    async function fetchBusinessPage(){
        try {
            let response = await fetch("/api/getAllPage",{
                method:"GET",
                headers:{
                    "Accept":"application/json"
                }
            });

            let data = await response.json();
            let _pagelist = data.documents;
            pageList = _pagelist;
            // console.log(_pagelist)
        } catch (error) {
            console.error(error);
        }
    }

    function didSelectRowAt(event) {
        const eventType = event.detail.eventType;
        if (eventType == "button") {
            showAlert = !showAlert;
        } else if (eventType == "cell") {
            let index = event.detail.cellInfo.indexPath;

            console.log(pageList[index]);
        pageInfo.update(info => {
               return pageList[index]
        });
            // pageInfo.set(pageList[index]);
            // console.log($pageInfo.document.pageid);
        }
    }

    function didSelectComponentCallToAction(event) {
        const eventType = event.detail.eventType;
        if (eventType == "close_btn") {
            showAlert = !showAlert;
        } else if (eventType == "register_btn") {
            const objectInfo = event.detail.objectInfo;
            registerUser(objectInfo);
            console.log(event.detail);
        }
    }

    async function registerUser(userinformation) {
        try {
            let response = await fetch("/api/registeruser", {
                method: "POST",
                headers: {
                    "content-Type": "application/json",
                },
                body: JSON.stringify(userinformation),
            });

            let data = await response.json();
            // let9+m                                                                                                                                                                                                                             userame = userinformation.name;

            // console.log(userame)
            showAlert = !showAlert;
            console.log(data.userInfo);
            setupUserConfiguration(data.userInfo)
        } catch (error) {
            console.log(error);
        }
    }

    async function setupUserConfiguration(userInfo){

        // let userId = data.userInfo.userId;
        // let userName = data.userInfo.userName;
        // let userEmail = data.userInfo.userEmail;

        // console.log(uid,email);
        try {
            let response = await fetch("/api/setup-workspace",{
                method:"POST",
                headers:{
                    "content-Type": "application/json",
                },
                body:JSON.stringify(userInfo),
            });

            let data = await response.json();
            console.log(data);
            fetchBusinessPage()
            
        } catch (error) {
            console.log(error);
        }
    }

   

    function didSelectTableViewAction(event){
        // 
        console.log(event.detail.tag)
        $userAction = { action:event.detail.tag }
        goto("admin/editor?id="+event.detail.tag)
    }
   

</script>

{#if showAlert}
    <UiAlertComponent on:componentEvent={didSelectComponentCallToAction} />
{/if}

<div id="general">
    
    <aside id="lateral">
        <UiCreateUserComponent objectList={pageList} on:componentEvent={didSelectRowAt}/>
    </aside>
    <section id="content">
        {#if $pageInfo.length != 0}
        <UiUserPageComponent on:componentEvent={didSelectTableViewAction}/>    
        {/if}
        
    </section>
</div>

<style>
    #general {
        display: grid;
        grid-template-columns: 0.2fr 1fr;
        height: 100vh;
        background-color: #212121;
        margin: -8px;
    }

    #lateral {
        display: grid;
        grid-template-rows: 0.2fr 1fr;
        height: 100vh;
        /* border: 1px solid black; */
        /* overflow-y: auto; */
        background-color: #171717;
    }

    #content {
        /* width: 90%; */
        /* background-color: rebeccapurple; */
    }
</style>
