<script>
    import { db, auth } from "../lib/Firebase/config";
    import {signOut,
        onAuthStateChanged,
        GoogleAuthProvider,
        signInWithPopup,
    } from "firebase/auth";
    import { getCookieInfo } from "../lib/API";

    import { onMount } from "svelte";
    import LoginModal from "../lib/components/modal/LoginModal.svelte";
    import { goto } from "$app/navigation";

    let isLoggedIn = null;

    onMount(() => {
        // logout()
       
        onAuthStateChanged(auth, (authUser) => {

            if (authUser) {

                if(getCookieInfo("uid") != null){
                    // console.log(getCookieInfo("uid"))
                    setTimeout(() => {WellcomeToInstagram(true)}, 1000);
                    // goto("/admin")
                }else{
                    // console.log(authUser.uid)
                    document.cookie = `uid=${authUser.uid}; Path=/; SameSite=Lax`;
                    document.cookie = `role=${"admin"}; Path=/; SameSite=Lax`;
                }
                
                
                console.log(authUser);
                // goto("/admin")
            } else{
                 WellcomeToInstagram(false)
            }
        });
    });

    function WellcomeToInstagram(userAth) {
        console.log(userAth);
        isLoggedIn = userAth;
    }

    // logout()
    const loginWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const response = await signInWithPopup(auth, provider);
            document.cookie = `uid=${response.user.uid}; Path=/; SameSite=Lax`;
            document.cookie = `role=${"admin"}; Path=/; SameSite=Lax`;
            // console.log(response.user.uid);
        } catch (error) {
            console.error(error);
        }
    };

      const logout = async() =>{
        try {
            document.cookie = "uid=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
            document.cookie = "role=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
            await signOut(auth)
        } catch (error) {
            console.error(error)
        }
    }

  
    function registerModalEvents(event) {
        console.log(event.detail.eventType);
        if (event.detail.eventType == "signup_btn") {
            goto("/account/emailsignup");
        } else if (event.detail.eventType == "login_btn") {
            // loginByEmail(userinformation);
            let { email, password } = event.detail.objectInfo;
            // loginByEmail({email,password});
            loginWithGoogle();
        }
    }

</script>

{#if isLoggedIn == false}
    <!--  -->
    <LoginModal on:componentEvent={registerModalEvents} />
{:else if isLoggedIn == true}
    <!--  -->
    <!-- <h1>Login de instagram</h1> -->
    <!-- <RegisterModal/>     -->
    <h1>Bienvenido a Instagram</h1>

{/if}
