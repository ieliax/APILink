<!-- Slider.svelte -->
<script>
    // import Post from "./PostComponents/Post.svelte";
    // import {
    //   resetPromoVars,
    //   localPostIndex,
    //   localPromoIndex,
    //   allPosts,
    //   userid,
    //   postId,
    //   promoId,
    //   question,
    //   postcomment,
    //   scrollheight,
    //   identifierPost,
    //   promotionPosts,
    //   productname,
    //   productbenefit,
    //   productcaracteristic,
    //   productdetails,
    //   productidealFor,
    //   productpaymentlink,
    //   productsrc,
    // } from "../lib/CreatePostComponents/CreatePostStore";

    import UserProducts from "../Business/UserProducts.svelte";
    import GptMessagebox from "../GPTMessagebox.svelte";

  
    // import CreatePost from "../lib/CreatePostComponents/CreatePost.svelte";
  
    // import UiLoader from "./LoaderComponent/UILoader.svelte";
  
    export let uid = "";
    let activeTab = "Threads";
    let overlayVisible = false;
  
    let tab = "";
    let tabAction = "";
    let allowedition = "";
  
    let isLoading = true;
    let isOpenUserProductModal = true;
  
    // function createPostOnFirstTab() {
    //   // resetPromoVars();
    //   tab = "firstTab";
    //   tabAction = "create";
  
    //   $identifierPost = "create";
    //   overlayVisible = !overlayVisible;
    //   console.log(uid);
    // }
  
    // function updatePost(event) {
    //   // $identifierPost = 'update';
  
    //   tab = "firstTab";
    //   tabAction = "update";
    //   allowedition = $allPosts[event.detail.id].order;
  
    //   overlayVisible = !overlayVisible;
  
    //   $localPostIndex = event.detail.id;
    //   console.log(allowedition);
    //   $userid = uid;
    //   $postId = $allPosts[event.detail.id].postId;
    //   $question = $allPosts[event.detail.id].question;
    //   $postcomment = $allPosts[event.detail.id].response;
  
    //   $scrollheight = 100;
    // }
  
    function createPostOnthirdTab() {
      tab = "thirdTab";
      tabAction = "create";
      overlayVisible = !overlayVisible;
      resetPromoVars();
    }
  
    // function updatePromo(event) {
    //   // $identifierPost = 'update';
  
    //   tab = "thirdTab";
    //   tabAction = "update";
  
    //   overlayVisible = !overlayVisible;
  
    //   //console.log($promotionPosts)
    //   $localPromoIndex = event.detail.id;
    //   $userid = uid;
    //   $promoId = $promotionPosts[event.detail.id].promoId;
    //   $productname = $promotionPosts[event.detail.id].name;
    //   $productdetails = $promotionPosts[event.detail.id].details;
    //   $productcaracteristic = $promotionPosts[event.detail.id].caracteristic;
    //   $productbenefit = $promotionPosts[event.detail.id].benefit;
    //   $productidealFor = $promotionPosts[event.detail.id].idealFor;
    //   $productpaymentlink = $promotionPosts[event.detail.id].paymentlink;
    //   $productsrc = $promotionPosts[event.detail.id].src;
    //   console.log($productsrc);
    //   $scrollheight = 100;
    // }
  
    function createPostOnSecondTab() {
      tab = "secondTab";
      tabAction = "create";
  
      // $identifierPost = 'create';
      overlayVisible = !overlayVisible;
      console.log(uid);
    }
  
    function selectTab(tab) {
      activeTab = tab;
    }
  
    function toggleOverlay() {
      overlayVisible = !overlayVisible;
      console.log("desde chatbot");
    }
  
    function ShowAnimationComponent(event) {
      console.log(event.detail);
      isLoading = true;
    }
    function HiddeAnimationComponent(event) {
      console.log(event.detail);
      isLoading = false;
    }
    function toggleUserProductModal() {
        isOpenUserProductModal = !isOpenUserProductModal;
    }
    //console.log($allPosts);
  </script>
  
  {#if isLoading}
    <div class="contenti">
      <!-- <LottiePlayer
      src={animationData}
      background="transparent"
      speed="1"
      style="width: 50px; height: 50%;"
      loop
      autoplay
    /> -->
    </div>
  {/if}
  
  {#if overlayVisible}
    <!-- <CreatePost
      {tab}
      {tabAction}
      on:close1={toggleOverlay}
      alloweditionmode={allowedition}
      on:didBeginAction={ShowAnimationComponent}
      on:didFinishAction={HiddeAnimationComponent}
    /> -->
  {/if}
  
  <div class="tabs">
    <button
      on:click={() => selectTab("Threads")}
      class:selected={activeTab === "Threads"}>Threads</button
    >
    <button
      on:click={() => selectTab("Replies")}
      class:selected={activeTab === "Replies"}>Replies</button
    >
    <button
      on:click={() => selectTab("Reposts")}
      class:selected={activeTab === "Reposts"}>Reposts</button
    >
  </div>
  
  <div class="content">
    {#if activeTab === "Threads"}
    <GptMessagebox
    role="user"
    message="asdddddddddddddddddddddddddddddddddddddddddddddddddddddd"/>
    {:else if activeTab === "Replies"}
      <!-- <div> -->
        <!-- <button on:click={createPostOnSecondTab}>createLinks</button> -->
         <UserProducts isOpen={isOpenUserProductModal} on:close={toggleUserProductModal}/>
      <!-- </div> -->
    {:else if activeTab === "Reposts"}
      <!-- <UiLoader enable={isLoading} /> -->
      <!-- <button on:click={createPostOnthirdTab}>createPromo</button> -->
  

      <!-- <div>Contenido de Reposts aquí.</div> -->
    {/if}
  </div>
  
  <style>
    .contenti {
      width: 11%;
  
      margin: 0 auto;
      padding-top: 10px;
      padding-bottom: 10px;
    }
  
    .custom {
      width: 200px;
      height: 200px;
      margin: 20px;
      padding: 10px;
      display: block; /* Puedes usar flex, block, inline-block, etc., según necesites */
    }

    .content{
      display: flex;
      overflow-y: auto;
    }
  
    .tabs {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;
      
      border-bottom: 2px solid #ccc;
    }
  
    .tabs button {
      background: none;
      border: none;
      /* padding: 0.5rem 3rem; */
      padding: 10px;
      /* background-color: red; */
      margin-bottom: -2px; /* para alinear con la línea de abajo */
      font-weight: bold;
      cursor: pointer;
    }
  
    .tabs button.selected {
      border-bottom: 2px solid black;
    }
  
    .content div {
      display: flex;
      flex-direction: column;
    }
  
    .content div:target {
      display: block;
    }
  </style>
  