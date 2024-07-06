<script>
    import RegisterModal from "../../../lib/components/modal/RegisterModal.svelte";
    import { goto } from '$app/navigation';

    function RegisterComponentEvent(event){
        if(event.detail.eventType == "register_btn"){
            console.log(event.detail.objectInfo)
            registerByEmail(event.detail.objectInfo);
        }
    }

    async function registerByEmail(userinformation){
        try {
            let response = await fetch("/api/auth/register",{
                method:"POST",
                "content-Type": "application/json",
                body: JSON.stringify(userinformation),
            })
            let data = await response.json();

            // if(data.userInfo.uid)
            goto("/")
            console.log(data)
        } catch (error) {
            console.log(error)   
        }
    }

    function checkUserRole(){

    }

</script>

<RegisterModal on:componentEvent={RegisterComponentEvent}/>