<script>
     import { onMount, onDestroy, createEventDispatcher } from "svelte";
    import UIProfileHeader from "../ProfileComponent/UIProfileHeader.svelte";
    import UIProfileBioComponent from "../ProfileComponent/UIProfileBioComponent.svelte";
    import UiProfileButtonsComponent from "./UIProfileButtonsComponent.svelte";
    import Slider from "./Slider.svelte";
    import UserProducts from "../Business/UserProducts.svelte";
    import { userid,loadMoreProducts } from "../../API";
    import {
        productList,
        productIndex,
        fullSizeImagesCache,
        lastVisibletest,

        runGridAnimation

    } from "../../stores/adminStore";
    import QuestionModal from "../QuestionModal.svelte";
    import CreateProduct from "../Business/CreateProduct.svelte";
    import CreatePost from "../Business/CreatePost.svelte";
    // import UIAlertComponent from "../AlertComponent/UIAlertComponent.svelte";
    // import { firebaseid,pagename,Preview } from "$lib/AppStore";

    // export let uid;
    // export let datasources;

    // console.log(datasources)
    export let questionList = [{object:"Delete"},{object:"Edit"},{object:"Cancel"}]

    let UiProfileButtonsComponent_object = {};
    let scrollContainer;

    let loadmoreAnimation = false;
    let questionModalIsOpen = false;
    let isOpenCreateProductModal = false;
    let isOpenCreatePostModal = false;

    onMount(async () => {
        // scrollContainer.addEventListener('scroll', handleScroll);
        // if (scrollContainer) {
            scrollContainer.addEventListener('scroll', handleScroll);
            
        // }
         console.log("asasas")
       
    });

    function handleScroll() {
        let threshold = scrollContainer.scrollHeight - (scrollContainer.clientHeight * 1.5); // Umbral antes de llegar al final
        if (scrollContainer.scrollTop >= threshold && !loadmoreAnimation) {
            console.log("Llegó al final del contenedor!");
            // Cargar más datos o realizar otra acción
        if($lastVisibletest != null){
            loadmoreAnimation = true;
            handleLoadMore()
            console.log("asdasdasd")
        }
        }
    }
   
    async function handleLoadMore() {
        const { products: newProducts, lastVisible: newLastVisible } = await loadMoreProducts($lastVisibletest, $userid);
        // $productList = newProducts.map((product) => ({...product,opacity: 0}));
        $productList = [...$productList, ...newProducts];
        $lastVisibletest = newLastVisible;
        // productList.set($productList);
        // preloadFullSizeImages(newProducts);
         loadmoreAnimation = false;
        // console.log(products);
    }

    function UiProfileButtonsComponent_onclick(event) {
        UiProfileButtonsComponent_object = event.detail;
        Preview()
    }

    
    //GRID ANIMATION LOADING
    function gridLoadingAnimation(event) {
        isOpenCreateProductModal = false;
        // preloadFullSizeImages() 
        $runGridAnimation = event.detail.showalert; 
        // runAnimation = event.detail.showalert;
        // console.log($productList,"producto");
    }

    
    function UiAlertComponent_onclose() {
        UiProfileButtonsComponent_object.showalert = false;
    }

    function toggleUserProductModal() {
        isOpenUserProductModal = !isOpenUserProductModal;
    }

    

    //OPEN/CLOSE CREATE PRODUCTO
    function toggleCreateProductModal() {
        isOpenCreateProductModal = !isOpenCreateProductModal;
    }
    function toggleCreatePostModal() {
        isOpenCreatePostModal = !isOpenCreatePostModal;
    }
    //MODA OPTION REQUEST
    function eventHandler(index) {
        // $productIndex = index;
        // console.log($productList[$productIndex].id)
        console.log("asaas")
        questionModalIsOpen = !questionModalIsOpen;
    }
    //MODAL OPTIONS RESPONSE
    function toggleModalQuestion(event) {
        if (event.detail.tag == "post") {
            // modalOpen = !modalOpen;
            questionModalIsOpen = !questionModalIsOpen;
            isOpenCreatePostModal = !isOpenCreatePostModal;
        } else if (event.detail.tag == "product") {
            // handleDeleteProduct($productList[$productIndex].id);
            questionModalIsOpen = !questionModalIsOpen;
            isOpenCreateProductModal = !isOpenCreateProductModal;
            console.log(event);
        } else if (event.detail.tag == "cancel") {
            questionModalIsOpen = !questionModalIsOpen;
            console.log(event);
        }
        // openQuestionModal()
    }

    // console.log($firebaseid + " desde header")
</script>

<div class="modal-backdrop">
    <div class="content" bind:this={scrollContainer}  style="overflow-y: auto; height: 100%;">
        <div class="container">
            {#if UiProfileButtonsComponent_object.showalert}
                <!-- <UIAlertComponent data={UiProfileButtonsComponent_object} on:close={UiAlertComponent_onclose} /> -->
            {/if}

            <div class="topbar">
                <button class="Add">x</button>
                <p>Product</p>
                <button class="Add" on:click={eventHandler}>+</button>
            </div>
            <!-- <div class="div1">pagename</div> -->
            <UIProfileHeader/>
            <UIProfileBioComponent />
            <UiProfileButtonsComponent on:onclick={UiProfileButtonsComponent_onclick} />
            <Slider/>
             <!-- <UserProducts/> -->
            <!-- <UIProfileHeader uid={uid} datasources={datasources}/>
            <UIProfileBioComponent pagebio={datasources.props.snapshot.bio}/>
            <UiProfileButtonsComponent on:onclick={UiProfileButtonsComponent_onclick} /> -->
            <!-- <p id="test">test</p> -->
        </div>
    </div>
</div>
{#if questionModalIsOpen }
<QuestionModal
 questionList={ [{object:"Post",tag:"post"},{object:"Producs",tag:"product"},{object:"Cancel",tag:"cancel"}]}
 isOpen={questionModalIsOpen}
 on:close1={toggleModalQuestion}/>
{/if}

{#if isOpenCreateProductModal}
<CreateProduct
    isOpen={isOpenCreateProductModal}
    on:close={toggleCreateProductModal}
    on:publish={gridLoadingAnimation}/>
{/if}

{#if isOpenCreatePostModal}
<CreatePost
    isOpen={isOpenCreatePostModal}
    on:close={toggleCreatePostModal}
    on:publish={gridLoadingAnimation}/>
{/if}


<style>
    .modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #212121;
        display: flex;
   
        z-index: 999; 
    }

    .content{
        flex: 1;
        overflow-y: auto;
    }

    .container {
        display: grid;
        grid-template-rows: 1fr auto auto auto;
        gap: 5px;
        background-color: white;
        /* height: 350px; */
        /* background: rebeccapurple; */
    }

    .topbar {
        /* flex: 1;
        display: flex;
        background-color: rebeccapurple;
        height: 60px;
        justify-content: center;
        align-items: center; */
        display: grid;
        position: sticky;
        top: 0;
        grid-template-columns: 0.1fr 1fr 0.1fr;
        background-color: rebeccapurple;
        height: 60px;
    }
    .topbar p {
        background-color: red;
        text-align: center;
    }
    .topbar button {
        width: 60px;
        background-color: greenyellow;
    }

    .div1 {
        background-color: rgba(0, 0, 0, 0.103);
    }
</style>
