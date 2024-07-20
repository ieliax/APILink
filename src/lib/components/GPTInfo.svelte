<script>
    export let gptname;
    export let gptlink;
    export let gptdescription;

    const imageurl = "https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/640px-Starbucks_Corporation_Logo_2011.svg.png";
</script>
<div class="gptinfo">
    <div class="gptinfo__container">
        <img src={imageurl} alt="">
        <div class="content">
            <h1>{gptname}</h1>
            <p class="content-link">{gptlink}</p>
            <p class="content-description">{gptdescription}</p>
        </div>
    </div>
</div>
<style>

    *{
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        margin: 0;
        padding: 0;
        color: white;
    }
    
    .gptinfo{
       
        /* height: 100%; */
    }

    .gptinfo__container{
        display: flex;
        flex-direction: column;
        /* width: 100%; */
    
        height: 305px;
        margin-top: 125px;
        background-color: #212121;
        align-items: center;
        gap: 11px;

    }
    .content{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
    }
    .content-description{
        font-size: 14.2px;
        color: white;
        text-align: center;
        margin-inline: 100px;
        letter-spacing: -.1px;
    }
    .content-link{
        font-size: 14.2px;
        color: #c9c9c9;
        letter-spacing: -.1px;
    }
    .gptinfo__container img{
        width: 50px;
        height: 50px;
        border: 1px solid #383838;
        border-radius: 50px;
    }
    .gptinfo__container h1{
        font-size: 24px;
        color: white;
        font-weight: 500;
        /* letter-spacing: -1px; */
    }
    .gptinfo__container p{
        
        /* font-weight: 500; */
    }

</style>